export const davrlar = ["7 kun", "14 kun", "30 kun", "Butun davr"];

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

// "Sayt" replaced Messenger
const manbalar = ["Facebook", "Instagram", "Sayt"];

const menejerlarRoyxat = [
  "Jasur T.", "Alisher K.", "Sardor N.", "Aziz M.",
  "Bekzod R.", "Umid S.",
  "Diyor A.",  // 0 sotuv
  "Murod F.",  // 0 sotuv
];

// "Lid" prefixed campaign names
const kampaniyalarRoyxat = [
  "Lid Gen — Video 01",
  "Lid Gen — Kurs Promo",
  "Lid — Retargeting Warm",
  "Lid — Special Offer",
  "Lid — Lookalike 3%",   // zaif kampaniya (0 sotuv)
  "Lid — Story Ads",      // zaif kampaniya (0 sotuv)
];

const kreativlarRoyxat = [
  "Video 01 — Hook",
  "Video 02 — Case Study",
  "Banner 01 — Offer",
  "Reels 01 — Testimonial",
  "Carousel 01 — Features",
];

function sanaYarat(index) {
  const kun = 1 + (index % 30);
  return `2026-06-${String(kun).padStart(2, "0")}`;
}

function statusYarat(index) {
  const r = index % 100;
  if (r < 8)  return "Yangi lid";
  if (r < 28) return "Aloqa qilindi";
  if (r < 52) return "Saralandi";
  if (r < 69) return "Taklif berildi";
  if (r < 82) return "To‘lov kutilmoqda";
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

function xarajatYarat(index) {
  return Number((2.4 + (index % 13) * 0.22).toFixed(2));
}

function tushumYarat(status, index) {
  if (status !== "Sotuv") return 0;
  return 240 + (index % 9) * 70;
}

export const lidlar = Array.from({ length: 1000 }, (_, index) => {
  const menejerIdx  = index % menejerlarRoyxat.length;   // 0–7
  const kampaniyaIdx = index % kampaniyalarRoyxat.length; // 0–5

  const menejer  = menejerlarRoyxat[menejerIdx];
  const kampaniya = kampaniyalarRoyxat[kampaniyaIdx];

  let status = statusYarat(index);

  // Diyor A. (idx 6) va Murod F. (idx 7) — 0 sotuv
  const zeroSalesMenejer = menejerIdx >= 6;
  // So'nggi 2 kampaniya — 0 sotuv (risk kampaniyalar)
  const zeroSalesKampaniya = kampaniyaIdx >= 4;

  if ((zeroSalesMenejer || zeroSalesKampaniya) && status === "Sotuv") {
    status = "To‘lov kutilmoqda";
  }

  return {
    id: index + 1,
    sana: sanaYarat(index),
    kampaniya,
    kreativ: kreativlarRoyxat[index % kreativlarRoyxat.length],
    manba: manbalar[index % manbalar.length],
    ism: ismlar[index % ismlar.length],
    telefon: `+998 9${index % 9} *** ** ${String(index % 100).padStart(2, "0")}`,
    status,
    sifat: sifatYarat(index),
    menejer,
    xarajat: xarajatYarat(index),
    tushum: tushumYarat(status, index),
  };
});

function guruhla(data, key) {
  return Object.values(
    data.reduce((acc, item) => {
      const nom = item[key];
      if (!acc[nom]) {
        acc[nom] = {
          [key]: nom,
          xarajat: 0,
          lid: 0,
          sotuv: 0,
          tushum: 0,
          ctr: Number((1.6 + (item.id % 31) / 10).toFixed(1)),
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
export const kreativlar   = guruhla(lidlar, "kreativ");

// Reja qasddan faktdan yuqori — plan vs fact farqini ko'rsatish uchun
export const rejaKpi = {
  lid:   1200,  // fakt ~1000
  cpl:   2.2,   // fakt ~3.5–3.8 (qimmatroq)
  sotuv: 120,   // fakt ~50–60
  cr:    12,    // fakt ~6–7%
  roas:  12,    // fakt ~8–10x
};
