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
(function buildTicker(){
  let html = '';
  for(let r=0;r<2;r++){ CATEGORIAS.forEach(c=>{ html += `<span class="ticker-item"><span class="ticker-dot"></span>${c}</span>`; }); }
  tickerEl.innerHTML = html;
})();

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
if(window.matchMedia('(hover:hover)').matches){
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

/* ==========================================================
   CATÁLOGO DE PRODUCTOS
   ========================================================== */
const WHATSAPP = '573201234567';

const inputBuscar = document.getElementById('buscar');
const selectCategoria = document.getElementById('filtro-categoria');
const selectPrecio = document.getElementById('filtro-precio');
const btnBuscar = document.getElementById('btn-buscar');
const gridProductos = document.getElementById('product-grid');
const infoResultados = document.getElementById('resultados-info');

const RANGOS_PRECIO = {
  '0-50000':      { min: 0,       max: 50000 },
  '50000-200000': { min: 50000,   max: 200000 },
  '200000-mas':   { min: 200000,  max: Infinity }
};

function formatearPrecio(p){
  return '$' + p.toLocaleString('es-CO');
}

function whatsappUrl(producto){
  const msg = encodeURIComponent(
    `Hola Ferretería El Competidor, me interesa este producto:\n${producto.nombre}\nMarca: ${producto.marca}\nReferencia: ${producto.referencia}\n¿Está disponible?`
  );
  return `https://wa.me/${WHATSAPP}?text=${msg}`;
}

function renderProductos(){
  const texto = inputBuscar.value.trim().toLowerCase();
  const cat = selectCategoria.value;
  const rango = RANGOS_PRECIO[selectPrecio.value] || null;

  const filtrados = PRODUCTOS.filter(p=>{
    if(cat && p.categoria !== cat) return false;
    if(rango && (p.precio < rango.min || p.precio >= rango.max)) return false;
    if(texto){
      const hay = (p.nombre + ' ' + p.marca + ' ' + p.referencia + ' ' + p.categoria).toLowerCase();
      if(!hay.includes(texto)) return false;
    }
    return true;
  });

  infoResultados.textContent = filtrados.length === PRODUCTOS.length
    ? `Mostrando los ${PRODUCTOS.length} productos del catálogo`
    : `Mostrando ${filtrados.length} de ${PRODUCTOS.length} productos`;

  if(filtrados.length === 0){
    gridProductos.innerHTML = `
      <div class="sin-resultados">
        <svg fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="M21 21l-4.3-4.3M8 11h6"/></svg>
        <b>Sin resultados</b>
        <p>No encontramos productos que coincidan con tu búsqueda. Prueba con otra palabra o limpia los filtros.</p>
        <button type="button" class="btn btn-outline" onclick="limpiarFiltros()">Limpiar filtros</button>
      </div>`;
    return;
  }

  gridProductos.innerHTML = filtrados.map(p=>`
    <article class="product-card">
      <span class="product-tag">${p.categoria}</span>
      <div class="product-body">
        <h4>${p.nombre}</h4>
        <div class="product-meta">
          <span>${p.marca}</span>
          <span class="product-ref mono">REF. ${p.referencia}</span>
        </div>
        <div class="product-price">${formatearPrecio(p.precio)}</div>
      </div>
      <a class="product-cta" href="${whatsappUrl(p)}" target="_blank" rel="noopener">
        <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l5.07-1.33A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.2 14.14c-.22.62-1.28 1.18-1.77 1.24-.45.06-1.01.08-1.63-.1-.37-.11-.85-.27-1.46-.53-2.57-1.11-4.25-3.7-4.38-3.87-.13-.17-1.05-1.39-1.05-2.66 0-1.26.66-1.88.9-2.14.22-.24.5-.3.66-.3.16 0 .33 0 .47.01.15.01.35-.06.55.42.22.53.74 1.83.8 1.96.06.13.1.29.02.46-.08.17-.13.28-.25.43-.13.15-.27.34-.38.46-.13.13-.26.28-.11.55.15.27.66 1.09 1.42 1.76.98.87 1.8 1.14 2.07 1.27.27.13.43.11.59-.07.16-.18.68-.79.86-1.06.18-.27.35-.22.6-.13.24.09 1.55.73 1.82.86.27.13.45.2.51.31.07.11.07.63-.15 1.25z"/></svg>
        Pedir por WhatsApp
      </a>
    </article>
  `).join('');
}

function limpiarFiltros(){
  inputBuscar.value = '';
  selectCategoria.value = '';
  selectPrecio.value = '';
  renderProductos();
}

/* Llenar el selector de categorías */
CATEGORIAS.forEach(c=>{
  const op = document.createElement('option');
  op.value = c;
  op.textContent = c;
  selectCategoria.appendChild(op);
});

/* Filtro al hacer clic en una tarjeta de categoría */
function filtrarPorCategoria(card){
  const c = card.dataset.categoria;
  selectCategoria.value = c;
  inputBuscar.value = '';
  selectPrecio.value = '';
  renderProductos();
  document.getElementById('catalogo').scrollIntoView({behavior:'smooth'});
  card.classList.add('cat-active');
  document.querySelectorAll('.cat-card[data-categoria]').forEach(o=>{ if(o!==card) o.classList.remove('cat-active'); });
}
document.querySelectorAll('.cat-card[data-categoria]').forEach(card=>{
  card.setAttribute('tabindex','0');
  card.setAttribute('role','button');
  card.addEventListener('click', ()=>filtrarPorCategoria(card));
  card.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); filtrarPorCategoria(card); }
  });
});

/* Eventos del buscador */
inputBuscar.addEventListener('input', renderProductos);
selectCategoria.addEventListener('change', renderProductos);
selectPrecio.addEventListener('change', renderProductos);
btnBuscar.addEventListener('click', (e)=>{ e.preventDefault(); renderProductos(); });

renderProductos();
