/* fundido al cambiar de página: se tapa con el overlay y se navega debajo */
(function(){
  const pt = document.getElementById('pageTrans');
  if(!pt) return;

  /* si ya estamos saliendo, no repetimos la navegación */
  function go(href){
    if(document.body.classList.contains('pt-out')) return;
    document.body.classList.add('pt-out');
    /* #inicio se queda sin fragmento: al recargar abrimos arriba y no en esa sección */
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
    /* el link "Inicio" dentro de la misma página */
    if(href === '#inicio'){
      a.addEventListener('click', (e)=>{
        if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button!==0) return;
        e.preventDefault();
        /* limpiamos el hash viejo: si se queda, al recargar el navegador salta otra vez */
        if(location.hash && location.hash !== '#inicio'){
          try{ history.replaceState(null, '', location.pathname + location.search); }catch(err){}
        }
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

/* cuando ya está todo cargado */
(function(){
  if('scrollRestoration' in history){ history.scrollRestoration = 'manual'; }
  /* --anchor-offset lleva el alto real del header para que las anclas caigan
     por debajo de él. styles.css lo consume en scroll-margin-top. */
  const docEl = document.documentElement;
  const cabecera = document.getElementById('site-header');
  const margenAncla = ()=>{
    const h = cabecera ? cabecera.offsetHeight : 0;
    docEl.style.setProperty('--anchor-offset', h + 'px');
    return h;
  };

  /* #inicio no aporta nada en la URL */
  if(location.hash === '#inicio'){
    try{ history.replaceState(null, '', location.pathname + location.search); }catch(e){}
  }

  let destino = null;
  if(location.hash && location.hash !== '#inicio'){
    try{ destino = document.querySelector(location.hash); }catch(e){ destino = null; }
  }

  /* el salto al ancla lo hacemos nosotros y de golpe: con scroll-behavior:smooth
     el navegador se queda arriba al recargar. Sin ancla, al tope. */
  const saltarA = y=>{
    const prev = docEl.style.scrollBehavior;
    docEl.style.scrollBehavior = 'auto';
    window.scrollTo(0, y);
    docEl.style.scrollBehavior = prev;
  };
  const posicionAncla = ()=>{
    const y = destino.getBoundingClientRect().top + window.scrollY - margenAncla();
    return Math.max(0, Math.min(y, docEl.scrollHeight - window.innerHeight));
  };

  if(destino){
    saltarA(posicionAncla());
    /* el header encoge al hacer scroll, así que después del salto hay que volver a
     medir: con el margen viejo asomaba la sección anterior sobre el destino.
     Solo mientras el visitante no haya movido la página */
    let intacto = true;
    const marcar = ()=>{ intacto = false; };
    window.addEventListener('wheel', marcar, {passive:true, once:true});
    window.addEventListener('touchstart', marcar, {passive:true, once:true});
    window.addEventListener('keydown', marcar, {once:true});
    window.addEventListener('pointerdown', marcar, {once:true});
    const corregir = ()=>{
      if(!intacto) return;
      const y2 = posicionAncla();
      if(Math.abs(y2 - window.scrollY) > 2) saltarA(y2);
    };
    requestAnimationFrame(corregir);
    setTimeout(corregir, 120);
    setTimeout(corregir, 360);
    window.addEventListener('load', ()=>{ setTimeout(corregir, 80); });
  } else {
    margenAncla();
    saltarA(0);
  }

  /* al redimensionar el header cambia de alto, hay que re-medir el margen */
  let margenRaf = null;
  window.addEventListener('resize', ()=>{
    if(margenRaf) return;
    margenRaf = requestAnimationFrame(()=>{ margenRaf = null; margenAncla(); });
  }, {passive:true});

  const pt = document.getElementById('pageTrans');
  if(!pt) return;
  document.body.classList.add('pt-load');
  requestAnimationFrame(()=>{
    requestAnimationFrame(()=> document.body.classList.add('pt-loaded'));
  });
})();

/* las partículas del banner, generadas por código */
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

/* el botón de volver arriba */
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

/* la cinta de datos bajo el banner */
const tickerEl = document.getElementById('ticker');
if(tickerEl){
  (function buildTicker(){
    let html = '';
    for(let r=0;r<2;r++){ CATEGORIAS.forEach(c=>{ html += `<span class="ticker-item"><span class="ticker-dot"></span>${c}</span>`; }); }
    tickerEl.innerHTML = html;
  })();
}

/* el header se encoge al pasar los primeros píxeles */
const header = document.getElementById('site-header');
if(header){
  let headerTicking = false;
  let headerOn = false;
  let headerOffsetT = null;
  function updateHeader(){
    const y = window.scrollY;
    /* entrar a 30px, salir a 5px: sin este margen el header parpadeaba al
       quedarse ahí */
    if(y > 30 && !headerOn){ headerOn = true; header.classList.add('scrolled'); }
    else if(y < 5 && headerOn){ headerOn = false; header.classList.remove('scrolled'); }
    else { headerTicking = false; return; }
    /* esperamos a que termine la transición antes de medir el alto nuevo */
    clearTimeout(headerOffsetT);
    headerOffsetT = setTimeout(()=>{
      document.documentElement.style.setProperty('--anchor-offset', header.offsetHeight + 'px');
    }, 340);
    headerTicking = false;
  }
  window.addEventListener('scroll', ()=>{ if(!headerTicking){ headerTicking = true; requestAnimationFrame(updateHeader); } }, {passive:true});
  updateHeader();
}

/* el menú lateral de móvil */
const burger = document.getElementById('burger');
const mp = document.getElementById('mp');
const scrim = document.getElementById('scrim');
function closeMenu(){burger.classList.remove('open');mp.classList.remove('open');scrim.classList.remove('open');burger.setAttribute('aria-expanded','false');}
burger.addEventListener('click', ()=>{
  const open = mp.classList.toggle('open');
  burger.classList.toggle('open', open);
  scrim.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open ? 'true' : 'false');
});
scrim.addEventListener('click', closeMenu);
mp.querySelectorAll('a').forEach(a=>a.addEventListener('click', closeMenu));

/* las apariciones al hacer scroll, por IntersectionObserver */
const revealEls = document.querySelectorAll('.reveal, .reveal-stagger, .reveal-scale');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{ if(entry.isIntersecting){entry.target.classList.add('in');io.unobserve(entry.target);} });
},{threshold:0.15});
revealEls.forEach(el=>io.observe(el));

/* los números que se cuentan solos */
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

/* el fondo del banner sigue al puntero */
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

/* el carrusel de categorías */
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


