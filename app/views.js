// HTML for each NusaStats page, built from the figures in data.js.
// Every value is escaped before it goes into the page.

import {
  AGE_GROUPS,
  HEADLINE,
  HUMAN_DEV,
  ISLANDS,
  LABOUR,
  MONEY,
  PROVINCES,
  SECTORS,
  SERIES,
  SOURCES,
  UPDATED,
  YEARS,
} from './data.js';

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

const fmtInt = (n) => n.toLocaleString('en-US');
const fmt1 = (n) => n.toFixed(1);
const fmt2 = (n) => n.toFixed(2);

function kpi(label, value, note, tone) {
  const cls = tone ? ` class="${tone}"` : '';
  return `<div class="kpi"><div class="label">${esc(label)}</div>
    <div class="value">${value}</div>
    <div class="note"${cls}>${esc(note)}</div></div>`;
}

function barRows(rows, max, color) {
  return rows
    .map(
      (r) => `<div class="bar-row"><span>${esc(r.name)}</span>
        <span class="bar-track"><span class="bar-fill${color ? ' ' + color : ''}"
          style="display:block;width:${((r.share / max) * 100).toFixed(1)}%"></span></span>
        <span class="bar-val">${fmt1(r.share)}%</span></div>`,
    )
    .join('');
}

function seriesTable(label, values, fmt) {
  const cells = values.map((v) => `<td class="num">${fmt(v)}</td>`).join('');
  const heads = YEARS.map((y) => `<th class="num">${y}</th>`).join('');
  return `<div class="table-scroll"><table>
    <thead><tr><th>${esc(label)}</th>${heads}</tr></thead>
    <tbody><tr><td>${esc(label)}</td>${cells}</tr></tbody></table></div>`;
}

export function overview() {
  const h = HEADLINE;
  return `
<p class="breadcrumb">NusaStats / Overview</p>
<h1>Indonesia in numbers</h1>
<p class="lede">One country, 38 provinces, 281.6 million people — and an economy that grew
5.03% in 2024. This is the short version of Indonesia's official statistics: the
figures a visitor needs first, each one traceable to the release that published it.</p>

<div class="kpis">
  ${kpi('Population, 2024', '281.6<small> million</small>', 'Mid-year estimate · BPS')}
  ${kpi('Economy (GDP), 2024', 'Rp 22,139<small> trillion</small>', 'US$1,396 billion · BPS')}
  ${kpi('Growth, 2024', '5.03<small>%</small>', 'Real GDP, year on year · BPS')}
  ${kpi('Inflation, Dec 2024', '1.57<small>%</small>', 'Year on year · BPS', 'down')}
  ${kpi('Unemployment, Aug 2024', '4.91<small>%</small>', 'Lowest since 2019 · BPS Sakernas')}
  ${kpi('Poverty, Mar 2024', '9.03<small>%</small>', '25.22 million people · BPS')}
</div>

<div class="card">
  <h3>Growth and prices, 2019–2024</h3>
  <p class="small">Switch the chart between the two series that define the decade:
  the pandemic crash and recovery in growth, and the 2022 inflation spike.</p>
  <div class="controls">
    <span class="seg" role="group" aria-label="Chart series">
      <button type="button" data-series="growth" aria-pressed="true">GDP growth</button>
      <button type="button" data-series="inflation" aria-pressed="false">Inflation</button>
    </span>
  </div>
  <div class="chart-wrap"><canvas class="chart" id="overview-chart" data-chart="growth"></canvas></div>
  <p class="source">BPS — national accounts (growth) and CPI release (inflation), December year-on-year.</p>
</div>

<div class="two-col">
  <div class="card">
    <h3>Where the economy sits</h3>
    <p>Java still makes well over half of national output; Sumatra is next at about a fifth.</p>
    ${barRows(ISLANDS, 60, 'amber')}
    <p class="source">BPS, GDP by province, 2024.</p>
  </div>
  <div class="card">
    <h3>People, in brief</h3>
    <ul class="fact-list">
      <li><span>Life expectancy</span><b>${fmt2(h.lifeExpectancy)} years</b></li>
      <li><span>Human Development Index</span><b>${fmt2(h.hdi)}</b></li>
      <li><span>Largest province</span><b>West Java, 49.9m</b></li>
      <li><span>Provinces</span><b>${h.provinces}</b></li>
      <li><span>Land area</span><b>${fmtInt(h.landAreaKm2)} km²</b></li>
      <li><span>Exports, 2024</span><b>US$${fmt1(h.exportsUsdBillion)}bn</b></li>
    </ul>
    <p class="source">BPS, 2024.</p>
  </div>
</div>

<div class="callout"><strong>New in this edition:</strong> poverty fell below 9.1% for the first time
in March 2024, and unemployment fell to 4.91% — both series are on their
<a href="#/welfare">Welfare</a> and <a href="#/employment">Jobs</a> pages.</div>

<h2>Explore the statistics</h2>
<ul class="pill-list">
  <li><a href="#/population">Population →</a></li>
  <li><a href="#/economy">Economy →</a></li>
  <li><a href="#/prices">Prices →</a></li>
  <li><a href="#/employment">Jobs →</a></li>
  <li><a href="#/welfare">Welfare →</a></li>
  <li><a href="#/regions">Regions →</a></li>
</ul>
<p class="small">${esc(UPDATED)}</p>`;
}

export function population() {
  return `
<p class="breadcrumb"><a href="#/">NusaStats</a> / Population</p>
<h1>Population</h1>
<p class="lede">281.6 million people at mid-2024, growing by roughly 1% a year — and still
young: more than two in three Indonesians are of working age.</p>

<div class="kpis">
  ${kpi('Population, 2024', '281.6<small> million</small>', 'BPS mid-year estimate')}
  ${kpi('Density', '149<small> /km²</small>', 'World Bank, 2024')}
  ${kpi('Working age (15–64)', '68.8<small>%</small>', 'BPS projection, 2024')}
</div>

<div class="card">
  <h3>Population, 2019–2024 (millions)</h3>
  <div class="chart-wrap"><canvas class="chart" data-chart="population"></canvas></div>
  <p class="source">BPS, mid-year population estimates.</p>
</div>

<div class="two-col">
  <div class="card">
    <h3>Age structure, 2024</h3>
    ${barRows(AGE_GROUPS, 70)}
    <p class="source">BPS population projection, 2024.</p>
  </div>
  <div class="card">
    <h3>The demographic dividend</h3>
    <p>With 68.8% of the population aged 15–64 and only 7.2% aged 65 and over,
    Indonesia's dependency ratio is about 45 dependants per 100 workers — the
    window demographers call the demographic dividend, open until the 2030s.</p>
    <p>Median age is about 31 years. The population is still growing by roughly
    2.7 million people a year.</p>
    <p class="source">BPS; World Bank WDI, 2024.</p>
  </div>
</div>

<h2>Largest provinces</h2>
<p>Three provinces on Java hold more than 45% of the country. The full ranking is on the
<a href="#/regions">Regions</a> page.</p>
<div class="table-scroll"><table>
  <thead><tr><th>Province</th><th>Capital</th><th class="num">Population (m)</th></tr></thead>
  <tbody>${PROVINCES.slice(0, 5)
    .map(
      (p) => `<tr><td>${esc(p.name)}</td><td>${esc(p.capital)}</td>
        <td class="num">${fmt2(p.population)}</td></tr>`,
    )
    .join('')}</tbody></table></div>
<p class="source">BPS, mid-2024 estimates.</p>`;
}

export function economy() {
  return `
<p class="breadcrumb"><a href="#/">NusaStats</a> / Economy</p>
<h1>Economy</h1>
<p class="lede">Nominal GDP reached Rp 22,139 trillion in 2024 — US$1,396 billion, or
US$4,960 per person — growing 5.03% in real terms, the fifth straight year of
growth above 5% outside the pandemic year.</p>

<div class="kpis">
  ${kpi('GDP, 2024', 'Rp 22,139<small> tn</small>', 'US$1,396bn · BPS')}
  ${kpi('GDP per person', 'US$4,960', 'Rp 78.62 million · BPS')}
  ${kpi('Real growth', '5.03<small>%</small>', '2024, year on year · BPS')}
  ${kpi('Exports, 2024', 'US$264.7<small>bn</small>', 'Trade surplus US$31.0bn · BPS')}
  ${kpi('Investment realised', 'Rp 1,714<small> tn</small>', 'BKPM, 2024')}
  ${kpi('Government debt', '38.9<small>% of GDP</small>', 'Ministry of Finance, end-2024')}
</div>

<div class="card">
  <h3>Real GDP growth, 2019–2024 (%)</h3>
  <div class="chart-wrap"><canvas class="chart" data-chart="growth"></canvas></div>
  <p>The −2.07% of 2020 was Indonesia's first full-year contraction since 1998; the
  economy has grown between 5.0% and 5.3% every year since.</p>
  <p class="source">BPS, national accounts.</p>
</div>

<div class="card">
  <h3>Nominal GDP, 2019–2024 (Rp trillion)</h3>
  <div class="chart-wrap"><canvas class="chart" data-chart="gdp"></canvas></div>
  <p class="source">BPS, national accounts.</p>
</div>

<h2>What the economy is made of</h2>
<p>Manufacturing is the largest single sector at 18.7% of GDP, followed by trade
and agriculture. Shares below are for 2023, the latest full sector breakdown.</p>
<div class="card">
  ${barRows(SECTORS, 20)}
  <p class="source">BPS, GDP by industry, 2023.</p>
</div>

<h2>Trade</h2>
<div class="two-col">
  <div class="card">
    <h3>Exports &amp; imports, 2024</h3>
    <ul class="fact-list">
      <li><span>Exports</span><b>US$264.70bn</b></li>
      <li><span>Imports</span><b>US$233.66bn</b></li>
      <li><span>Trade surplus</span><b>US$31.04bn</b></li>
      <li><span>Top exports</span><b>${esc(MONEY.topExport)}</b></li>
      <li><span>Top imports</span><b>${esc(MONEY.topImport)}</b></li>
    </ul>
    <p class="source">BPS, foreign trade statistics, 2024.</p>
  </div>
  <div class="card">
    <h3>Investment</h3>
    <p>Realised investment reached Rp 1,714.2 trillion in 2024, with foreign
    investment concentrated in basic metals, mining and transport equipment.
    Household consumption remains the largest spending component, at roughly
    54% of GDP.</p>
    <p class="source">${esc(MONEY.investmentSource)}; BPS.</p>
  </div>
</div>

<h2>Annual figures</h2>
${seriesTable('Real GDP growth (%)', SERIES.gdpGrowthPct, fmt2)}
${seriesTable('Nominal GDP (Rp trillion)', SERIES.gdpNominalRpTrillion, (v) => fmtInt(v))}
<p class="source">BPS, national accounts.</p>`;
}

export function prices() {
  return `
<p class="breadcrumb"><a href="#/">NusaStats</a> / Prices</p>
<h1>Prices &amp; inflation</h1>
<p class="lede">Consumer prices rose 1.57% in the year to December 2024 — the lowest
December reading in the series — after the 5.51% spike of 2022. The annual
average for 2024 was 2.32%.</p>

<div class="kpis">
  ${kpi('Inflation, Dec 2024', '1.57<small>%</small>', 'Year on year · BPS')}
  ${kpi('Annual average, 2024', '2.32<small>%</small>', 'BPS CPI')}
  ${kpi('Peak, 2022', '5.51<small>%</small>', 'December year on year · BPS')}
</div>

<div class="card">
  <h3>Inflation, December year-on-year, 2019–2024 (%)</h3>
  <div class="chart-wrap"><canvas class="chart" data-chart="inflation"></canvas></div>
  <p class="source">BPS, CPI release.</p>
</div>

<div class="card">
  <h3>Reading the series</h3>
  <p>The 2022 spike followed the September 2022 administered fuel-price rise,
  which pushed transport costs up sharply; by 2024 food-price pressure had eased
  and administered prices were flat, bringing December inflation to its lowest
  since the series began in its current form.</p>
  <p>Bank Indonesia's inflation target band is 2.5% ± 1 percentage point. The
  December 2024 reading of 1.57% sat just below the bottom of the band.</p>
  <p class="source">BPS; Bank Indonesia.</p>
</div>

<h2>Annual figures</h2>
${seriesTable('Inflation, Dec y-on-y (%)', SERIES.inflationDecPct, fmt2)}
<p class="source">BPS, CPI release.</p>`;
}

export function employment() {
  const l = LABOUR;
  return `
<p class="breadcrumb"><a href="#/">NusaStats</a> / Jobs</p>
<h1>Jobs</h1>
<p class="lede">152.11 million Indonesians were in the labour force in August 2024, and
144.64 million of them were working. Unemployment, at 4.91%, is the lowest
August reading since 2019.</p>

<div class="kpis">
  ${kpi('Labour force', '152.11<small> m</small>', 'Aug 2024 · BPS Sakernas')}
  ${kpi('Employed', '144.64<small> m</small>', 'Aug 2024 · BPS Sakernas')}
  ${kpi('Unemployment', '4.91<small>%</small>', '7.47 million people · BPS')}
  ${kpi('Participation rate', '70.63<small>%</small>', 'Aug 2024 · BPS Sakernas')}
  ${kpi('Formal workers', '40.66<small>%</small>', 'Of the employed · BPS')}
  ${kpi('Informal workers', '59.34<small>%</small>', 'Of the employed · BPS')}
</div>

<div class="card">
  <h3>Unemployment rate, August, 2019–2024 (%)</h3>
  <div class="chart-wrap"><canvas class="chart" data-chart="unemployment"></canvas></div>
  <p>The pandemic pushed unemployment to 7.07% in August 2020; it has fallen every
  year since, passing its pre-pandemic level in 2024.</p>
  <p class="source">BPS Sakernas, August rounds.</p>
</div>

<div class="two-col">
  <div class="card">
    <h3>Formal vs informal work</h3>
    ${barRows(
      [
        { name: 'Informal workers', share: l.informalSharePct },
        { name: 'Formal workers', share: l.formalSharePct },
      ],
      60,
      'amber',
    )}
    <p>Nearly six in ten working Indonesians are in informal work — own-account
    workers, casual workers and unpaid family workers — a share that has barely
    moved in a decade.</p>
    <p class="source">BPS Sakernas, August 2024.</p>
  </div>
  <div class="card">
    <h3>Who is out of work</h3>
    <p>Unemployment is concentrated among the young: the youth unemployment rate
    runs roughly three times the national rate, and most of the unemployed have
    a senior-high-school education or below. Women participate far less than men
    — about 56% against about 85%.</p>
    <p class="source">BPS Sakernas, August 2024.</p>
  </div>
</div>

<h2>Annual figures</h2>
${seriesTable('Unemployment, August (%)', SERIES.unemploymentAugPct, fmt2)}
<p class="source">BPS Sakernas.</p>`;
}

export function welfare() {
  return `
<p class="breadcrumb"><a href="#/">NusaStats</a> / Welfare</p>
<h1>Welfare &amp; human development</h1>
<p class="lede">Poverty fell to 9.03% in March 2024 — 25.22 million people — the lowest
rate on record. The Human Development Index reached 75.02, its highest ever.</p>

<div class="kpis">
  ${kpi('Poverty rate', '9.03<small>%</small>', 'Mar 2024 · BPS')}
  ${kpi('People in poverty', '25.22<small> m</small>', 'Mar 2024 · BPS')}
  ${kpi('Human Development Index', '75.02', '2024 · BPS')}
  ${kpi('Life expectancy', '74.18<small> yrs</small>', '2024 · BPS')}
  ${kpi('Gini ratio', '0.379', 'Mar 2024 · BPS')}
  ${kpi('Stunting, under-5s', '19.8<small>%</small>', 'SSGI 2024')}
</div>

<div class="card">
  <h3>Poverty rate, March, 2019–2024 (%)</h3>
  <div class="chart-wrap"><canvas class="chart" data-chart="poverty"></canvas></div>
  <p>Poverty jumped above 10% in March 2021 as the pandemic hit household incomes,
  then fell for three straight years to its lowest level since measurement began.</p>
  <p class="source">BPS Susenas, March rounds.</p>
</div>

<div class="two-col">
  <div class="card">
    <h3>Human Development Index, 2019–2024</h3>
    <div class="chart-wrap"><canvas class="chart" data-chart="hdi"></canvas></div>
    <p class="source">BPS, Indeks Pembangunan Manusia.</p>
  </div>
  <div class="card">
    <h3>What makes up the HDI</h3>
    <ul class="fact-list">
      <li><span>Life expectancy at birth</span><b>${fmt2(HUMAN_DEV.lifeExpectancy)} yrs</b></li>
      <li><span>Expected years of schooling</span><b>${fmt2(HUMAN_DEV.expectedSchoolingYears)}</b></li>
      <li><span>Mean years of schooling</span><b>${fmt2(HUMAN_DEV.meanSchoolingYears)}</b></li>
      <li><span>Adult literacy</span><b>${fmt1(HUMAN_DEV.literacyPct)}%</b></li>
      <li><span>Internet users</span><b>${fmt1(HUMAN_DEV.internetUsersMillion)}m (${fmt1(HUMAN_DEV.internetPenetrationPct)}%)</b></li>
    </ul>
    <p class="source">BPS, 2024; ${esc(HUMAN_DEV.internetSource)}.</p>
  </div>
</div>

<div class="card">
  <h3>Inequality</h3>
  <p>The Gini ratio — 0 for perfect equality, 1 for total inequality — was 0.379
  in March 2024, little changed in five years. Inequality is higher in cities
  (0.391) than in villages (0.306). The richest tenth of households spend about
  4.5 times what the poorest tenth spend.</p>
  <p class="source">BPS Susenas, March 2024.</p>
</div>

<h2>Annual figures</h2>
${seriesTable('Poverty rate, March (%)', SERIES.povertyMarPct, fmt2)}
${seriesTable('Human Development Index', SERIES.hdi, fmt2)}
<p class="source">BPS.</p>`;
}

export function regions() {
  const rows = PROVINCES.map(
    (p, i) => `<tr data-name="${esc(p.name.toLowerCase())}" data-island="${esc(p.island.toLowerCase())}">
      <td>${i + 1}</td><td>${esc(p.name)}</td><td>${esc(p.capital)}</td>
      <td>${esc(p.island)}</td><td class="num">${fmt2(p.population)}</td></tr>`,
  ).join('');
  return `
<p class="breadcrumb"><a href="#/">NusaStats</a> / Regions</p>
<h1>Regions</h1>
<p class="lede">Indonesia is 38 provinces across six island groups. Java holds 57% of GDP
on 7% of the land; the ten provinces below hold about 60% of the population.</p>

<div class="card">
  <h3>Share of GDP by island group, 2024</h3>
  ${barRows(ISLANDS, 60)}
  <p class="source">BPS, GDP by province, 2024.</p>
</div>

<h2>Ten largest provinces by population</h2>
<div class="controls">
  <input type="search" id="province-search" placeholder="Search provinces…" aria-label="Search provinces">
  <span class="seg" role="group" aria-label="Sort provinces">
    <button type="button" data-sort="rank" aria-pressed="true">By rank</button>
    <button type="button" data-sort="name" aria-pressed="false">By name</button>
    <button type="button" data-sort="island" aria-pressed="false">By island</button>
  </span>
</div>
<div class="table-scroll"><table id="province-table">
  <thead><tr><th>#</th><th>Province</th><th>Capital</th><th>Island</th>
  <th class="num">Population (m)</th></tr></thead>
  <tbody>${rows}</tbody></table></div>
<p class="small" id="province-count">Showing 10 of 10 provinces.</p>
<p class="source">BPS, mid-2024 population estimates.</p>

<div class="callout">The full 38-province table is not shown here: only the ten largest
provinces are published in this edition's ranking. Province figures are
mid-year estimates; the next full census is 2030.</div>`;
}

export function sources() {
  return `
<p class="breadcrumb"><a href="#/">NusaStats</a> / Sources</p>
<h1>Sources &amp; methods</h1>
<p class="lede">NusaStats republishes figures from the releases below. We do not estimate,
model or adjust anything: a number on this site is the number its source
published, rounded for display.</p>

<h2>Where each number comes from</h2>
<div class="table-scroll"><table>
  <thead><tr><th>Publisher</th><th>What we take from it</th></tr></thead>
  <tbody>
    <tr><td>Statistics Indonesia (BPS)</td><td>Population, GDP, inflation, unemployment, poverty, Gini, HDI, trade, provincial figures</td></tr>
    <tr><td>World Bank (WDI)</td><td>Population density, GDP in US dollars, age-structure checks</td></tr>
    <tr><td>Bank Indonesia</td><td>Inflation target band; monetary context</td></tr>
    <tr><td>Ministry of Finance</td><td>Government debt ratio</td></tr>
    <tr><td>BKPM (Investment Ministry)</td><td>Investment realisation</td></tr>
    <tr><td>APJII</td><td>Internet users and penetration, 2024 survey</td></tr>
    <tr><td>Ministry of Health (SSGI)</td><td>Stunting prevalence, 2024</td></tr>
  </tbody></table></div>

<h2>Definitions</h2>
<ul class="fact-list">
  <li><span>Real GDP growth</span><b>Change in GDP at constant 2010 prices</b></li>
  <li><span>Inflation (Dec y-on-y)</span><b>CPI in December vs the previous December</b></li>
  <li><span>Unemployment rate</span><b>Unemployed ÷ labour force, August Sakernas</b></li>
  <li><span>Poverty rate</span><b>People below the BPS poverty line, March Susenas</b></li>
  <li><span>Gini ratio</span><b>0 = perfect equality, 1 = total inequality</b></li>
  <li><span>HDI</span><b>Health, education and living-standard index, 0–100</b></li>
</ul>

<h2>About this site</h2>
<p>NusaStats is an independent site built for make.fun's “Make the best national
statistics site” bounty. It is not affiliated with Statistics Indonesia (BPS)
or any government body, and it copies no other site's design, text or images.
All charts are drawn in the browser from the data file; the site makes no
network requests and works offline from its own files.</p>
<p class="small">${esc(UPDATED)} Publisher list: ${SOURCES.map((s) => esc(s.short)).join(', ')}.</p>`;
}

export function missing() {
  return `
<p class="breadcrumb"><a href="#/">NusaStats</a> / Not found</p>
<h1>That page does not exist</h1>
<p>There is no statistics page at this address. Try one of the sections below.</p>
<ul class="pill-list">
  <li><a href="#/">Overview →</a></li>
  <li><a href="#/population">Population →</a></li>
  <li><a href="#/economy">Economy →</a></li>
  <li><a href="#/regions">Regions →</a></li>
</ul>`;
}
