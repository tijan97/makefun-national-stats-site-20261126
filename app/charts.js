// Small dependency-free canvas charts for NusaStats. Everything is drawn
// with the 2D canvas API, so the pages work fully offline.

function setup(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  return { ctx, w, h };
}

const TEAL = '#0c4a4a';
const AMBER = '#d98a1f';
const GRID = '#e3dcc8';
const INK = '#43565d';

function axes(ctx, w, h, pad) {
  ctx.strokeStyle = GRID;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad.l, pad.t);
  ctx.lineTo(pad.l, h - pad.b);
  ctx.lineTo(w - pad.r, h - pad.b);
  ctx.stroke();
}

// A line chart: years along the bottom, values up the side.
export function lineChart(canvas, years, values, opts) {
  const { ctx, w, h } = setup(canvas);
  const pad = { l: 56, r: 16, t: 14, b: 30 };
  const min = Math.min(0, ...values) * 1.05;
  const max = Math.max(...values) * 1.05;
  const span = max - min || 1;
  const x = (i) => pad.l + ((w - pad.l - pad.r) * i) / (years.length - 1);
  const y = (v) => pad.t + (h - pad.t - pad.b) * (1 - (v - min) / span);

  axes(ctx, w, h, pad);
  ctx.fillStyle = INK;
  ctx.font = '12px system-ui, sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  for (let i = 0; i <= 4; i++) {
    const v = min + (span * i) / 4;
    const yy = y(v);
    ctx.strokeStyle = GRID;
    ctx.beginPath();
    ctx.moveTo(pad.l, yy);
    ctx.lineTo(w - pad.r, yy);
    ctx.stroke();
    ctx.fillText(opts.fmt(v), pad.l - 8, yy);
  }
  // Zero line, when the series crosses it.
  if (min < 0 && max > 0) {
    ctx.strokeStyle = '#b23a2e';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(pad.l, y(0));
    ctx.lineTo(w - pad.r, y(0));
    ctx.stroke();
    ctx.setLineDash([]);
  }
  // The line itself.
  ctx.strokeStyle = opts.color || TEAL;
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  values.forEach((v, i) => (i === 0 ? ctx.moveTo(x(i), y(v)) : ctx.lineTo(x(i), y(v))));
  ctx.stroke();
  // Points and value labels. Each label gets a paper-coloured backing so it
  // stays readable, and the first/last labels sit inside the plot instead
  // of colliding with the axis ticks.
  ctx.font = 'bold 12px system-ui, sans-serif';
  values.forEach((v, i) => {
    ctx.fillStyle = opts.color || TEAL;
    ctx.beginPath();
    ctx.arc(x(i), y(v), 4, 0, Math.PI * 2);
    ctx.fill();
    const text = opts.fmt(v);
    const tw = ctx.measureText(text).width;
    let tx = x(i);
    let align = 'center';
    if (i === 0) {
      tx = x(i) + 8;
      align = 'left';
    } else if (i === values.length - 1) {
      tx = x(i) - 8;
      align = 'right';
    }
    const lx = align === 'left' ? tx : align === 'right' ? tx - tw : tx - tw / 2;
    ctx.fillStyle = '#fffdf7';
    ctx.fillRect(lx - 3, y(v) - 22, tw + 6, 16);
    ctx.fillStyle = '#17252b';
    ctx.textAlign = align;
    ctx.textBaseline = 'bottom';
    ctx.fillText(text, tx, y(v) - 8);
  });
  // Year labels.
  ctx.fillStyle = INK;
  ctx.font = '12px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  years.forEach((yr, i) => ctx.fillText(String(yr), x(i), h - pad.b + 8));
}

// A vertical bar chart.
export function barChart(canvas, labels, values, opts) {
  const { ctx, w, h } = setup(canvas);
  const pad = { l: 56, r: 16, t: 14, b: 30 };
  const max = Math.max(...values) * 1.1;
  const slot = (w - pad.l - pad.r) / labels.length;
  const bw = Math.min(56, slot * 0.62);
  const y = (v) => pad.t + (h - pad.t - pad.b) * (1 - v / max);

  axes(ctx, w, h, pad);
  ctx.fillStyle = INK;
  ctx.font = '12px system-ui, sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  for (let i = 0; i <= 4; i++) {
    const v = (max * i) / 4;
    ctx.strokeStyle = GRID;
    ctx.beginPath();
    ctx.moveTo(pad.l, y(v));
    ctx.lineTo(w - pad.r, y(v));
    ctx.stroke();
    ctx.fillText(opts.fmt(v), pad.l - 8, y(v));
  }
  labels.forEach((label, i) => {
    const cx = pad.l + slot * i + slot / 2;
    ctx.fillStyle = opts.color || TEAL;
    const top = y(values[i]);
    ctx.fillRect(cx - bw / 2, top, bw, h - pad.b - top);
    ctx.fillStyle = '#17252b';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(opts.fmt(values[i]), cx, top - 5);
    ctx.fillStyle = INK;
    ctx.font = '12px system-ui, sans-serif';
    ctx.textBaseline = 'top';
    ctx.fillText(label, cx, h - pad.b + 8);
  });
}
