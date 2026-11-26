// NusaStats router: hash routes, one page per section. Charts are drawn
// after each render, and the Regions page search + sort controls are wired
// here. window.__shotReady is false while a page renders and true once it
// is on screen, so a screenshot script knows when to capture.
//
//   #/                Overview
//   #/population      Population
//   #/economy         Economy
//   #/prices          Prices & inflation
//   #/employment      Jobs
//   #/welfare         Welfare & human development
//   #/regions         Regions (searchable province table)
//   #/sources         Sources & methods

import { SERIES, YEARS } from './data.js';
import { barChart, lineChart } from './charts.js';
import {
  economy,
  employment,
  missing,
  overview,
  population,
  prices,
  regions,
  sources,
  welfare,
} from './views.js';

const app = document.getElementById('app');
const navLinks = [...document.querySelectorAll('.site-nav a')];

const PAGES = {
  '/': overview,
  '/population': population,
  '/economy': economy,
  '/prices': prices,
  '/employment': employment,
  '/welfare': welfare,
  '/regions': regions,
  '/sources': sources,
};

const TITLES = {
  '/': 'NusaStats — Statistics of Indonesia',
  '/population': 'Population | NusaStats',
  '/economy': 'Economy | NusaStats',
  '/prices': 'Prices & inflation | NusaStats',
  '/employment': 'Jobs | NusaStats',
  '/welfare': 'Welfare & human development | NusaStats',
  '/regions': 'Regions | NusaStats',
  '/sources': 'Sources & methods | NusaStats',
};

const CHARTS = {
  growth: () =>
    lineChart(document.querySelector('[data-chart="growth"]'), YEARS, SERIES.gdpGrowthPct, {
      fmt: (v) => `${v.toFixed(2)}%`,
    }),
  inflation: () =>
    lineChart(document.querySelector('[data-chart="inflation"]'), YEARS, SERIES.inflationDecPct, {
      fmt: (v) => `${v.toFixed(2)}%`,
      color: '#d98a1f',
    }),
  population: () =>
    barChart(document.querySelector('[data-chart="population"]'), YEARS.map(String), SERIES.populationMillion, {
      fmt: (v) => v.toFixed(1),
    }),
  gdp: () =>
    barChart(document.querySelector('[data-chart="gdp"]'), YEARS.map(String), SERIES.gdpNominalRpTrillion, {
      fmt: (v) => v.toLocaleString('en-US'),
    }),
  unemployment: () =>
    lineChart(document.querySelector('[data-chart="unemployment"]'), YEARS, SERIES.unemploymentAugPct, {
      fmt: (v) => `${v.toFixed(2)}%`,
      color: '#b23a2e',
    }),
  poverty: () =>
    lineChart(document.querySelector('[data-chart="poverty"]'), YEARS, SERIES.povertyMarPct, {
      fmt: (v) => `${v.toFixed(2)}%`,
    }),
  hdi: () =>
    lineChart(document.querySelector('[data-chart="hdi"]'), YEARS, SERIES.hdi, {
      fmt: (v) => v.toFixed(2),
      color: '#2e7d4f',
    }),
};

function drawCharts() {
  for (const canvas of document.querySelectorAll('canvas[data-chart]')) {
    const draw = CHARTS[canvas.dataset.chart];
    if (draw) draw();
  }
  // The overview chart is switched by its toggle buttons.
  const overviewCanvas = document.getElementById('overview-chart');
  if (overviewCanvas) {
    const key = overviewCanvas.dataset.chart;
    const draw = CHARTS[key];
    if (draw) draw();
  }
}

function wireOverviewToggle() {
  const buttons = [...document.querySelectorAll('.controls .seg button[data-series]')];
  if (!buttons.length) return;
  const canvas = document.getElementById('overview-chart');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      canvas.dataset.chart = btn.dataset.series;
      drawCharts();
    });
  });
}

function wireProvinceTable() {
  const search = document.getElementById('province-search');
  const table = document.getElementById('province-table');
  const count = document.getElementById('province-count');
  if (!search || !table) return;
  const rows = [...table.querySelectorAll('tbody tr')];
  const original = rows.map((r) => r.outerHTML);

  function apply() {
    const q = search.value.trim().toLowerCase();
    let shown = 0;
    for (const row of rows) {
      const hit = !q || row.dataset.name.includes(q) || row.dataset.island.includes(q);
      row.style.display = hit ? '' : 'none';
      if (hit) shown += 1;
    }
    count.textContent = `Showing ${shown} of ${rows.length} provinces.`;
  }
  search.addEventListener('input', apply);

  const sortButtons = [...document.querySelectorAll('.controls .seg button[data-sort]')];
  sortButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      sortButtons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      const tbody = table.querySelector('tbody');
      const mode = btn.dataset.sort;
      if (mode === 'rank') {
        tbody.innerHTML = original.join('');
      } else if (mode === 'name') {
        tbody.innerHTML = [...rows]
          .sort((a, b) => a.dataset.name.localeCompare(b.dataset.name))
          .map((r) => r.outerHTML)
          .join('');
      } else if (mode === 'island') {
        tbody.innerHTML = [...rows]
          .sort(
            (a, b) =>
              a.dataset.island.localeCompare(b.dataset.island) ||
              Number(b.querySelectorAll('td')[4].textContent) -
                Number(a.querySelectorAll('td')[4].textContent),
          )
          .map((r) => r.outerHTML)
          .join('');
      }
      // Re-grab rows after re-sorting so search keeps working.
      const fresh = [...tbody.querySelectorAll('tr')];
      rows.splice(0, rows.length, ...fresh);
      apply();
    });
  });
}

function render() {
  window.__shotReady = false;
  const path = location.hash.replace(/^#/, '') || '/';
  const page = PAGES[path] || missing;
  document.title = TITLES[path] || 'Not found | NusaStats';
  app.innerHTML = page();
  navLinks.forEach((a) => {
    const href = a.getAttribute('href');
    a.classList.toggle('active', href === `#${path}`);
  });
  drawCharts();
  wireOverviewToggle();
  wireProvinceTable();
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

window.addEventListener('hashchange', render);
render();
