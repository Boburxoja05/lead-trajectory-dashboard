export const kompaniyalar = ["Hammasi", "FullContact", "Sales Doctor"];

export const davrlar = ["7 kun", "30 kun", "Butun davr"];

export const lidStatuslari = [
  "Yangi lid",
  "Aloqa qilindi",
  "Saralandi",
  "Taklif berildi",
  "To‘lov kutilmoqda",
  "Sotuv",
  "Yo‘qotildi",
];

const ismlar = [
  "Aziz", "Jasur", "Malika", "Madina", "Bekzod", "Sardor",
  "Alisher", "Dilshod", "Shahnoza", "Diyor", "Umid", "Zarina",
  "Sarvar", "Nilufar", "Akmal", "Murod", "Sevara", "Javohir",
];

const manbalar = ["Facebook", "Instagram", "Messenger"];
const lidSifatlari = ["Sifatli", "Sifatsiz", "No Answer", "Dublikat", "Spam"];

const menejerlarMap = {
  FullContact: ["Jasur", "Alisher", "Sardor"],
  "Sales Doctor": ["Aziz", "Bekzod", "Umid", "Diyor"],
};

const kampaniyalarMap = {
  FullContact: [
    "FC CRM Diagnostika",
    "FC Call Center Audit",
    "FC B2B Savdo Tizimi",
    "FC Konsalting",
  ],
  "Sales Doctor": [
    "SD Sotuv Trening",
    "SD ROP Kurs",
    "SD Menejer Kurs",
    "SD Savdo Skriptlari",
    "SD Intensiv",
  ],
};

const kreativlarMap = {
  FullContact: ["FC Video 1", "FC Case Study", "FC Audit Banner", "FC Reels"],
  "Sales Doctor": ["SD Reels 1", "SD Video 2", "SD Trening Banner", "SD Carousel", "SD Hook Video"],
};

function sanaYarat(index) {
  const kun = 1 + (index % 30);
  return `2026-06-${String(kun).padStart(2, "0")}`;
}

function statusYarat(kompaniya, index) {
  const r = index % 100;

  if (kompaniya === "FullContact") {
    if (r < 7) return "Yangi lid";
    if (r < 23) return "Aloqa qilindi";
    if (r < 49) return "Saralandi";
    if (r < 67) return "Taklif berildi";
    if (r < 80) return "To‘lov kutilmoqda";
    if (r < 91) return "Sotuv";
    return "Yo‘qotildi";
  }

  if (r < 12) return "Yangi lid";
  if (r < 39) return "Aloqa qilindi";
  if (r < 61) return "Saralandi";
  if (r < 76) return "Taklif berildi";
  if (r < 85) return "To‘lov kutilmoqda";
  if (r < 91) return "Sotuv";
  return "Yo‘qotildi";
}

function sifatYarat(index) {
  const r = index % 100;

  if (r < 68) return "Sifatli";
  if (r < 80) return "No Answer";
  if (r < 88) return "Sifatsiz";
  if (r < 95) return "Dublikat";
  return "Spam";
}

function xarajatYarat(kompaniya, index) {
  if (kompaniya === "FullContact") {
    return Number((3.4 + (index % 9) * 0.47).toFixed(2));
  }

  return Number((2.2 + (index % 7) * 0.36).toFixed(2));
}

function tushumYarat(kompaniya, status, index) {
  if (status !== "Sotuv") return 0;

  if (kompaniya === "FullContact") {
    return 350 + (index % 5) * 120;
  }

  return 120 + (index % 6) * 45;
}

export const lidlar = Array.from({ length: 1000 }, (_, index) => {
  const kompaniya = index % 10 < 6 ? "Sales Doctor" : "FullContact";
  const status = statusYarat(kompaniya, index);

  const kampaniyalar = kampaniyalarMap[kompaniya];
  const kreativlar = kreativlarMap[kompaniya];
  const menejerlar = menejerlarMap[kompaniya];

  return {
    id: index + 1,
    sana: sanaYarat(index),
    kompaniya,
    kampaniya: kampaniyalar[index % kampaniyalar.length],
    kreativ: kreativlar[index % kreativlar.length],
    manba: manbalar[index % manbalar.length],
    ism: ismlar[index % ismlar.length],
    telefon: `+998 9${index % 9} *** ** ${String(index % 100).padStart(2, "0")}`,
    status,
    sifat: sifatYarat(index),
    menejer: menejerlar[index % menejerlar.length],
    xarajat: xarajatYarat(kompaniya, index),
    tushum: tushumYarat(kompaniya, status, index),
  };
});

function guruhla(data, key) {
  return Object.values(
    data.reduce((acc, item) => {
      const nom = item[key];

      if (!acc[nom]) {
        acc[nom] = {
          kompaniya: item.kompaniya,
          [key]: nom,
          xarajat: 0,
          lid: 0,
          sotuv: 0,
          tushum: 0,
          ctr: Number((2.1 + (item.id % 31) / 10).toFixed(1)),
        };
      }

      acc[nom].xarajat += item.xarajat;
      acc[nom].lid += 1;
      acc[nom].sotuv += item.status === "Sotuv" ? 1 : 0;
      acc[nom].tushum += item.tushum;

      return acc;
    }, {})
  );
}

export const kampaniyalar = guruhla(lidlar, "kampaniya");
export const kreativlar = guruhla(lidlar, "kreativ");

export const rejaKpi = {
  FullContact: {
    lid: 400,
    cpl: 4.2,
    sotuv: 45,
    cr: 10,
    roas: 8,
  },
  "Sales Doctor": {
    lid: 600,
    cpl: 2.8,
    sotuv: 50,
    cr: 7,
    roas: 5,
  },
  Hammasi: {
    lid: 1000,
    cpl: 3.3,
    sotuv: 95,
    cr: 8.5,
    roas: 6,
  },
};