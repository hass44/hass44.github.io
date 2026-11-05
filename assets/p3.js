'use strict';
// Content lives in data.js (CASES, DEX); this file only renders it in the P3 layout.
const work = [
  {id: 'surgical', name: 'Surgical video retrieval', dex: 4},
  {id: 'ailitho', name: 'aiLITHO at KLA', dex: 0},
  {id: 'cdsem', name: 'Wafer defect detection', dex: 1},
  {id: 'thesis', name: 'Diffusion vs AR for code', dex: 3},
];
const groups = {
  work: {items: work},
  research: {items: DEX.map((d, i) => ({id: String(i), name: d[0], dex: i}))},
  about: {items: [{id: 'profile', name: 'Profile & contact'}, {id: 'experience', name: 'Experience'}, {id: 'education', name: 'Education'}]},
  interests: {items: [{id: 'games', name: 'Games'}, {id: 'jazz', name: 'Jazz'}, {id: 'anime', name: 'Anime'}]},
};
const researchCase = {0: 'ailitho', 1: 'cdsem', 3: 'thesis', 4: 'surgical'};
const detail = document.getElementById('detail');
const esc = v => String(v).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const tags = ts => '<div class="tags">' + ts.map(t => `<span class="tag">${esc(t)}</span>`).join('') + '</div>';
const stats = ss => '<div class="metrics">' + ss.map(([l, v]) => `<div><span class="metric-label">${esc(l)}</span><span class="metric-value">${esc(v)}</span></div>`).join('') + '</div>';
const stack = text => '<div class="stack">' + text.split(' · ').map(t => `<span>${esc(t)}</span>`).join('') + '</div>';
const heading = (label, title) => `<div class="index">${esc(label)}</div><h2 id="entryTitle">${esc(title)}</h2>`;
let state;

function route() {
  const parts = location.hash.slice(1).split('/');
  const section = groups[parts[0]] ? parts[0] : 'work';
  const items = groups[section].items;
  const index = Math.max(0, items.findIndex(i => i.id === parts[1]));
  const item = items[index];
  const caseKey = section === 'work' ? item.id : section === 'research' ? researchCase[item.dex] : null;
  return {section, items, index, item, caseKey, study: parts[2] === 'study' && !!caseKey};
}
const path = (id, study) => `#${state.section}/${id}${study ? '/study' : ''}`;

function render() {
  state = route();
  const {section, items, index, item, caseKey, study} = state;
  document.title = `${item.name} — Hassaan Ibrahim`;
  document.querySelectorAll('[data-section]').forEach(a => a.dataset.section === section ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'));
  document.getElementById('entries').innerHTML = items.map((e, i) =>
    `<a href="${path(e.id)}" ${i === index ? 'aria-current="true"' : ''}><small>${String(i + 1).padStart(2, '0')}</small><span>${esc(e.name)}</span></a>`).join('');

  if (section === 'work' || section === 'research') {
    const d = DEX[item.dex], c = caseKey ? CASES[caseKey] : null;
    let out = heading(`${String(item.dex + 1).padStart(2, '0')} / ${d[1][0]}`, section === 'work' ? c.title : d[0]) + tags(d[1]);
    if (study) {
      out += `<p>${esc(c.lead)}</p>` + c.sections.map(([h, list]) => `<h3>${esc(h)}</h3><ul>${list.map(t => `<li>${t}</li>`).join('')}</ul>`).join('');
    } else {
      out += `<p>${esc(d[2])}</p>` + stats(d[3]);
      if (item.dex === 3) out += '<p class="metric-note">Given edit locations and fix lengths. Without given lengths, the autoregressive model led by 11 points.</p>';
    }
    out += '<h3>Technologies</h3>' + stack(c ? c.tech : d[4]);
    const link = c?.link || (d[5] ? ['View project', d[5]] : null);
    out += '<div class="actions">' + (c ? (study ? `<a href="${path(item.id)}">← Summary</a>` : `<a href="${path(item.id, true)}">Read case study</a>`) : '')
      + (link ? `<a href="${link[1]}">${esc(link[0])} ↗</a>` : '') + '</div>';
    detail.innerHTML = out;
  } else if (section === 'about') {
    renderAbout(item.id);
  } else {
    renderInterests(item.id);
  }
  document.getElementById('pageCount').textContent = `${String(index + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
  document.getElementById('previous').disabled = index === 0;
  document.getElementById('next').disabled = index === items.length - 1;
}

function renderAbout(id) {
  const contact = '<div class="actions"><a href="Muhammad_Hassaan_Ibrahim_CV.pdf">CV (PDF) ↓</a><a href="mailto:muhammadhassaanibrahim@gmail.com">Email</a><a href="https://www.linkedin.com/in/hassaanibrahim">LinkedIn ↗</a><a href="https://github.com/hass44">GitHub ↗</a></div>';
  if (id === 'profile') detail.innerHTML = heading('Profile', 'Hassaan Ibrahim') + tags(['Machine learning', 'Dresden'])
    + '<p>I work on LLM systems and computer vision at KLA, alongside my M.Sc. in Computational Modelling and Simulation at TU Dresden. Before that I did surgical video research at NCT Dresden and energy price forecasting at NAECO Blue.</p>'
    + stats([['Available from', 'December 2026'], ['Location', 'Dresden, willing to relocate']])
    + '<h3>Technologies</h3>' + stack('Python · PyTorch · LangGraph · FAISS · Docker · MLflow') + contact;
  if (id === 'experience') detail.innerHTML = heading('Experience', 'Industry & research') + '<div class="timeline">'
    + '<div><h3>KLA</h3><small>08/2025 – present · Working student, AI</small><p>Tools, document ingestion and evaluation for aiLITHO, a multi-agent LLM platform for chip engineers. A convolutional-autoencoder defect detector in production with Micron Technology (15+ releases).</p></div>'
    + '<div><h3>NCT Dresden</h3><small>04/2025 – 03/2026 · Intern, machine learning</small><p>Surgical frame retrieval at 98% top-1, and a from-scratch reproduction of narration-supervised video pretraining.</p></div>'
    + '<div><h3>NAECO Blue</h3><small>06/2023 – 07/2024 · Working student, data scientist</small><p>Day-ahead energy price forecasting for the German market, from data collection to customer dashboards.</p></div>'
    + '</div><div class="actions"><a href="Muhammad_Hassaan_Ibrahim_CV.pdf">Full CV ↓</a></div>';
  if (id === 'education') detail.innerHTML = heading('Education', 'Dresden & Islamabad') + '<div class="timeline">'
    + '<div><h3>TU Dresden</h3><small>10/2024 – 11/2026 (expected)</small><p>M.Sc. Computational Modelling and Simulation. Thesis: a matched-compute comparison of autoregressive and masked-diffusion code generation.</p><a href="#work/thesis/study">Read the thesis summary</a></div>'
    + '<div><h3>PIEAS, Islamabad</h3><small>2020 – 2024</small><p>B.Sc. Computer Science. Deep learning research for medical imaging. Led a 22-person Google Developer Student Club team and grew it from 280 to 620 members.</p></div></div>';
}

function renderInterests(id) {
  const content = {
    games: ['Games', ['JRPGs', 'Game Boy Advance'], 'Persona above all, plus Pokémon and other JRPGs. This site is styled after the Persona 3 Reload pause menu.', 'Persona · Pokémon · JRPGs'],
    jazz: ['Jazz', ['Music'], 'Jazz, mostly late at night.', 'Jazz · Instrumental'],
    anime: ['Anime', ['One Piece', 'Dragon Ball Z'], 'Anime, especially One Piece and Dragon Ball Z.', 'One Piece · Dragon Ball Z'],
  };
  const [title, types, text, items] = content[id];
  detail.innerHTML = heading('Interests', title) + tags(types) + `<p>${esc(text)}</p>` + stack(items);
}

function move(delta) { const next = state.items[state.index + delta]; if (next) location.hash = path(next.id); }
document.getElementById('previous').onclick = () => move(-1);
document.getElementById('next').onclick = () => move(1);
document.getElementById('entries').addEventListener('keydown', e => {
  const links = [...document.querySelectorAll('#entries a')];
  const i = links.indexOf(document.activeElement);
  if (i < 0) return;
  const next = {ArrowDown: Math.min(links.length - 1, i + 1), ArrowUp: Math.max(0, i - 1), Home: 0, End: links.length - 1}[e.key];
  if (next === undefined) return;
  e.preventDefault();
  links[next].focus();
});
window.addEventListener('hashchange', () => {
  const fromEntries = document.activeElement?.closest?.('#entries');
  render();
  if (fromEntries) document.querySelector('#entries [aria-current="true"]')?.focus();
});
render();
