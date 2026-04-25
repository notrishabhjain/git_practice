(function () {
  const TIME_UNITS = [
    { unit: "Samaya", conversion: "Base unit", modern: "Infinitesimal", citation: "[1-3]" },
    { unit: "Avalika", conversion: "Innumerable Samayas", modern: "Sub-second", citation: "[1,3]" },
    { unit: "Ucchvasa", conversion: "Finite Avalikas", modern: "3600/3773 seconds", citation: "[1-3]" },
    { unit: "Stoka", conversion: "7 Ucchvasas", modern: "Approx. 5.5 seconds", citation: "[1,2]" },
    { unit: "Lava", conversion: "7 Stokas", modern: "Approx. 37.4 seconds", citation: "[1,2]" },
    { unit: "Ghati / Nali", conversion: "38.5 Lavas", modern: "24 minutes", citation: "[1,2]" },
    { unit: "Muhurta", conversion: "2 Ghatis = 3773 Ucchvasas", modern: "48 minutes", citation: "[1-3]" },
    { unit: "Ahoratra", conversion: "30 Muhurtas", modern: "24 hours", citation: "[1,2]" },
    { unit: "Paksha", conversion: "15 Ahoratras", modern: "15 days", citation: "[1,3]" },
    { unit: "Masa", conversion: "2 Pakshas", modern: "1 month", citation: "[1,3]" },
    { unit: "Rtu", conversion: "2 Masas", modern: "2 months", citation: "[1,3]" },
    { unit: "Ayana", conversion: "3 Rtus", modern: "6 months", citation: "[1,3]" },
    { unit: "Varsha", conversion: "2 Ayanas", modern: "1 year", citation: "[1,3]" },
    { unit: "Yuga", conversion: "5 Varshas", modern: "5 years", citation: "[3,4]" },
    { unit: "Purvanga", conversion: "8,400,000 years", modern: "8.4e6 years", citation: "[3]" },
    { unit: "Purva", conversion: "8,400,000 Purvangas", modern: "70.56e12 years", citation: "[3]" },
    { unit: "Palyopama", conversion: "Innumerable years", modern: "Cosmological", citation: "[5,6]" },
    { unit: "Sagaropama", conversion: "10 x 10^14 Palyopamas", modern: "Cosmological", citation: "[5,6]" },
    { unit: "Kalpakal", conversion: "20 Kodakodi Sagaropamas", modern: "Cosmological", citation: "[6-8]" }
  ];

  const SPACE_UNITS = [
    { unit: "Paramanu", conversion: "Base unit", citation: "[6,9]" },
    { unit: "Avasannasanna", conversion: "Infinite Paramanus", citation: "[6,9]" },
    { unit: "Sannasanna", conversion: "8 Avasannasannas", citation: "[6]" },
    { unit: "Trutarenu", conversion: "8 Sannasannas", citation: "[6]" },
    { unit: "Trasarenu", conversion: "8 Trutarenus", citation: "[6,9]" },
    { unit: "Ratharenu", conversion: "8 Trasarenus", citation: "[6,9]" },
    { unit: "Liksha", conversion: "8 Karmabhumi Balagras", citation: "[6,9]" },
    { unit: "Joon / Yuka", conversion: "8 Likshas", citation: "[6,9]" },
    { unit: "Yava-Madhya", conversion: "8 Joons", citation: "[6,9]" },
    { unit: "Angula", conversion: "8 Yava-Madhyas", citation: "[6,9,10]" },
    { unit: "Pramanangula", conversion: "500 Vyavaharangulas", citation: "[6,10,11]" },
    { unit: "Pada", conversion: "6 Angulas", citation: "[10-12]" },
    { unit: "Vitasti", conversion: "2 Padas", citation: "[10-12]" },
    { unit: "Hasta", conversion: "2 Vitastis", citation: "[10-12]" },
    { unit: "Kishku", conversion: "2 Hastas", citation: "[12]" },
    { unit: "Dhanusha / Danda", conversion: "2 Kishkus = 96 Angulas", citation: "[10-12]" },
    { unit: "Krosa", conversion: "2000 Dhanushas", citation: "[10-12]" },
    { unit: "Yojana", conversion: "4 Krosas", citation: "[10-12]" },
    { unit: "Rajju", conversion: "Macro-cosmological distance", citation: "[13-15]" }
  ];

  const YUGA_DATA = {
    solarYears: 5,
    solarMonths: 60,
    lunarMonths: 62,
    adhikMaas: 2,
    omittedDays: 30,
    solarDays: 1800,
    savanDays: 1830,
    lunarDays: 1860,
    adhikRule: "An Adhik Maas occurs if no solar transit falls between two consecutive Amavasyas.",
    kshayaRule: "A Kshaya Maas occurs if two Sankrantis fall between two consecutive Amavasyas."
  };

  const RASHIS = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];

  const RASHI_SHORT = [
    "Mesh", "Vrish", "Mithun", "Kark", "Singh", "Kanya",
    "Tula", "Vrishchik", "Dhanu", "Makar", "Kumbh", "Meen"
  ];

  const PLANETS = [
    { key: "Sun", short: "Su", color: "#c66112" },
    { key: "Moon", short: "Mo", color: "#2f71c1" },
    { key: "Mars", short: "Ma", color: "#b03a2e" },
    { key: "Mercury", short: "Me", color: "#2d8a5d" },
    { key: "Jupiter", short: "Ju", color: "#ac7c16" },
    { key: "Venus", short: "Ve", color: "#9b2968" },
    { key: "Saturn", short: "Sa", color: "#475569" },
    { key: "Rahu", short: "Ra", color: "#5b3ea8" },
    { key: "Ketu", short: "Ke", color: "#72821f" }
  ];

  const PLANET_LOOKUP = Object.fromEntries(PLANETS.map((planet) => [planet.key, planet]));

  const VIMSHOTTARI_ORDER = ["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"];
  const VIMSHOTTARI_YEARS = {
    Ketu: 7,
    Venus: 20,
    Sun: 6,
    Moon: 10,
    Mars: 7,
    Rahu: 18,
    Jupiter: 16,
    Saturn: 19,
    Mercury: 17
  };

  const PLANET_EXALT = { Sun: 0, Moon: 1, Mars: 9, Mercury: 5, Jupiter: 3, Venus: 11, Saturn: 6, Rahu: 2, Ketu: 8 };
  const PLANET_DEBIL = { Sun: 6, Moon: 7, Mars: 3, Mercury: 11, Jupiter: 9, Venus: 5, Saturn: 0, Rahu: 8, Ketu: 2 };
  const PLANET_OWN = {
    Sun: [4],
    Moon: [3],
    Mars: [0, 7],
    Mercury: [2, 5],
    Jupiter: [8, 11],
    Venus: [1, 6],
    Saturn: [9, 10],
    Rahu: [],
    Ketu: []
  };

  const JAIN_NAKSHATRA_REGISTRY = [
    { order: 1, name: "Ashwini", lord: "Ketu", tier: "Kula" },
    { order: 2, name: "Bharani", lord: "Venus", tier: "Upakula" },
    { order: 3, name: "Krittika", lord: "Sun", tier: "Kula" },
    { order: 4, name: "Rohini", lord: "Moon", tier: "Upakula" },
    { order: 5, name: "Mrigashira", lord: "Mars", tier: "Kula" },
    { order: 6, name: "Ardra", lord: "Rahu", tier: "Kulopakula" },
    { order: 7, name: "Punarvasu", lord: "Jupiter", tier: "Upakula" },
    { order: 8, name: "Pushya", lord: "Saturn", tier: "Kula" },
    { order: 9, name: "Ashlesha", lord: "Mercury", tier: "Upakula" },
    { order: 10, name: "Magha", lord: "Ketu", tier: "Kula" },
    { order: 11, name: "Purva Phalguni", lord: "Venus", tier: "Upakula" },
    { order: 12, name: "Uttara Phalguni", lord: "Sun", tier: "Kula" },
    { order: 13, name: "Hasta", lord: "Moon", tier: "Upakula" },
    { order: 14, name: "Chitra", lord: "Mars", tier: "Kula" },
    { order: 15, name: "Swati", lord: "Rahu", tier: "Upakula" },
    { order: 16, name: "Vishakha", lord: "Jupiter", tier: "Kula" },
    { order: 17, name: "Anuradha", lord: "Saturn", tier: "Kulopakula" },
    { order: 18, name: "Jyeshtha", lord: "Mercury", tier: "Upakula" },
    { order: 19, name: "Moola", lord: "Ketu", tier: "Kula" },
    { order: 20, name: "Purva Ashadha", lord: "Venus", tier: "Upakula" },
    { order: 21, name: "Uttara Ashadha", lord: "Sun", tier: "Kula", note: "Source notes state Abhijit takes the closing segment of Uttara Ashadha." },
    { order: 22, name: "Abhijit", lord: "Sun", tier: "Kulopakula", note: "Exact extracted span: 19 Ghatis or 9 27/67 Muhurtas." },
    { order: 23, name: "Shravana", lord: "Moon", tier: "Upakula", note: "Source notes state Abhijit takes the opening segment of Shravana." },
    { order: 24, name: "Dhanishta", lord: "Mars", tier: "Kula" },
    { order: 25, name: "Shatabhisha", lord: "Rahu", tier: "Kulopakula" },
    { order: 26, name: "Purva Bhadrapada", lord: "Jupiter", tier: "Upakula" },
    { order: 27, name: "Uttara Bhadrapada", lord: "Saturn", tier: "Kula" },
    { order: 28, name: "Revati", lord: "Mercury", tier: "Upakula" }
  ];

  const COMPUTED_NAKSHATRAS = JAIN_NAKSHATRA_REGISTRY.filter((item) => item.name !== "Abhijit");

  const TITHI_NAMES = [
    "Pratipada", "Dvitiya", "Tritiya", "Chaturthi", "Panchami",
    "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
    "Ekadashi", "Dvadashi", "Trayodashi", "Chaturdashi", "Purnima / Amavasya"
  ];

  const YOGA_NAMES = Array.from({ length: 27 }, (_, index) => `Yoga ${index + 1}`);

  const KARANA_NAMES = [
    "Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti",
    "Shakuni", "Chatushpada", "Naga", "Kimstughna"
  ];

  const REMEDY_TABLE = {
    Sun: {
      mantra: "Om Hram Hreem Hraum Sah Suryaya Namah",
      count: 7000,
      historicalOfferings: ["Red cloth", "Wheat", "Jaggery", "Saffron", "Ruby in gold", "Red flowers", "Red cow"],
      jainAdaptation: ["Donate red cloth", "Offer grain to a gaushala or animal shelter", "Support ahimsa food distribution", "Avoid live-animal transfer"]
    },
    Moon: {
      mantra: "Om Shram Shreem Shraum Sah Chandramase Namah",
      count: 11000,
      historicalOfferings: ["White cloth", "Rice", "Misri", "Pearl in silver", "White flowers", "Conch shell", "White bull"],
      jainAdaptation: ["Donate rice or milk-free white food items", "Support animal care instead of gifting an animal", "Use symbolic white offerings only"]
    },
    Mars: {
      mantra: "Om Kram Kreem Kraum Sah Bhaumaya Namah",
      count: 10000,
      historicalOfferings: ["Red cloth", "Masoor dal", "Jaggery", "Coral in copper", "Red flowers", "Red bull"],
      jainAdaptation: ["Donate lentils and cloth", "Support non-violent medical aid", "Avoid live-animal transfer"]
    },
    Mercury: {
      mantra: "Om Bram Breem Braum Sah Budhaya Namah",
      count: 9000,
      historicalOfferings: ["Moong dal", "Green cloth", "Emerald in gold", "Mixed flowers", "Ivory", "Weapons"],
      jainAdaptation: ["Donate books, stationery, green cloth, or food grains", "Do not use ivory or weapons in a Jain-compliant implementation"]
    },
    Jupiter: {
      mantra: "Om Gram Greem Graum Sah Gurave Namah",
      count: 19000,
      historicalOfferings: ["Yellow cloth", "Chana dal", "Turmeric", "Topaz in gold", "Yellow flowers", "Horse"],
      jainAdaptation: ["Donate study material, turmeric, yellow cloth, or food", "Support animal welfare instead of gifting an animal"]
    },
    Venus: {
      mantra: "Om Dram Dreem Draum Sah Shukraya Namah",
      count: 16000,
      historicalOfferings: ["White cloth", "Rice", "Misri", "Diamond in silver", "White flowers", "Fragrance", "White horse"],
      jainAdaptation: ["Donate white clothing and food items", "Use fragrance or temple-cleanliness seva", "Avoid live-animal transfer"]
    },
    Saturn: {
      mantra: "Om Pram Preem Praum Sah Shanaye Namah",
      count: 23000,
      historicalOfferings: ["Black cloth", "Urad dal", "Kulthi", "Black flowers", "Sapphire in panchdhatu", "Buffalo"],
      jainAdaptation: ["Donate dark blankets, pulses, or medicine support", "Support care for aged or working animals instead of transfer"]
    },
    Rahu: {
      mantra: "Om Bhram Bhreem Bhraum Sah Rahave Namah",
      count: 18000,
      historicalOfferings: ["Til", "Mustard", "Blue or black cloth", "Gomed in ashtadhatu", "Sword", "Horse or blanket"],
      jainAdaptation: ["Donate blankets, grain, and protective essentials", "Do not include weapons or live-animal gifting in a Jain-facing app"]
    },
    Ketu: {
      mantra: "Om Sram Sreem Sraum Sah Ketave Namah",
      count: 17000,
      historicalOfferings: ["Til", "Seven grains", "Smoke-colored cloth", "Coconut", "Cat's Eye in ashtadhatu", "Goat or blanket"],
      jainAdaptation: ["Donate grain kits, blankets, and coconuts", "Support goat shelters rather than transferring animals"]
    }
  };

  const JAIN_PRINCIPLE_GUIDANCE = [
    "Treat planets as indicators of karmic ripening, not as independent divine agents.",
    "Favor ahimsa-safe remedies: mantra, scriptural study, fasting, self-restraint, food donation, cloth donation, medicine support, and animal welfare.",
    "Avoid implementing live-animal gifting, weapon donation, or ivory usage as actionable recommendations in a Jain-facing product.",
    "Keep source-backed remedies separate from inferred Jain-principle adaptations."
  ];

  const FORBIDDEN_TITHI_MAPS = {
    dagdha: { Sunday: 12, Monday: 11, Tuesday: 5, Wednesday: 3, Thursday: 6, Friday: 8, Saturday: 9 },
    visha: { Sunday: 4, Monday: 6, Tuesday: 7, Wednesday: 2, Thursday: 8, Friday: 9, Saturday: 7 },
    hutashan: { Sunday: 12, Monday: 6, Tuesday: 7, Wednesday: 8, Thursday: 9, Friday: 10, Saturday: 11 }
  };

  const WEEKDAY_LORD = {
    Sunday: "Sun",
    Monday: "Moon",
    Tuesday: "Mars",
    Wednesday: "Mercury",
    Thursday: "Jupiter",
    Friday: "Venus",
    Saturday: "Saturn"
  };

  const HORA_SEQUENCE = ["Sun", "Venus", "Mercury", "Moon", "Saturn", "Jupiter", "Mars"];
  const BENEFIC_HORAS = new Set(["Moon", "Mercury", "Jupiter", "Venus"]);

  const BUSINESS_NAKSHATRAS = new Set(["Ashwini", "Rohini", "Mrigashira", "Pushya", "Chitra", "Anuradha", "Revati"]);
  const RIKTA_TITHIS = new Set([4, 9, 14]);

  const HOUSE_SIGNIFICATIONS = [
    "Self and body",
    "Wealth and speech",
    "Courage and siblings",
    "Home and mother",
    "Children and intelligence",
    "Disease, debt, and obstacles",
    "Marriage and partnership",
    "Longevity and transformation",
    "Dharma and fortune",
    "Career and authority",
    "Gains and networks",
    "Expenditure and release"
  ];

  const SOURCE_BOUNDARIES = [
    "The extract provides exact Jain unit hierarchies, Yuga metrics, Tithi/Yoga/Karana formulas, Muhurta prohibitions, and a 28-Nakshatra registry with Abhijit notes.",
    "The extract does not provide fully numeric longitudinal spans for all 28 Nakshatras. Runtime Moon mapping therefore uses the standard 27-lord backbone, while Jain 28-Nakshatra data is presented explicitly as a source table.",
    "The extract explicitly states that planet-to-Tirthankara mappings are absent from the provided source manuscripts. Those mappings are intentionally excluded from this implementation's source-backed remedy engine."
  ];

  function norm360(value) {
    return ((value % 360) + 360) % 360;
  }

  function degToDms(degrees) {
    const normalized = norm360(degrees);
    const d = Math.floor(normalized);
    const minutesFloat = (normalized - d) * 60;
    const m = Math.floor(minutesFloat);
    const s = Math.round((minutesFloat - m) * 60);
    return `${d}° ${String(m).padStart(2, "0")}' ${String(s).padStart(2, "0")}"`;
  }

  function formatDate(date) {
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "short",
      day: "2-digit"
    }).format(date);
  }

  function formatDateTime(date) {
    return `${formatDate(date)} ${date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}`;
  }

  function julianDay(year, month, day, hour) {
    let y = year;
    let m = month;
    if (m <= 2) {
      y -= 1;
      m += 12;
    }
    const A = Math.floor(y / 100);
    const B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + hour / 24 + B - 1524.5;
  }

  function lahiriAyanamsha(jd) {
    const T = (jd - 2451545.0) / 36525.0;
    return 23.85 + 1.396 * T;
  }

  function sunLongitude(jd) {
    const n = jd - 2451545.0;
    const L = norm360(280.460 + 0.9856474 * n);
    const g = norm360(357.528 + 0.9856003 * n) * Math.PI / 180;
    return norm360(L + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g));
  }

  function moonLongitude(jd) {
    const n = jd - 2451545.0;
    const L0 = norm360(218.316 + 13.176396 * n);
    const M = norm360(134.963 + 13.064993 * n) * Math.PI / 180;
    const F = norm360(93.272 + 13.22935 * n) * Math.PI / 180;
    const Msun = norm360(357.528 + 0.9856 * n) * Math.PI / 180;
    return norm360(
      L0 +
        6.289 * Math.sin(M) -
        1.274 * Math.sin(2 * F - M) +
        0.658 * Math.sin(2 * F) -
        0.214 * Math.sin(2 * M) -
        0.186 * Math.sin(Msun) -
        0.114 * Math.sin(2 * F)
    );
  }

  function planetLongitudes(jd) {
    const n = jd - 2451545.0;
    const values = {
      Sun: sunLongitude(jd),
      Moon: moonLongitude(jd),
      Mars: norm360(355.433 + 0.5240208 * n + 1.85 * Math.sin((19.373 + 0.5240208 * n) * Math.PI / 180)),
      Mercury: norm360(252.25 + 4.0923345 * n + 6.74 * Math.sin((174.794 + 4.0923345 * n) * Math.PI / 180)),
      Jupiter: norm360(34.351 + 0.0830853 * n + 5.55 * Math.sin((20.02 + 0.0830853 * n) * Math.PI / 180)),
      Venus: norm360(181.979 + 1.6021302 * n + 0.77 * Math.sin((212.4 + 1.6021302 * n) * Math.PI / 180)),
      Saturn: norm360(50.077 + 0.0334512 * n + 6.11 * Math.sin((317 + 0.0334512 * n) * Math.PI / 180))
    };
    const rahu = norm360(125.044555 - 0.0529539 * n);
    values.Rahu = rahu;
    values.Ketu = norm360(rahu + 180);
    return values;
  }

  function siderealize(values, ayanamsha) {
    return Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, norm360(value - ayanamsha)])
    );
  }

  function ascendant(jd, latitude, longitude, ayanamsha) {
    const T = (jd - 2451545.0) / 36525.0;
    let gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + T * T * 0.000387933 - T * T * T / 38710000.0;
    gmst = norm360(gmst);
    const lst = norm360(gmst + longitude);
    const eps = (23.439291111 - 0.013004167 * T) * Math.PI / 180;
    const latRad = latitude * Math.PI / 180;
    const lstRad = lst * Math.PI / 180;
    const tanAsc = -Math.cos(lstRad) / (Math.sin(eps) * Math.tan(latRad) + Math.cos(eps) * Math.sin(lstRad));
    let asc = Math.atan(tanAsc) * 180 / Math.PI;
    if (Math.cos(lstRad) > 0) {
      asc += 180;
    }
    return norm360(asc - ayanamsha);
  }

  function getRashiIndex(longitude) {
    return Math.floor(norm360(longitude) / 30);
  }

  function getHouseFromLagna(rashiIndex, lagnaIndex) {
    return ((rashiIndex - lagnaIndex + 12) % 12) + 1;
  }

  function getPlanetState(planet, rashiIndex) {
    if (PLANET_EXALT[planet] === rashiIndex) {
      return "Exalted";
    }
    if (PLANET_DEBIL[planet] === rashiIndex) {
      return "Debilitated";
    }
    if (PLANET_OWN[planet] && PLANET_OWN[planet].includes(rashiIndex)) {
      return "Own Sign";
    }
    return "Neutral";
  }

  function getComputedNakshatra(longitude) {
    const span = 360 / COMPUTED_NAKSHATRAS.length;
    const index = Math.min(COMPUTED_NAKSHATRAS.length - 1, Math.floor(norm360(longitude) / span));
    const start = index * span;
    const elapsed = (norm360(longitude) - start) / span;
    return {
      index,
      ...COMPUTED_NAKSHATRAS[index],
      pada: Math.min(4, Math.floor(elapsed * 4) + 1),
      elapsedFraction: elapsed,
      remainingFraction: 1 - elapsed
    };
  }

  function getJainNakshatraNotes() {
    return JAIN_NAKSHATRA_REGISTRY.map((entry) => ({
      ...entry,
      computed: entry.name !== "Abhijit",
      note: entry.note || ""
    }));
  }

  function solarDeclination(dayOfYear) {
    return 23.44 * Math.sin((2 * Math.PI / 365) * (dayOfYear - 81));
  }

  function sunriseTime(date, latitude, longitude, utcOffsetHours) {
    const start = new Date(Date.UTC(date.getFullYear(), 0, 0));
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const decl = solarDeclination(dayOfYear) * Math.PI / 180;
    const latRad = latitude * Math.PI / 180;
    const hourAngle = Math.acos(-Math.tan(latRad) * Math.tan(decl));
    const daylightHours = (2 * hourAngle * 180 / Math.PI) / 15;
    const solarNoon = 12 - (longitude / 15) + utcOffsetHours;
    const sunriseDecimal = solarNoon - daylightHours / 2;
    const sunriseHours = Math.floor(sunriseDecimal);
    const sunriseMinutes = Math.round((sunriseDecimal - sunriseHours) * 60);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), sunriseHours, sunriseMinutes, 0, 0);
  }

  function getUtcOffsetHours(longitude) {
    return Math.round(longitude / 15 * 2) / 2;
  }

  function getWeekdayName(date) {
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()];
  }

  function getTithiDetails(index) {
    const phaseIndex = ((index - 1) % 15);
    const paksha = index <= 15 ? "Shukla" : "Krishna";
    return {
      index,
      paksha,
      name: TITHI_NAMES[phaseIndex],
      label: `${paksha} ${TITHI_NAMES[phaseIndex]}`
    };
  }

  function getKaranaDetails(phaseDegrees) {
    const serial = Math.floor(phaseDegrees / 6) + 1;
    const name = serial <= 56 ? KARANA_NAMES[(serial - 1) % 7] : KARANA_NAMES[7 + ((serial - 57) % 4)];
    return { serial, name };
  }

  function getYogaDetails(sunLongitudeValue, moonLongitudeValue) {
    const total = norm360(sunLongitudeValue + moonLongitudeValue);
    const index = Math.floor(total / (360 / 27)) + 1;
    return { index, name: YOGA_NAMES[index - 1] };
  }

  function calculatePanchang(moment, latitude, longitude) {
    const utcOffset = getUtcOffsetHours(longitude);
    const birthDate = new Date(moment.getFullYear(), moment.getMonth(), moment.getDate());
    const sunrise = sunriseTime(birthDate, latitude, longitude, utcOffset);
    const hours = moment.getHours() + moment.getMinutes() / 60;
    const jd = julianDay(moment.getFullYear(), moment.getMonth() + 1, moment.getDate(), hours - utcOffset);
    const ayanamsha = lahiriAyanamsha(jd);
    const tropical = planetLongitudes(jd);
    const sidereal = siderealize(tropical, ayanamsha);
    const phase = norm360(sidereal.Moon - sidereal.Sun);
    const tithiIndex = Math.floor(phase / 12) + 1;
    const karana = getKaranaDetails(phase);
    const yoga = getYogaDetails(sidereal.Sun, sidereal.Moon);
    const nakshatra = getComputedNakshatra(sidereal.Moon);
    const elapsedMs = Math.max(0, moment - sunrise);
    const elapsedHours = elapsedMs / 3600000;
    const ishtakalaGhatis = elapsedHours * 2.5;
    return {
      sunrise,
      sidereal,
      phase,
      tithi: getTithiDetails(tithiIndex),
      weekday: getWeekdayName(moment),
      yoga,
      karana,
      nakshatra,
      ishtakalaGhatis: Number(ishtakalaGhatis.toFixed(2)),
      ayanamsha: Number(ayanamsha.toFixed(3))
    };
  }

  function calculateDashas(moment, moonLongitudeValue) {
    const birthNak = getComputedNakshatra(moonLongitudeValue);
    const startIndex = VIMSHOTTARI_ORDER.indexOf(birthNak.lord);
    const currentYears = VIMSHOTTARI_YEARS[birthNak.lord] * birthNak.remainingFraction;
    const startDate = new Date(moment.getTime() - (VIMSHOTTARI_YEARS[birthNak.lord] - currentYears) * 365.25 * 86400000);
    const dashas = [];
    let cursor = new Date(startDate);
    for (let i = 0; i < 9; i += 1) {
      const lord = VIMSHOTTARI_ORDER[(startIndex + i) % 9];
      const years = i === 0 ? currentYears : VIMSHOTTARI_YEARS[lord];
      const end = new Date(cursor.getTime() + years * 365.25 * 86400000);
      const antardashas = [];
      let antarCursor = new Date(cursor);
      const antarStartIndex = VIMSHOTTARI_ORDER.indexOf(lord);
      for (let j = 0; j < 9; j += 1) {
        const antarLord = VIMSHOTTARI_ORDER[(antarStartIndex + j) % 9];
        const antarYears = (years * VIMSHOTTARI_YEARS[antarLord]) / 120;
        const antarEnd = new Date(antarCursor.getTime() + antarYears * 365.25 * 86400000);
        antardashas.push({
          lord: antarLord,
          years: Number(antarYears.toFixed(2)),
          start: new Date(antarCursor),
          end: antarEnd
        });
        antarCursor = antarEnd;
      }
      dashas.push({
        lord,
        years: Number(years.toFixed(2)),
        start: new Date(cursor),
        end,
        antardashas
      });
      cursor = end;
    }
    const current = dashas.find((item) => item.start <= moment && item.end > moment) || dashas[0];
    const currentAntar = current.antardashas.find((item) => item.start <= moment && item.end > moment) || current.antardashas[0];
    return {
      birthNak,
      dashas,
      current,
      currentAntar,
      birthBalanceYears: Number(currentYears.toFixed(2)),
      formula: "Remaining Dasha at Birth = Planet total years - elapsed portion of birth Nakshatra Dasha"
    };
  }

  function getHoraSchedule(moment, latitude, longitude) {
    const utcOffset = getUtcOffsetHours(longitude);
    const baseDate = new Date(moment.getFullYear(), moment.getMonth(), moment.getDate());
    const sunrise = sunriseTime(baseDate, latitude, longitude, utcOffset);
    const weekday = getWeekdayName(moment);
    const firstLord = WEEKDAY_LORD[weekday];
    const firstIndex = HORA_SEQUENCE.indexOf(firstLord);
    const horas = [];
    for (let i = 0; i < 24; i += 1) {
      const lord = HORA_SEQUENCE[(firstIndex + i) % HORA_SEQUENCE.length];
      const start = new Date(sunrise.getTime() + i * 3600000);
      const end = new Date(start.getTime() + 3600000);
      horas.push({
        index: i + 1,
        lord,
        start,
        end,
        auspicious: BENEFIC_HORAS.has(lord)
      });
    }
    return horas;
  }

  function classifyForbiddenTithi(weekday, tithiIndex) {
    const categories = [];
    Object.entries(FORBIDDEN_TITHI_MAPS).forEach(([name, map]) => {
      if (map[weekday] === tithiIndex) {
        categories.push(name);
      }
    });
    return categories;
  }

  function evaluateMuhurta(moment, latitude, longitude) {
    const panchang = calculatePanchang(moment, latitude, longitude);
    const forbidden = classifyForbiddenTithi(panchang.weekday, panchang.tithi.index);
    const horas = getHoraSchedule(moment, latitude, longitude);
    const activeHora = horas.find((hora) => moment >= hora.start && moment < hora.end) || horas[0];
    const businessOkay =
      panchang.weekday !== "Tuesday" &&
      panchang.tithi.index !== 30 &&
      !RIKTA_TITHIS.has(((panchang.tithi.index - 1) % 15) + 1) &&
      panchang.karana.name !== "Vishti" &&
      BUSINESS_NAKSHATRAS.has(panchang.nakshatra.name);
    const marriageFlags = [];
    const sunRashi = getRashiIndex(panchang.sidereal.Sun);
    if (sunRashi === 8 || sunRashi === 11) {
      marriageFlags.push("Kharmas warning: Sun in Sagittarius or Pisces.");
    }
    if (forbidden.length) {
      marriageFlags.push(`Forbidden tithi class present: ${forbidden.join(", ")}.`);
    }
    return {
      panchang,
      forbidden,
      activeHora,
      horas,
      businessOkay,
      marriageFlags,
      notes: [
        "Hora rule used from extract: initiate auspicious work in Moon, Mercury, Jupiter, or Venus horas.",
        "Business checks implemented from extract: avoid Tuesday, Amavasya, Rikta Tithis, and Vishti Karana."
      ]
    };
  }

  function getAspects(planet, fromHouse) {
    const aspects = [((fromHouse - 1 + 6) % 12) + 1];
    if (planet === "Mars") {
      aspects.push(((fromHouse - 1 + 3) % 12) + 1, ((fromHouse - 1 + 7) % 12) + 1);
    }
    if (planet === "Jupiter" || planet === "Rahu" || planet === "Ketu") {
      aspects.push(((fromHouse - 1 + 4) % 12) + 1, ((fromHouse - 1 + 8) % 12) + 1);
    }
    if (planet === "Saturn") {
      aspects.push(((fromHouse - 1 + 2) % 12) + 1, ((fromHouse - 1 + 9) % 12) + 1);
    }
    return [...new Set(aspects)];
  }

  function getCosmologySnapshot(sidereal) {
    const innerOrbit = 44820;
    const sunOrbitWidth = 510 + 48 / 61;
    const sunSeasonalFactor = Math.sin((sidereal.Sun * Math.PI) / 180);
    const moonSeasonalFactor = Math.sin((sidereal.Moon * Math.PI) / 180);
    const sunRadius = innerOrbit + ((sunSeasonalFactor + 1) / 2) * sunOrbitWidth;
    const moonRadius = innerOrbit + ((moonSeasonalFactor + 1) / 2) * 500;
    return {
      meru: { x: 0, y: 0 },
      visibleSun: { radius: Number(sunRadius.toFixed(2)), angle: Number(sidereal.Sun.toFixed(2)) },
      visibleMoon: { radius: Number(moonRadius.toFixed(2)), angle: Number(sidereal.Moon.toFixed(2)) },
      antipodalSun: { radius: Number(sunRadius.toFixed(2)), angle: Number(norm360(sidereal.Sun + 180).toFixed(2)) },
      antipodalMoon: { radius: Number(moonRadius.toFixed(2)), angle: Number(norm360(sidereal.Moon + 180).toFixed(2)) },
      note: "Visible and antipodal luminaries are shown 180 degrees apart, matching the extract's alternating two-sun/two-moon logic for Jambudvipa."
    };
  }

  function detectYogas(sidereal, lagnaIndex) {
    const yogas = [];
    const moonRashi = getRashiIndex(sidereal.Moon);
    const sunRashi = getRashiIndex(sidereal.Sun);
    const jupiterFromMoon = (getRashiIndex(sidereal.Jupiter) - moonRashi + 12) % 12;
    if ([0, 3, 6, 9].includes(jupiterFromMoon)) {
      yogas.push({ name: "Gajakesari", result: "Jupiter in a kendra from the Moon." });
    }
    if (getRashiIndex(sidereal.Sun) === getRashiIndex(sidereal.Mercury)) {
      yogas.push({ name: "Budhaditya", result: "Sun and Mercury occupy the same rashi." });
    }
    const moonMarsGap = Math.abs(norm360(sidereal.Moon - sidereal.Mars));
    if (moonMarsGap < 10 || moonMarsGap > 350) {
      yogas.push({ name: "Chandra-Mangal", result: "Moon and Mars are tightly conjoined." });
    }
    const prevMoon = (moonRashi + 11) % 12;
    const nextMoon = (moonRashi + 1) % 12;
    const adjacent = Object.entries(sidereal)
      .filter(([planet]) => !["Moon", "Rahu", "Ketu"].includes(planet))
      .filter(([, lon]) => {
        const rashi = getRashiIndex(lon);
        return rashi === prevMoon || rashi === nextMoon;
      });
    if (!adjacent.length) {
      yogas.push({ name: "Kemadruma", result: "No planet flanks the Moon." });
    }
    Object.entries(sidereal).forEach(([planet, lon]) => {
      const rashi = getRashiIndex(lon);
      const house = getHouseFromLagna(rashi, lagnaIndex);
      if (PLANET_DEBIL[planet] === rashi) {
        yogas.push({ name: `${planet} Debilitated`, result: `${planet} is debilitated in house ${house}.` });
      }
    });
    return yogas;
  }

  function buildChart(input) {
    const date = new Date(`${input.date}T${input.time}`);
    const utcOffset = getUtcOffsetHours(input.longitude);
    const decimalHours = date.getHours() + date.getMinutes() / 60;
    const jd = julianDay(date.getFullYear(), date.getMonth() + 1, date.getDate(), decimalHours - utcOffset);
    const ayanamsha = lahiriAyanamsha(jd);
    const tropical = planetLongitudes(jd);
    const sidereal = siderealize(tropical, ayanamsha);
    const lagnaLongitude = ascendant(jd, input.latitude, input.longitude, ayanamsha);
    const lagnaIndex = getRashiIndex(lagnaLongitude);
    const panchang = calculatePanchang(date, input.latitude, input.longitude);
    const dasha = calculateDashas(date, sidereal.Moon);
    const planets = PLANETS.map((planet) => {
      const longitude = sidereal[planet.key];
      const rashiIndex = getRashiIndex(longitude);
      const house = getHouseFromLagna(rashiIndex, lagnaIndex);
      return {
        ...planet,
        longitude,
        longitudeText: degToDms(longitude),
        rashiIndex,
        rashiName: RASHI_SHORT[rashiIndex],
        house,
        state: getPlanetState(planet.key, rashiIndex),
        aspects: getAspects(planet.key, house),
        remedy: REMEDY_TABLE[planet.key]
      };
    });
    return {
      input,
      generatedAt: new Date(),
      jd: Number(jd.toFixed(5)),
      ayanamsha: Number(ayanamsha.toFixed(3)),
      lagnaLongitude,
      lagnaText: degToDms(lagnaLongitude),
      lagnaIndex,
      lagnaName: RASHI_SHORT[lagnaIndex],
      planets,
      panchang,
      dasha,
      yogas: detectYogas(sidereal, lagnaIndex),
      cosmology: getCosmologySnapshot(sidereal),
      notes: SOURCE_BOUNDARIES
    };
  }

  function chartToJson(chart) {
    return JSON.stringify(
      {
        subject: chart.input.name || "Unnamed",
        lagna: { sign: chart.lagnaName, longitude: chart.lagnaText },
        panchang: {
          weekday: chart.panchang.weekday,
          tithi: chart.panchang.tithi.label,
          nakshatra: chart.panchang.nakshatra.name,
          yoga: chart.panchang.yoga.name,
          karana: chart.panchang.karana.name
        },
        currentDasha: {
          maha: chart.dasha.current.lord,
          antar: chart.dasha.currentAntar.lord,
          balanceYearsAtBirth: chart.dasha.birthBalanceYears
        },
        planets: chart.planets.map((planet) => ({
          planet: planet.key,
          longitude: planet.longitudeText,
          rashi: planet.rashiName,
          house: planet.house,
          state: planet.state
        }))
      },
      null,
      2
    );
  }

  window.JAIN = {
    data: {
      TIME_UNITS,
      SPACE_UNITS,
      YUGA_DATA,
      PLANETS,
      RASHIS,
      RASHI_SHORT,
      HOUSE_SIGNIFICATIONS,
      JAIN_NAKSHATRA_REGISTRY,
      REMEDY_TABLE,
      JAIN_PRINCIPLE_GUIDANCE,
      SOURCE_BOUNDARIES
    },
    utils: {
      norm360,
      degToDms,
      formatDate,
      formatDateTime,
      chartToJson,
      getJainNakshatraNotes
    },
    astro: {
      buildChart,
      calculatePanchang,
      evaluateMuhurta,
      getHoraSchedule
    }
  };
}());
