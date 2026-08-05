/* ==========================================================
   CATÁLOGO DE PRODUCTOS — catálogo.html
   ========================================================== */
(function(){
  'use strict';

  const WHATSAPP = '573201234567';

  const inputBuscar = document.getElementById('buscar');
  const btnLimpiar = document.getElementById('btn-limpiar');
  const selectCategoria = document.getElementById('filtro-categoria');
  const selectPrecio = document.getElementById('filtro-precio');
  const selectSort = document.getElementById('filtro-sort');
  const chipsWrap = document.getElementById('chips');
  const suggestBox = document.getElementById('suggest');
  const gridProductos = document.getElementById('product-grid');
  const infoResultados = document.getElementById('resultados-info');
  const btnReset = document.getElementById('btn-reset');

  const RANGOS_PRECIO = {
    '0-50000':      { min: 0,       max: 50000 },
    '50000-200000': { min: 50000,   max: 200000 },
    '200000-mas':   { min: 200000,  max: Infinity }
  };

  let query = '';
  let categoria = '';
  let rango = null;
  let sort = 'relevancia';
  let targetIndex = null;

  const acentos = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const norm = s => acentos(s.toLowerCase().trim());

  function formatearPrecio(p){
    return '$' + p.toLocaleString('es-CO');
  }

  function whatsappUrl(p){
    const msg = encodeURIComponent(
      'Hola Ferretería El Competidor, me interesa este producto:\n' +
      p.nombre + '\nMarca: ' + p.marca + '\nReferencia: ' + p.referencia +
      '\n¿Está disponible?'
    );
    return 'https://wa.me/' + WHATSAPP + '?text=' + msg;
  }

  document.getElementById('hero-total').textContent = PRODUCTOS.length;
  document.getElementById('hero-categorias').textContent = CATEGORIAS.length;

  CATEGORIAS.forEach(c=>{
    const op = document.createElement('option');
    op.value = c;
    op.textContent = c;
    selectCategoria.appendChild(op);
  });

  const contar = cat => PRODUCTOS.filter(p=>p.categoria === cat).length;
  const chipsHtml = CATEGORIAS.map((c,i)=>(
    '<button type="button" class="chip' + (c===categoria?' active':'') + '" data-cat="' + c + '">' +
      '<span>' + c + '</span>' +
      '<span class="chip-count">' + contar(c) + '</span>' +
    '</button>'
  )).join('');
  chipsWrap.innerHTML = chipsHtml;

  function setCategoria(cat){
    categoria = cat;
    selectCategoria.value = cat;
    chipsWrap.querySelectorAll('.chip').forEach(chip=>{
      chip.classList.toggle('active', chip.dataset.cat === cat);
    });
  }

  chipsWrap.addEventListener('click', e=>{
    const chip = e.target.closest('.chip');
    if(!chip) return;
    setCategoria(chip.dataset.cat === categoria ? '' : chip.dataset.cat);
    targetIndex = null;
    render(true);
  });

  function filtrar(){
    const q = norm(query);
    let lista = PRODUCTOS.filter(p=>{
      if(categoria && p.categoria !== categoria) return false;
      if(rango && (p.precio < rango.min || p.precio >= rango.max)) return false;
      if(q){
        const hay = norm(p.nombre + ' ' + p.marca + ' ' + p.referencia + ' ' + p.categoria);
        if(!hay.includes(q)) return false;
      }
      return true;
    });

    if(sort === 'nombre-az') lista = lista.slice().sort((a,b)=>a.nombre.localeCompare(b.nombre,'es'));
    if(sort === 'nombre-za') lista = lista.slice().sort((a,b)=>b.nombre.localeCompare(a.nombre,'es'));
    if(sort === 'precio-menor') lista = lista.slice().sort((a,b)=>a.precio-b.precio);
    if(sort === 'precio-mayor') lista = lista.slice().sort((a,b)=>b.precio-a.precio);

    return lista;
  }

  function render(desplazar){
    const lista = filtrar();
    const hayFiltros = !!(query || categoria || rango || sort !== 'relevancia');

    infoResultados.textContent = hayFiltros
      ? 'Mostrando ' + lista.length + ' de ' + PRODUCTOS.length + ' productos'
      : 'Mostrando los ' + PRODUCTOS.length + ' productos del catálogo';
    btnReset.hidden = !hayFiltros;
    btnLimpiar.classList.toggle('show', !!query);

    if(lista.length === 0){
      gridProductos.innerHTML = '' +
        '<div class="sin-resultados">' +
          '<svg fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="M21 21l-4.3-4.3M8 11h6"/></svg>' +
          '<b>Sin resultados</b>' +
          '<p>No encontramos productos que coincidan con tu búsqueda. Prueba con otra palabra o limpia los filtros.</p>' +
          '<button type="button" class="btn btn-outline" id="btn-vacio">Limpiar filtros</button>' +
        '</div>';
      const btnVacio = document.getElementById('btn-vacio');
      if(btnVacio) btnVacio.addEventListener('click', limpiarFiltros);
      return;
    }

    gridProductos.innerHTML = lista.map((p,i)=>{
      const id = PRODUCTOS.indexOf(p);
      const wa = whatsappUrl(p);
      return (
        '<article class="product-card" data-index="' + id + '">' +
          '<span class="product-tag">' + p.categoria + '</span>' +
          '<div class="product-body">' +
            '<h4>' + p.nombre + '</h4>' +
            '<div class="product-meta">' +
              '<span>' + p.marca + '</span>' +
              '<span class="product-ref mono">REF. ' + p.referencia + '</span>' +
            '</div>' +
            '<div class="product-price">' + formatearPrecio(p.precio) + '</div>' +
          '</div>' +
          '<a class="product-cta" href="' + wa + '" target="_blank" rel="noopener">' +
            '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l5.07-1.33A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.2 14.14c-.22.62-1.28 1.18-1.77 1.24-.45.06-1.01.08-1.63-.1-.37-.11-.85-.27-1.46-.53-2.57-1.11-4.25-3.7-4.38-3.87-.13-.17-1.05-1.39-1.05-2.66 0-1.26.66-1.88.9-2.14.22-.24.5-.3.66-.3.16 0 .33 0 .47.01.15.01.35-.06.55.42.22.53.74 1.83.8 1.96.06.13.1.29.02.46-.08.17-.13.28-.25.43-.13.15-.27.34-.38.46-.13.13-.26.28-.11.55.15.27.66 1.09 1.42 1.76.98.87 1.8 1.14 2.07 1.27.27.13.43.11.59-.07.16-.18.68-.79.86-1.06.18-.27.35-.22.6-.13.24.09 1.55.73 1.82.86.27.13.45.2.51.31.07.11.07.63-.15 1.25z"/></svg>' +
            'Pedir por WhatsApp' +
          '</a>' +
        '</article>'
      );
    }).join('');

    if(!desplazar) return;

    /* ===== LANZAR AL PRODUCTO: scroll + resaltado ===== */
    let pick = null;
    if(targetIndex !== null){
      pick = gridProductos.querySelector('[data-index="' + targetIndex + '"]');
    } else if(query){
      pick = gridProductos.querySelector('.product-card');
    }
    if(!pick) return;
    const offset = (document.getElementById('filterBar') ? document.getElementById('filterBar').offsetHeight : 0) + 16;
    const top = pick.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({top: top, behavior:'smooth'});
    pick.classList.add('resaltado');
    setTimeout(()=>pick.classList.remove('resaltado'), 2800);
  }

  /* ============ SUGERENCIAS AL BUSCAR ============ */
  function mostrarSugerencias(){
    const q = norm(query);
    if(q.length === 0){
      suggestBox.hidden = true;
      return;
    }
    const matches = [];
    for(let i=0;i<PRODUCTOS.length && matches.length<8;i++){
      const p = PRODUCTOS[i];
      const hay = norm(p.nombre + ' ' + p.marca + ' ' + p.referencia);
      if(hay.includes(q)) matches.push({p:p, i:i});
    }
    if(matches.length === 0){
      suggestBox.innerHTML = '<div class="suggest-empty">Sin coincidencias directas</div>';
      suggestBox.hidden = false;
      return;
    }
    suggestBox.innerHTML = matches.map(m=>(
      '<button type="button" class="suggest-item" data-index="' + m.i + '">' +
        '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>' +
        '<span class="sug-name">' + m.p.nombre + '</span>' +
        '<span class="sug-ref">REF. ' + m.p.referencia + '</span>' +
      '</button>'
    )).join('');
    suggestBox.hidden = false;
  }

  suggestBox.addEventListener('click', e=>{
    const item = e.target.closest('.suggest-item');
    if(!item) return;
    const idx = parseInt(item.dataset.index,10);
    const p = PRODUCTOS[idx];
    query = p.nombre;
    targetIndex = idx;
    inputBuscar.value = p.nombre;
    suggestBox.hidden = true;
    render(true);
  });

  document.addEventListener('click', e=>{
    if(!e.target.closest('.search-field')) suggestBox.hidden = true;
  });

  /* ============ EVENTOS ============ */
  let debounceTimer = null;
  inputBuscar.addEventListener('input', ()=>{
    query = inputBuscar.value;
    targetIndex = null;
    mostrarSugerencias();
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(()=>render(true), 260);
  });

  inputBuscar.addEventListener('keydown', e=>{
    if(e.key === 'Enter'){
      e.preventDefault();
      suggestBox.hidden = true;
      render(true);
    }
    if(e.key === 'Escape'){
      suggestBox.hidden = true;
      inputBuscar.blur();
    }
  });

  btnLimpiar.addEventListener('click', ()=>{
    query = '';
    targetIndex = null;
    inputBuscar.value = '';
    suggestBox.hidden = true;
    render(false);
    inputBuscar.focus();
  });

  selectCategoria.addEventListener('change', ()=>{
    setCategoria(selectCategoria.value);
    targetIndex = null;
    render(false);
  });

  selectPrecio.addEventListener('change', ()=>{
    rango = RANGOS_PRECIO[selectPrecio.value] || null;
    targetIndex = null;
    render(false);
  });

  selectSort.addEventListener('change', ()=>{
    sort = selectSort.value;
    render(false);
  });

  btnReset.addEventListener('click', limpiarFiltros);

  function limpiarFiltros(){
    query = '';
    categoria = '';
    rango = null;
    sort = 'relevancia';
    targetIndex = null;
    inputBuscar.value = '';
    selectCategoria.value = '';
    selectPrecio.value = '';
    selectSort.value = 'relevancia';
    setCategoria('');
    suggestBox.hidden = true;
    render(false);
  }

  /* ============ PARÁMETRO ?categoria= ============ */
  const params = new URLSearchParams(window.location.search);
  const catParam = params.get('categoria');
  if(catParam && CATEGORIAS.includes(catParam)){
    setCategoria(catParam);
  }

  render(false);
})();
