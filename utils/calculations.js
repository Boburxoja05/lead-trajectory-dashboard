export function raqamFormat(son) {
  return Number(son || 0).toLocaleString("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

export function pulQiymat(son) {
  return `$${raqamFormat(Number(son || 0))}`;
}

export function foiz(qism, jami) {
  if (!jami) return "0,0";
  return raqamFormat((qism / jami) * 100);
}

export function lidNarxi(xarajat, lid) {
  if (!lid) return 0;
  return xarajat / lid;
}

export function mijozNarxi(xarajat, sotuv) {
  if (!sotuv) return 0;
  return xarajat / sotuv;
}

export function rentabellik(tushum, xarajat) {
  if (!xarajat) return 0;
  return tushum / xarajat;
}

export function sanaLabel(sana) {
  const oylar = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
  ];

  const d = new Date(sana);
  return `${oylar[d.getMonth()]} ${d.getDate()}`;
}

export function filterByKompaniya(data, kompaniya) {
  if (kompaniya === "Hammasi") return data;
  return data.filter((item) => item.kompaniya === kompaniya);
}

export function filterByDavr(data, davr) {
  if (davr === "Maks") return data;

  const sanalar = data.map((item) => new Date(item.sana));

  if (!sanalar.length) return [];

  const oxirgiSana = new Date(Math.max(...sanalar));
  const start = new Date(oxirgiSana);

  if (davr === "Bugun") {
    return data.filter(
      (item) => item.sana === oxirgiSana.toISOString().slice(0, 10)
    );
  }

  if (davr === "Kecha") {
    start.setDate(start.getDate() - 1);
    return data.filter((item) => item.sana === start.toISOString().slice(0, 10));
  }

  if (davr === "7 kun") start.setDate(start.getDate() - 6);
  if (davr === "14 kun") start.setDate(start.getDate() - 13);
  if (davr === "30 kun") start.setDate(start.getDate() - 29);

  if (davr === "Shu oy") {
    return data.filter((item) => {
      const d = new Date(item.sana);

      return (
        d.getMonth() === oxirgiSana.getMonth() &&
        d.getFullYear() === oxirgiSana.getFullYear()
      );
    });
  }

  if (davr === "O‘tgan oy") {
    const oldMonth = new Date(oxirgiSana);
    oldMonth.setMonth(oldMonth.getMonth() - 1);

    return data.filter((item) => {
      const d = new Date(item.sana);

      return (
        d.getMonth() === oldMonth.getMonth() &&
        d.getFullYear() === oldMonth.getFullYear()
      );
    });
  }

  return data.filter((item) => new Date(item.sana) >= start);
}

export function umumiyKpi(lidlar) {
  const jamiLid = lidlar.length;
  const jamiXarajat = lidlar.reduce((sum, item) => sum + item.xarajat, 0);
  const jamiSotuv = lidlar.filter((item) => item.status === "Sotuv").length;
  const jamiTushum = lidlar.reduce((sum, item) => sum + item.tushum, 0);

  return {
    jamiLid,
    jamiXarajat,
    jamiSotuv,
    jamiTushum,
    cpl: lidNarxi(jamiXarajat, jamiLid),
    cpa: mijozNarxi(jamiXarajat, jamiSotuv),
    cr: foiz(jamiSotuv, jamiLid),
    roas: rentabellik(jamiTushum, jamiXarajat),
  };
}

export function lidSifati(lidlar) {
  return {
    sifatli: lidlar.filter((l) => l.sifat === "Sifatli").length,
    sifatsiz: lidlar.filter((l) => l.sifat === "Sifatsiz").length,
    noAnswer: lidlar.filter((l) => l.sifat === "No Answer").length,
    dublikat: lidlar.filter((l) => l.sifat === "Dublikat").length,
    spam: lidlar.filter((l) => l.sifat === "Spam").length,
    realLid: lidlar.filter((l) => l.sifat === "Sifatli").length,
  };
}

export function voronkaHisobla(lidlar, statuslar) {
  return statuslar.map((status, index) => {
    if (status === "Yo‘qotildi") {
      return {
        status,
        soni: lidlar.filter((lid) => lid.status === "Yo‘qotildi").length,
      };
    }

    const soni = lidlar.filter((lid) => {
      if (lid.status === "Yo‘qotildi") return false;

      const lidIndex = statuslar.indexOf(lid.status);

      return lidIndex >= index;
    }).length;

    return {
      status,
      soni,
    };
  });
}

export function voronkaKonversiya(voronka) {
  const realVoronka = voronka.filter((item) => item.status !== "Yo‘qotildi");

  return realVoronka.map((item, index) => {
    if (index === 0) {
      return {
        ...item,
        oldingiBosqich: null,
        bosqichKonversiya: "100,0",
      };
    }

    const oldingi = realVoronka[index - 1];

    return {
      ...item,
      oldingiBosqich: oldingi.status,
      bosqichKonversiya: foiz(item.soni, oldingi.soni),
    };
  });
}

export function engKattaYoqotish(voronka) {
  const realVoronka = voronka.filter((item) => item.status !== "Yo‘qotildi");

  let natija = {
    qayerdan: "",
    qayerga: "",
    yoqotish: 0,
  };

  for (let i = 0; i < realVoronka.length - 1; i++) {
    const hozirgi = realVoronka[i];
    const keyingi = realVoronka[i + 1];
    const farq = hozirgi.soni - keyingi.soni;

    if (farq > natija.yoqotish) {
      natija = {
        qayerdan: hozirgi.status,
        qayerga: keyingi.status,
        yoqotish: farq,
      };
    }
  }

  return natija;
}

export function kunlikTrend(lidlar) {
  const map = {};

  lidlar.forEach((lid) => {
    if (!map[lid.sana]) {
      map[lid.sana] = {
        sana: lid.sana,
        sanaLabel: sanaLabel(lid.sana),
        lid: 0,
        xarajat: 0,
        sotuv: 0,
        tushum: 0,
      };
    }

    map[lid.sana].lid += 1;
    map[lid.sana].xarajat += lid.xarajat;
    map[lid.sana].sotuv += lid.status === "Sotuv" ? 1 : 0;
    map[lid.sana].tushum += lid.tushum;
  });

  return Object.values(map)
    .sort((a, b) => new Date(a.sana) - new Date(b.sana))
    .map((item) => ({
      ...item,
      cpl: lidNarxi(item.xarajat, item.lid),
    }));
}

export function menejerReyting(lidlar) {
  const map = {};

  lidlar.forEach((lid) => {
    if (!map[lid.menejer]) {
      map[lid.menejer] = {
        menejer: lid.menejer,
        lid: 0,
        sotuv: 0,
        tushum: 0,
      };
    }

    map[lid.menejer].lid += 1;
    map[lid.menejer].sotuv += lid.status === "Sotuv" ? 1 : 0;
    map[lid.menejer].tushum += lid.tushum;
  });

  return Object.values(map)
    .map((item) => ({
      ...item,
      cr: foiz(item.sotuv, item.lid),
    }))
    .sort((a, b) => b.sotuv - a.sotuv);
}

export function sourceAnalitika(lidlar) {
  const map = {};

  lidlar.forEach((lid) => {
    if (!map[lid.manba]) {
      map[lid.manba] = {
        manba: lid.manba,
        lid: 0,
        xarajat: 0,
        sotuv: 0,
        tushum: 0,
      };
    }

    map[lid.manba].lid += 1;
    map[lid.manba].xarajat += lid.xarajat;
    map[lid.manba].sotuv += lid.status === "Sotuv" ? 1 : 0;
    map[lid.manba].tushum += lid.tushum;
  });

  return Object.values(map).map((item) => ({
    ...item,
    cpl: lidNarxi(item.xarajat, item.lid),
    cpa: mijozNarxi(item.xarajat, item.sotuv),
    cr: foiz(item.sotuv, item.lid),
    roas: rentabellik(item.tushum, item.xarajat),
  }));
}

export function pulYoqotish(lidlar, ortachaTushum = 500) {
  const yoqotilgan = lidlar.filter((l) => l.status === "Yo‘qotildi").length;
  const potensialSotuv = Math.round(yoqotilgan * 0.1);
  const potensialTushum = potensialSotuv * ortachaTushum;

  return {
    yoqotilgan,
    potensialSotuv,
    potensialTushum,
  };
}

export function prognoz(trend) {
  const oxirgi7 = trend.slice(-7);

  const kunlikLid =
    oxirgi7.reduce((sum, item) => sum + item.lid, 0) /
    Math.max(oxirgi7.length, 1);

  const kunlikSotuv =
    oxirgi7.reduce((sum, item) => sum + item.sotuv, 0) /
    Math.max(oxirgi7.length, 1);

  const kunlikTushum =
    oxirgi7.reduce((sum, item) => sum + item.tushum, 0) /
    Math.max(oxirgi7.length, 1);

  return {
    lid: Math.round(kunlikLid * 30),
    sotuv: Math.round(kunlikSotuv * 30),
    tushum: Math.round(kunlikTushum * 30),
  };
}