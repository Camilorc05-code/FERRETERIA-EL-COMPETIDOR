/* ============ PROGRESS BAR ============ */
const progressEl = document.getElementById('progress');
function updateProgress(){
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progressEl.style.width = scrolled + '%';
}
document.addEventListener('scroll', updateProgress, {passive:true});

/* ============ TICKER ============ */
const tickerEl = document.getElementById('ticker');
if(tickerEl){
  (function buildTicker(){
    let html = '';
    for(let r=0;r<2;r++){ CATEGORIAS.forEach(c=>{ html += `<span class="ticker-item"><span class="ticker-dot"></span>${c}</span>`; }); }
    tickerEl.innerHTML = html;
  })();
}

/* ============ HEADER ============ */
const header = document.getElementById('site-header');
window.addEventListener('scroll', ()=>{ header.classList.toggle('scrolled', window.scrollY > 20); }, {passive:true});

/* ============ MENÚ MÓVIL ============ */
const burger = document.getElementById('burger');
const mp = document.getElementById('mp');
const scrim = document.getElementById('scrim');
function closeMenu(){burger.classList.remove('open');mp.classList.remove('open');scrim.classList.remove('open');}
burger.addEventListener('click', ()=>{ burger.classList.toggle('open');mp.classList.toggle('open');scrim.classList.toggle('open'); });
scrim.addEventListener('click', closeMenu);
mp.querySelectorAll('a').forEach(a=>a.addEventListener('click', closeMenu));

/* ============ ANIMACIONES AL HACER SCROLL ============ */
const revealEls = document.querySelectorAll('.reveal, .reveal-stagger, .reveal-scale');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{ if(entry.isIntersecting){entry.target.classList.add('in');io.unobserve(entry.target);} });
},{threshold:0.15});
revealEls.forEach(el=>io.observe(el));

/* ============ CONTADORES / GAUGES ============ */
const gauges = document.querySelectorAll('.gauge');
const gio = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const g = entry.target; g.classList.add('in');
      const target = parseInt(g.dataset.value,10); const suffix = g.dataset.suffix || '';
      const numEl = g.querySelector('.gauge-num');
      let start = null; const duration = 1500;
      function step(ts){
        if(!start) start = ts;
        const progress = Math.min((ts-start)/duration,1);
        numEl.textContent = Math.floor(progress*target) + (progress===1?suffix:'');
        if(progress<1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step); gio.unobserve(g);
    }
  });
},{threshold:0.4});
gauges.forEach(g=>gio.observe(g));

/* ============ FOCO DEL HERO ============ */
const hero = document.querySelector('.hero');
const spotlight = document.getElementById('spotlight');
if(hero && spotlight && window.matchMedia('(hover:hover)').matches){
  hero.addEventListener('mousemove', (e)=>{
    const r = hero.getBoundingClientRect();
    const mx = ((e.clientX - r.left)/r.width*100)+'%';
    const my = ((e.clientY - r.top)/r.height*100)+'%';
    spotlight.style.setProperty('--mx', mx);
    spotlight.style.setProperty('--my', my);
  });
}

/* ============ BOTONES MAGNÉTICOS ============ */
document.querySelectorAll('.magnetic').forEach(btn=>{
  btn.addEventListener('mousemove', (e)=>{
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width/2;
    const y = e.clientY - r.top - r.height/2;
    btn.style.transform = `translate(${x*0.18}px, ${y*0.35}px)`;
  });
  btn.addEventListener('mouseleave', ()=>{ btn.style.transform = ''; });
});

/* ============ TILT FOTO DEL HERO ============ */
const heroPhoto = document.querySelector('.hero-photo');
if(heroPhoto && window.matchMedia('(hover:hover)').matches){
  heroPhoto.addEventListener('mousemove', (e)=>{
    const r = heroPhoto.getBoundingClientRect();
    const x = (e.clientX - r.left)/r.width - 0.5;
    const y = (e.clientY - r.top)/r.height - 0.5;
    heroPhoto.style.transform = `rotateX(${-y*6}deg) rotateY(${x*6}deg)`;
  });
  heroPhoto.addEventListener('mouseleave', ()=>{ heroPhoto.style.transform = ''; });
}

/* ============ TILT TARJETAS ============ */
document.querySelectorAll('.tilt').forEach(card=>{
  card.addEventListener('mousemove', (e)=>{
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left)/r.width - 0.5;
    const y = (e.clientY - r.top)/r.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y*7}deg) rotateY(${x*7}deg)`;
  });
  card.addEventListener('mouseleave', ()=>{ card.style.transform = ''; });
});

