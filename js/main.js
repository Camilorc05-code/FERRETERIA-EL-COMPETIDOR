/* ============ VOLVER ARRIBA ============ */
const floatersEl = document.querySelector('.floaters');
if(floatersEl){
  const topBtn = document.createElement('a');
  topBtn.className = 'fab fab-top';
  topBtn.href = '#';
  topBtn.setAttribute('aria-label', 'Volver arriba');
  topBtn.innerHTML = '<svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19V5M5 12l7-7 7 7"/></svg>';
  floatersEl.appendChild(topBtn);
  topBtn.addEventListener('click', (e)=>{ e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'}); });
  const toggleTop = ()=> topBtn.classList.toggle('show', window.scrollY > 600);
  window.addEventListener('scroll', toggleTop, {passive:true});
  toggleTop();
}

/* ============ PARALLAX FOTO DEL HERO ============ */
const heroStack = document.querySelector('.hero-photo-stack');
if(heroStack && window.matchMedia('(hover:hover)').matches){
  let ticking = false;
  window.addEventListener('scroll', ()=>{
    if(!ticking){
      requestAnimationFrame(()=>{
        const y = window.scrollY;
        if(y < window.innerHeight) heroStack.style.transform = 'translateY(' + (y * 0.06) + 'px)';
        else heroStack.style.transform = '';
        ticking = false;
      });
      ticking = true;
    }
  }, {passive:true});
}

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

