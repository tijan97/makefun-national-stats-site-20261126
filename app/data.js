// NusaStats data: Indonesia's national statistics, 2019–2024.
// Every figure below is a published figure from Statistics Indonesia (BPS),
// the World Bank, Bank Indonesia, or the ministry named in the source line.
// Values are rounded for display; the source line on each page says where
// each number comes from. Nothing here is invented or modelled by us.

// Headline indicators, 2024 unless noted.
export const HEADLINE = {
  populationMillion: 281.6,
  populationNote: 'Mid-year estimate, 2024',
  gdpRpTrillion: 22139.0,
  gdpUsdBillion: 1396.3,
  gdpPerCapitaUsd: 4960,
  gdpPerCapitaRpMillion: 78.62,
  growthPct: 5.03,
  inflationDecPct: 1.57,
  inflationAvgPct: 2.32,
  unemploymentPct: 4.91,
  povertyPct: 9.03,
  povertyMillion: 25.22,
  hdi: 75.02,
  gini: 0.379,
  lifeExpectancy: 74.18,
  exportsUsdBillion: 264.7,
  importsUsdBillion: 233.66,
  tradeSurplusUsdBillion: 31.04,
  provinces: 38,
  landAreaKm2: 1892555,
  capital: 'Jakarta',
  currency: 'Rupiah (IDR)',
  language: 'Indonesian',
};

// Annual series, 2019–2024. Sources: BPS national accounts, CPI release,
// Sakernas (labour force survey), Susenas (poverty), IPM release.
export const YEARS = [2019, 2020, 2021, 2022, 2023, 2024];

export const SERIES = {
  populationMillion: [269.6, 271.7, 273.9, 275.8, 278.7, 281.6],
  gdpNominalRpTrillion: [15833.9, 15434.2, 16976.7, 19588.5, 20892.4, 22139.0],
  gdpGrowthPct: [5.02, -2.07, 3.7, 5.31, 5.05, 5.03],
  inflationDecPct: [2.72, 1.68, 1.87, 5.51, 2.61, 1.57],
  unemploymentAugPct: [5.28, 7.07, 6.49, 5.86, 5.32, 4.91],
  povertyMarPct: [9.41, 9.78, 10.14, 9.54, 9.36, 9.03],
  giniMar: [0.38, 0.381, 0.384, 0.381, 0.379, 0.379],
  hdi: [71.92, 71.94, 72.29, 73.37, 74.39, 75.02],
};

// GDP by sector, share of GDP 2023 (%). Source: BPS, PDB menurut lapangan usaha.
export const SECTORS = [
  { name: 'Manufacturing', share: 18.7 },
  { name: 'Wholesale & retail trade', share: 12.9 },
  { name: 'Agriculture, forestry & fishing', share: 12.5 },
  { name: 'Construction', share: 9.9 },
  { name: 'Mining & quarrying', share: 9.1 },
  { name: 'Information & communication', share: 4.2 },
  { name: 'Financial & insurance services', share: 4.2 },
  { name: 'Transportation & storage', share: 4.0 },
  { name: 'Public administration & defence', share: 3.6 },
  { name: 'Real estate', share: 2.5 },
];

// GDP by island group, share of GDP 2024 (%). Source: BPS.
export const ISLANDS = [
  { name: 'Java', share: 57.0 },
  { name: 'Sumatra', share: 22.1 },
  { name: 'Kalimantan', share: 8.3 },
  { name: 'Sulawesi', share: 7.0 },
  { name: 'Bali & Nusa Tenggara', share: 2.8 },
  { name: 'Maluku & Papua', share: 2.7 },
];

// Ten largest provinces by population, mid-2024 estimate (millions). Source: BPS.
export const PROVINCES = [
  { name: 'West Java', population: 49.94, capital: 'Bandung', island: 'Java' },
  { name: 'East Java', population: 41.81, capital: 'Surabaya', island: 'Java' },
  { name: 'Central Java', population: 37.89, capital: 'Semarang', island: 'Java' },
  { name: 'North Sumatra', population: 15.59, capital: 'Medan', island: 'Sumatra' },
  { name: 'Banten', population: 12.48, capital: 'Serang', island: 'Java' },
  { name: 'Jakarta', population: 10.68, capital: 'Jakarta', island: 'Java' },
  { name: 'South Sulawesi', population: 9.54, capital: 'Makassar', island: 'Sulawesi' },
  { name: 'Lampung', population: 9.39, capital: 'Bandar Lampung', island: 'Sumatra' },
  { name: 'South Sumatra', population: 8.94, capital: 'Palembang', island: 'Sumatra' },
  { name: 'Riau', population: 7.01, capital: 'Pekanbaru', island: 'Sumatra' },
];

// Age structure, 2024 (% of population). Source: BPS population projection.
export const AGE_GROUPS = [
  { group: '0–14 years', share: 24.0 },
  { group: '15–64 years', share: 68.8 },
  { group: '65 years and over', share: 7.2 },
];

// Labour market, August 2024. Source: BPS Sakernas.
export const LABOUR = {
  labourForceMillion: 152.11,
  employedMillion: 144.64,
  unemployedMillion: 7.47,
  participationRatePct: 70.63,
  formalSharePct: 40.66,
  informalSharePct: 59.34,
};

// Human development, 2024. Source: BPS, Indeks Pembangunan Manusia.
export const HUMAN_DEV = {
  hdi: 75.02,
  lifeExpectancy: 74.18,
  meanSchoolingYears: 9.08,
  expectedSchoolingYears: 13.21,
  stuntingPct: 19.8,
  stuntingSource: 'Ministry of Health, SSGI 2024',
  literacyPct: 98.0,
  internetUsersMillion: 221.6,
  internetPenetrationPct: 79.5,
  internetSource: 'APJII Internet Survey 2024',
};

// Money and the state, 2024. Sources: Bank Indonesia; Ministry of Finance; BKPM.
export const MONEY = {
  investmentRealisationRpTrillion: 1714.2,
  investmentSource: 'BKPM (Investment Ministry)',
  govDebtPctGdp: 38.9,
  govDebtSource: 'Ministry of Finance, end-2024',
  exportsUsdBillion: 264.7,
  importsUsdBillion: 233.66,
  topExport: 'Coal, palm oil, iron & steel',
  topImport: 'Machinery, electrical equipment, fuels',
};

export const SOURCES = [
  { short: 'BPS', full: 'Statistics Indonesia (Badan Pusat Statistik) — bps.go.id' },
  { short: 'World Bank', full: 'World Bank, World Development Indicators' },
  { short: 'Bank Indonesia', full: 'Bank Indonesia — bi.go.id' },
  { short: 'Ministry of Finance', full: 'Ministry of Finance of the Republic of Indonesia' },
  { short: 'BKPM', full: 'Ministry of Investment / BKPM investment realisation release' },
  { short: 'APJII', full: 'Indonesian Internet Service Providers Association, Internet Survey 2024' },
  { short: 'SSGI', full: 'Ministry of Health, Indonesian Nutrition Status Survey (SSGI) 2024' },
];

export const UPDATED = 'Figures as published for 2024; site built November 2026.';
