/* transición entre páginas (fade) */
(function(){
  const pt = document.getElementById('pageTrans');
  if(!pt) return;

  /* al salir, cubrimos con el overlay y volvemos a cargar */
  function go(href){
    if(document.body.classList.contains('pt-out')) return;
    document.body.classList.add('pt-out');
    /* #inicio es el tope de la página: navegar sin fragmento para que abra arriba */
    if(href.endsWith('#inicio')) href = href.replace(/#inicio$/, '');
    setTimeout(()=>{ location.href = href; }, 200);
  }

  function isInternal(href){
    try{
      const u = new URL(href, location.href);
      if(u.origin !== location.origin) return false;
      if(u.pathname === location.pathname) return false;
      return /\.html?$/.test(u.pathname);
    }catch(e){ return false; }
  }

  document.querySelectorAll('a[href]').forEach(a=>{
    const href = a.getAttribute('href') || '';
    /* "Inicio" en la misma página: subir hasta el tope absoluto */
    if(href === '#inicio'){
      a.addEventListener('click', (e)=>{
        if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button!==0) return;
        e.preventDefault();
        window.scrollTo({top:0, behavior:'smooth'});
      });
      return;
    }
    if(href.startsWith('#')) return;
    if(!isInternal(href)) return;
    a.addEventListener('click', (e)=>{
      if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button!==0) return;
      e.preventDefault();
      go(href);
    });
  });
})();

/* entrada de la página */
(function(){
  if('scrollRestoration' in history){ history.scrollRestoration = 'manual'; }
  /* Si venimos con #inicio (top de página), quítalo para abrir desde arriba */
  if(location.hash === '#inicio'){
    try{ history.replaceState(null, '', location.pathname + location.search); }catch(e){}
  }
  /* posicionar al tope de forma instantánea: evita el scroll suave que se percibe como zoom
     al abrir la página o al retroceder en el móvil */
  const docEl = document.documentElement;
  const prev = docEl.style.scrollBehavior;
  docEl.style.scrollBehavior = 'auto';
  window.scrollTo(0, 0);
  docEl.style.scrollBehavior = prev;
  const pt = document.getElementById('pageTrans');
  if(!pt) return;
  document.body.classList.add('pt-load');
  requestAnimationFrame(()=>{
    requestAnimationFrame(()=> document.body.classList.add('pt-loaded'));
  });
})();

/* partículas del banner principal */
const hp = document.getElementById('heroParticles');
if(hp){
  const COUNT = 22;
  for(let i=0;i<COUNT;i++){
    const s = document.createElement('span');
    s.className = 'pp' + (i%4===0 ? ' glow' : '');
    const size = 2 + Math.random()*4;
    s.style.width = size+'px';
    s.style.height = size+'px';
    s.style.left = (Math.random()*100)+'%';
    s.style.bottom = (-5 - Math.random()*18)+'%';
    s.style.setProperty('--sway', ((Math.random()*80)-40)+'px');
    s.style.animationDuration = (9 + Math.random()*12)+'s';
    s.style.animationDelay = (-Math.random()*14)+'s';
    hp.appendChild(s);
  }
}

/* botón volver arriba */
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

/* barra de progreso al leer */
const progressEl = document.getElementById('progress');
function updateProgress(){
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progressEl.style.width = scrolled + '%';
}
document.addEventListener('scroll', updateProgress, {passive:true});

/* cinta informativa */
const tickerEl = document.getElementById('ticker');
if(tickerEl){
  (function buildTicker(){
    let html = '';
    for(let r=0;r<2;r++){ CATEGORIAS.forEach(c=>{ html += `<span class="ticker-item"><span class="ticker-dot"></span>${c}</span>`; }); }
    tickerEl.innerHTML = html;
  })();
}

/* cabecera */
const header = document.getElementById('site-header');
if(header){
  let headerTicking = false;
  let headerOn = false;
  function updateHeader(){
    const y = window.scrollY;
    /* Histéresis con banda muerta: añadir a >30, quitar solo por debajo de 5.
       Evita el feedback-loop (el header se encoge/crece y re-triggereaba el toggle) que causaba el parpadeo/vibración en la zona límite. */
    if(y > 30 && !headerOn){ headerOn = true; header.classList.add('scrolled'); }
    else if(y < 5 && headerOn){ headerOn = false; header.classList.remove('scrolled'); }
    headerTicking = false;
  }
  window.addEventListener('scroll', ()=>{ if(!headerTicking){ headerTicking = true; requestAnimationFrame(updateHeader); } }, {passive:true});
  updateHeader();
}

/* menú en móvil */
const burger = document.getElementById('burger');
const mp = document.getElementById('mp');
const scrim = document.getElementById('scrim');
function closeMenu(){burger.classList.remove('open');mp.classList.remove('open');scrim.classList.remove('open');}
burger.addEventListener('click', ()=>{ burger.classList.toggle('open');mp.classList.toggle('open');scrim.classList.toggle('open'); });
scrim.addEventListener('click', closeMenu);
mp.querySelectorAll('a').forEach(a=>a.addEventListener('click', closeMenu));

/* animaciones al hacer scroll */
const revealEls = document.querySelectorAll('.reveal, .reveal-stagger, .reveal-scale');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{ if(entry.isIntersecting){entry.target.classList.add('in');io.unobserve(entry.target);} });
},{threshold:0.15});
revealEls.forEach(el=>io.observe(el));

/* contadores de las métricas */
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

/* el banner se mueve con el mouse */
const hero = document.querySelector('.hero');
if(hero && window.matchMedia('(hover:hover)').matches){
  const mesh = hero.querySelector('.mesh');
  const particles = document.getElementById('heroParticles');
  let raf = 0;
  hero.addEventListener('mousemove', (e)=>{
    if(raf) return;
    raf = requestAnimationFrame(()=>{
      const cx = (e.clientX / window.innerWidth) - 0.5;
      const cy = (e.clientY / window.innerHeight) - 0.5;
      if(mesh)  mesh.style.setProperty('--mlx', (cx * -26)+'px');
      if(mesh)  mesh.style.setProperty('--mly', (cy * -20)+'px');
      if(particles) particles.style.setProperty('--plx', (cx * 22)+'px');
      if(particles) particles.style.setProperty('--ply', (cy * 16)+'px');
      raf = 0;
    });
  });
}

/* botones */

/* carrusel de categorías */
(function(){
  const track = document.getElementById('cat-track');
  if(!track || typeof CATEGORIAS === 'undefined') return;

  const IMG = {
    'HERRAMIENTAS ELÉCTRICAS':'assets/img/carousel/rotomartillo.webp',
    'HERRAMIENTAS MANUALES':'assets/img/carousel/llaves-y-pinzas.webp',
    'MOTORES':'assets/img/carousel/moto-bombas.webp',
    'ABRASIVOS':'assets/img/carousel/abrasivos.webp',
    'PRODUCTOS ORNAMENTACIÓN':'assets/img/carousel/equipo-de-soldar.webp',
    'MATERIALES PARA CONSTRUCCIÓN':'assets/img/carousel/impermeabilizantes-y-acelerantes.webp',
    'HIERRO':'assets/img/carousel/hierro.webp',
    'TUBERÍA Y ACCESORIOS DE P.V.C':'assets/img/carousel/tuberia-pvc.webp',
    'BAÑOS Y COCINAS':'assets/img/carousel/sanitarios-y-lavamanos.webp',
    'TANQUES':'assets/img/carousel/tanques.webp',
    'PLÁSTICOS Y MALLAS':'assets/img/carousel/plasticos.webp',
    'ELÉCTRICO':'assets/img/carousel/lamparas-y-bombillas.webp',
    'AGRO':'assets/img/carousel/cerca-electrica.webp',
    'PINTURA':'assets/img/carousel/pintuco.webp',
    'MANGUERAS':'assets/img/carousel/mangueras.webp',
    'SEGURIDAD INDUSTRIAL':'assets/img/carousel/seguridad-1.webp',
    'PRODUCTOS DEL HOGAR':'assets/img/carousel/productos-1.webp',
    'QUÍMICOS':'assets/img/carousel/destapacanerias.webp',
    'TORNILLERÍA':'assets/img/carousel/tornilleria.webp'
  };
  const FALLBACK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  const count = {};
  if(typeof PRODUCTOS !== 'undefined'){ PRODUCTOS.forEach(p=>{ count[p.categoria] = (count[p.categoria]||0)+1; }); }

  CATEGORIAS.forEach(c=>{
    const slide = document.createElement('a');
    slide.className = 'cat-slide';
    slide.href = 'catalogo.html?categoria='+encodeURIComponent(c);
    slide.setAttribute('data-cat', c);
    slide.innerHTML = '<img src="'+(IMG[c]||FALLBACK)+'" alt="'+c+'" loading="lazy">'
      + '<div class="cat-slide-info">'
      +   '<h4>'+c+'</h4>'
      +   '<div class="cat-slide-count">'+(count[c]||0)+' productos</div>'
      +   '<div class="cat-slide-more">Ver catálogo <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="width:13px;height:13px"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg></div>'
      + '</div>';
    track.appendChild(slide);
  });

  const slides = track.children;
  const dotsEl = document.getElementById('cat-dots');
  const prev = document.getElementById('cat-prev');
  const next = document.getElementById('cat-next');

  slides.length && CATEGORIAS.forEach((_,i)=>{
    const d = document.createElement('button');
    d.setAttribute('aria-label','Ir a '+(i+1));
    d.addEventListener('click', ()=>{ go(i); pause(); });
    dotsEl.appendChild(d);
  });
  const dots = dotsEl.children;

  let index = 0, timer = null;
  const slideStep = ()=>{
    const first = slides[0];
    if(!first) return 276;
    const w = first.getBoundingClientRect().width;
    const cs = getComputedStyle(first);
    return w + parseFloat(cs.marginRight || 0);
  };
  function visible(){
    const stage = track.parentElement;
    const step = slideStep();
    return Math.max(1, Math.floor((stage.clientWidth + 12) / step));
  }
  function go(i){
    index = Math.max(0, Math.min(i, slides.length - visible()));
    track.style.transform = 'translateX(' + (-index * slideStep()) + 'px)';
    Array.from(dots).forEach((d,k)=> d.classList.toggle('active', k===index));
  }
  function play(){ timer = setInterval(()=>{ go(index + 1); if(index >= slides.length - visible()) go(0); }, 3200); }
  function pause(){ clearInterval(timer); }
  function resume(){ pause(); play(); }

  prev.addEventListener('click', ()=>{ go(index - 1); pause(); resume(); });
  next.addEventListener('click', ()=>{ go(index + 1); pause(); resume(); });
  track.addEventListener('mouseenter', pause);
  track.addEventListener('mouseleave', resume);
  window.addEventListener('resize', ()=> go(index));

  dotsEl.addEventListener('click', (e)=>{ if(e.target.tagName==='BUTTON'){ resume(); } });

  /* arrastre con el dedo */
  const stage = track.parentElement;
  let startX = 0, curX = 0, dragging = false;
  stage.addEventListener('touchstart', e=>{ dragging = true; startX = e.touches[0].clientX; pause(); }, {passive:true});
  stage.addEventListener('touchmove', e=>{ if(!dragging) return; curX = e.touches[0].clientX; }, {passive:true});
  stage.addEventListener('touchend', ()=>{
    if(!dragging) return;
    dragging = false;
    const diff = curX - startX;
    if(Math.abs(diff) > 35){
      if(diff < 0) go(index + 1);
      else go(index - 1);
    }
    curX = 0; startX = 0;
    resume();
  });
  stage.addEventListener('touchcancel', ()=>{ dragging = false; resume(); });

  go(0); resume();
})();


