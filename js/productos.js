const CATEGORIAS = [
  "Herramienta Eléctrica",
  "Herramientas Manuales",
  "Tubería y accesorios P.V.C",
  "Materiales de Construcción",
  "Pinturas",
  "Electricidad",
  "Seguridad Industrial",
  "Producto Hogar",
  "Abrasivos",
  "Producto Agro",
  "Plantas",
  "Producto Ornamentación",
  "Tornillería"
];

const PRODUCTOS = [
  /* ---------- HERRAMIENTA ELÉCTRICA ---------- */
  { categoria: "Herramienta Eléctrica", nombre: "Taladro percutor 1/2\" 650W", marca: "Black+Decker", referencia: "TD610", precio: 289900 },
  { categoria: "Herramienta Eléctrica", nombre: "Esmeril angular 4-1/2\" 850W", marca: "Bosch", referencia: "GWS 850", precio: 349900 },
  { categoria: "Herramienta Eléctrica", nombre: "Atornillador inalámbrico 12V", marca: "DeWalt", referencia: "DCF601", precio: 459900 },
  { categoria: "Herramienta Eléctrica", nombre: "Sierra circular 7-1/4\" 1200W", marca: "Makita", referencia: "5007MG", precio: 529900 },
  { categoria: "Herramienta Eléctrica", nombre: "Lijadora orbital 1/3 250W", marca: "Black+Decker", referencia: "BDEMS600", precio: 219900 },
  { categoria: "Herramienta Eléctrica", nombre: "Rotomartillo SDS 750W", marca: "Bosch", referencia: "GBH 2-20", precio: 499900 },
  { categoria: "Herramienta Eléctrica", nombre: "Pulidora 5\" 2400W", marca: "Stanley", referencia: "STGS6100", precio: 289900 },
  { categoria: "Herramienta Eléctrica", nombre: "Compresor de aire 24L 1.5HP", marca: "DeWalt", referencia: "DXCM024", precio: 1199900 },

  /* ---------- HERRAMIENTAS MANUALES ---------- */
  { categoria: "Herramientas Manuales", nombre: "Martillo de uña 16 oz", marca: "Stanley", referencia: "51-162", precio: 32900 },
  { categoria: "Herramientas Manuales", nombre: "Cinta métrica 5m", marca: "Stanley", referencia: "33-402", precio: 24900 },
  { categoria: "Herramientas Manuales", nombre: "Juego destornilladores 6 piezas", marca: "Stanley", referencia: "FMHT0-62616", precio: 39900 },
  { categoria: "Herramientas Manuales", nombre: "Llave ajustable 10\"", marca: "Stanley", referencia: "87-208", precio: 54900 },
  { categoria: "Herramientas Manuales", nombre: "Alicate universal 8\"", marca: "Stanley", referencia: "84-097", precio: 29900 },
  { categoria: "Herramientas Manuales", nombre: "Serrucho de carpintero 22\"", marca: "Stanley", referencia: "15-589", precio: 44900 },
  { categoria: "Herramientas Manuales", nombre: "Nivel torpedo 9\"", marca: "Stanley", referencia: "42-571", precio: 34900 },
  { categoria: "Herramientas Manuales", nombre: "Pala palustre de albañil 8\"", marca: "Tramontina", referencia: "SA-440-108", precio: 38900 },

  /* ---------- TUBERÍA Y P.V.C ---------- */
  { categoria: "Tubería y accesorios P.V.C", nombre: "Tubo P.V.C presión 1/2\" x 6m", marca: "Pavco", referencia: "TP 1/2 x6", precio: 18900 },
  { categoria: "Tubería y accesorios P.V.C", nombre: "Tubo P.V.C presión 1\" x 6m", marca: "Pavco", referencia: "TP 1 x6", precio: 42900 },
  { categoria: "Tubería y accesorios P.V.C", nombre: "Tubo P.V.C sanitaria 4\" x 6m", marca: "Pavco", referencia: "TS 4 x6", precio: 79900 },
  { categoria: "Tubería y accesorios P.V.C", nombre: "Codo P.V.C 1/2\" 90°", marca: "Pavco", referencia: "CP 1/2 90", precio: 1900 },
  { categoria: "Tubería y accesorios P.V.C", nombre: "Tee P.V.C 1/2\"", marca: "Pavco", referencia: "TP 1/2 T", precio: 2400 },
  { categoria: "Tubería y accesorios P.V.C", nombre: "Unión universal P.V.C 1/2\"", marca: "Pavco", referencia: "UP 1/2", precio: 3200 },
  { categoria: "Tubería y accesorios P.V.C", nombre: "Adhesivo P.V.C 1/4 de galón", marca: "Pegatex", referencia: "AD-250", precio: 18500 },
  { categoria: "Tubería y accesorios P.V.C", nombre: "Sifón para lavamanos P.V.C", marca: "Pavco", referencia: "SF-L", precio: 8900 },

  /* ---------- MATERIALES DE CONSTRUCCIÓN ---------- */
  { categoria: "Materiales de Construcción", nombre: "Cemento gris x 50 kg", marca: "Argos", referencia: "CG-50", precio: 38500 },
  { categoria: "Materiales de Construcción", nombre: "Cal estructural x 30 kg", marca: "Ricaurte", referencia: "CE-30", precio: 21000 },
  { categoria: "Materiales de Construcción", nombre: "Pegacor para piso x 20 kg", marca: "Pegatex", referencia: "PC-20", precio: 26000 },
  { categoria: "Materiales de Construcción", nombre: "Estuco blanco x 25 kg", marca: "Proquimetal", referencia: "EB-25", precio: 33000 },
  { categoria: "Materiales de Construcción", nombre: "Ladrillo hueco bloque #5", marca: "Arcillas de Casanare", referencia: "LB-5", precio: 2900 },
  { categoria: "Materiales de Construcción", nombre: "Malla electrosoldada 6x6 3.42mm", marca: "Diagonal", referencia: "MES-66", precio: 145000 },
  { categoria: "Materiales de Construcción", nombre: "Impermeabilizante líquido 1 gal", marca: "Sika", referencia: "SIK-1G", precio: 98000 },
  { categoria: "Materiales de Construcción", nombre: "Aditivo plastificante 1 gal", marca: "Sika", referencia: "SIP-1", precio: 54000 },

  /* ---------- PINTURAS ---------- */
  { categoria: "Pinturas", nombre: "Pintura vinilo blanco 1 galón", marca: "Pintuco", referencia: "VB-1", precio: 129900 },
  { categoria: "Pinturas", nombre: "Pintura vinilo color 1 galón", marca: "Pintuco", referencia: "VC-1", precio: 139900 },
  { categoria: "Pinturas", nombre: "Esmalte blanco 1 galón", marca: "Pintuco", referencia: "EB-1", precio: 168000 },
  { categoria: "Pinturas", nombre: "Pintura anticorrosiva 1 galón", marca: "Pintuco", referencia: "AC-1", precio: 145000 },
  { categoria: "Pinturas", nombre: "Thinner x 1 galón", marca: "Pintuco", referencia: "TH-1", precio: 28000 },
  { categoria: "Pinturas", nombre: "Brocha plana 3\"", marca: "Trinidad", referencia: "BR-3", precio: 12900 },
  { categoria: "Pinturas", nombre: "Rodillo lana 9\" con mango", marca: "Trinidad", referencia: "RD-9", precio: 15900 },
  { categoria: "Pinturas", nombre: "Sellador tapaporos 1 galón", marca: "Pintuco", referencia: "SP-1", precio: 89000 },

  /* ---------- ELECTRICIDAD ---------- */
  { categoria: "Electricidad", nombre: "Cable THW #12 rollo 100 m", marca: "Centelsa", referencia: "THW-12", precio: 189000 },
  { categoria: "Electricidad", nombre: "Cable THW #14 rollo 100 m", marca: "Centelsa", referencia: "THW-14", precio: 145000 },
  { categoria: "Electricidad", nombre: "Tomacorriente doble polarizado", marca: "Bticino", referencia: "TC-2P", precio: 12900 },
  { categoria: "Electricidad", nombre: "Interruptor sencillo", marca: "Bticino", referencia: "IN-1P", precio: 10900 },
  { categoria: "Electricidad", nombre: "Breaker 2x20A", marca: "Schneider", referencia: "BR-220", precio: 28900 },
  { categoria: "Electricidad", nombre: "Tubo conduit 1/2\" x 3 m", marca: "Pavco", referencia: "TC-1/2", precio: 7900 },
  { categoria: "Electricidad", nombre: "Cinta aislante 3M", marca: "3M", referencia: "CTA-19", precio: 4900 },
  { categoria: "Electricidad", nombre: "Bombillo LED 9W", marca: "Philips", referencia: "LED-9", precio: 6900 },

  /* ---------- SEGURIDAD INDUSTRIAL ---------- */
  { categoria: "Seguridad Industrial", nombre: "Casco con visera", marca: "3M", referencia: "H-700", precio: 49900 },
  { categoria: "Seguridad Industrial", nombre: "Gafas de seguridad", marca: "3M", referencia: "GAF-1711", precio: 9900 },
  { categoria: "Seguridad Industrial", nombre: "Guantes de carnaza", marca: "Industrial", referencia: "GC-2", precio: 12000 },
  { categoria: "Seguridad Industrial", nombre: "Botas de seguridad punta acero", marca: "Bruma", referencia: "BT-440", precio: 189000 },
  { categoria: "Seguridad Industrial", nombre: "Arnés de seguridad 2 puntos", marca: "Protector", referencia: "AR-2P", precio: 145000 },
  { categoria: "Seguridad Industrial", nombre: "Tapa oídos tipo copa", marca: "3M", referencia: "TO-1425", precio: 24500 },
  { categoria: "Seguridad Industrial", nombre: "Respirador N95", marca: "3M", referencia: "RS-8210", precio: 4800 },
  { categoria: "Seguridad Industrial", nombre: "Cono de seguridad 60 cm", marca: "Seg", referencia: "CN-60", precio: 35000 },

  /* ---------- PRODUCTO HOGAR ---------- */
  { categoria: "Producto Hogar", nombre: "Balde plástico 5 L", marca: "Plastic", referencia: "BL-5", precio: 8900 },
  { categoria: "Producto Hogar", nombre: "Escoba industrial", marca: "Salvaje", referencia: "ES-IND", precio: 10900 },
  { categoria: "Producto Hogar", nombre: "Recogedor plástico", marca: "Salvaje", referencia: "RG-1", precio: 7900 },
  { categoria: "Producto Hogar", nombre: "Trapeador de hilo", marca: "Salvaje", referencia: "TR-1", precio: 13900 },
  { categoria: "Producto Hogar", nombre: "Candado 40 mm", marca: "Tranca", referencia: "CD-40", precio: 24900 },
  { categoria: "Producto Hogar", nombre: "Manija de puerta", marca: "Hoppe", referencia: "MJ-P", precio: 45900 },
  { categoria: "Producto Hogar", nombre: "Bisagra 3\" x 3\"", marca: "Tranca", referencia: "BG-3", precio: 6500 },
  { categoria: "Producto Hogar", nombre: "Extensión eléctrica 5 m", marca: "Nogal", referencia: "EX-5", precio: 32000 },

  /* ---------- ABRASIVOS ---------- */
  { categoria: "Abrasivos", nombre: "Disco de corte 4-1/2\"", marca: "Norton", referencia: "DC-115", precio: 6500 },
  { categoria: "Abrasivos", nombre: "Disco de desbaste 4-1/2\"", marca: "Norton", referencia: "DD-115", precio: 7800 },
  { categoria: "Abrasivos", nombre: "Disco flap 4-1/2\"", marca: "Norton", referencia: "DF-115", precio: 12900 },
  { categoria: "Abrasivos", nombre: "Lija #80", marca: "Norton", referencia: "LJ-80", precio: 1500 },
  { categoria: "Abrasivos", nombre: "Lija #120", marca: "Norton", referencia: "LJ-120", precio: 1500 },
  { categoria: "Abrasivos", nombre: "Lija #220", marca: "Norton", referencia: "LJ-220", precio: 1500 },
  { categoria: "Abrasivos", nombre: "Disco de corte 9\"", marca: "Norton", referencia: "DC-230", precio: 18900 },
  { categoria: "Abrasivos", nombre: "Rueda de alambre 4\"", marca: "Norton", referencia: "RA-4", precio: 16900 },

  /* ---------- PRODUCTO AGRO ---------- */
  { categoria: "Producto Agro", nombre: "Manguera riego 1/2\" x 50 m", marca: "Mangueritas", referencia: "MG-50", precio: 89000 },
  { categoria: "Producto Agro", nombre: "Bomba de agua 1 HP", marca: "Pedrollo", referencia: "BM-1HP", precio: 899000 },
  { categoria: "Producto Agro", nombre: "Pala ancha", marca: "Tramontina", referencia: "PA-1", precio: 59900 },
  { categoria: "Producto Agro", nombre: "Pica de peón", marca: "Tramontina", referencia: "PC-1", precio: 64900 },
  { categoria: "Producto Agro", nombre: "Machete 22\"", marca: "Imusa", referencia: "MT-22", precio: 42000 },
  { categoria: "Producto Agro", nombre: "Bomba fumigadora 20 L", marca: "Guarany", referencia: "BF-20", precio: 189000 },
  { categoria: "Producto Agro", nombre: "Alambre de púas rollo 300 m", marca: "Diaco", referencia: "AP-300", precio: 245000 },
  { categoria: "Producto Agro", nombre: "Grapa para alambre (libra)", marca: "Diaco", referencia: "GP-1", precio: 7800 },

  /* ---------- PLANTAS ---------- */
  { categoria: "Plantas", nombre: "Abono orgánico 5 kg", marca: "Biofertil", referencia: "AB-5", precio: 18500 },
  { categoria: "Plantas", nombre: "Fertilizante líquido 1 L", marca: "Agroinsumos", referencia: "FL-1", precio: 24000 },
  { categoria: "Plantas", nombre: "Maceta cerámica 30 cm", marca: "Artemisa", referencia: "MC-30", precio: 38900 },
  { categoria: "Plantas", nombre: "Tierra abonada 20 kg", marca: "Biofertil", referencia: "TA-20", precio: 15900 },
  { categoria: "Plantas", nombre: "Regadera 3 L", marca: "Garden", referencia: "RG-3", precio: 19900 },
  { categoria: "Plantas", nombre: "Tijera podadora", marca: "Tramontina", referencia: "TJ-PD", precio: 47900 },
  { categoria: "Plantas", nombre: "Pala jardinera de mano", marca: "Garden", referencia: "PJ-M", precio: 14500 },
  { categoria: "Plantas", nombre: "Semillas de pasto x 1 kg", marca: "Seminorte", referencia: "SP-1", precio: 28900 },

  /* ---------- PRODUCTO ORNAMENTACIÓN ---------- */
  { categoria: "Producto Ornamentación", nombre: "Cinta pintar 1\"", marca: "3M", referencia: "CP-201", precio: 6900 },
  { categoria: "Producto Ornamentación", nombre: "Masilla para muros x 25 kg", marca: "Proquimetal", referencia: "MS-25", precio: 35000 },
  { categoria: "Producto Ornamentación", nombre: "Espuma de poliuretano", marca: "Great Stuff", referencia: "ES-PU", precio: 42000 },
  { categoria: "Producto Ornamentación", nombre: "Azulejo 20x20 cm", marca: "Corona", referencia: "AZ-2020", precio: 3800 },
  { categoria: "Producto Ornamentación", nombre: "Sanitario blanco", marca: "Corona", referencia: "ST-1", precio: 289000 },
  { categoria: "Producto Ornamentación", nombre: "Grifo lavamanos", marca: "Fanalca", referencia: "GF-L", precio: 84900 },
  { categoria: "Producto Ornamentación", nombre: "Guardaescoba por metro", marca: "Corona", referencia: "GE-M", precio: 14500 },
  { categoria: "Producto Ornamentación", nombre: "Sellador de silicona", marca: "Sika", referencia: "SS-280", precio: 15900 },

  /* ---------- TORNILLERÍA ---------- */
  { categoria: "Tornillería", nombre: "Tornillo puntilla 1\" (libra)", marca: "Rondón", referencia: "TP-1", precio: 9800 },
  { categoria: "Tornillería", nombre: "Tornillo para madera 2\" (libra)", marca: "Rondón", referencia: "TM-2", precio: 12500 },
  { categoria: "Tornillería", nombre: "Tornillo para drywall 1\" (caja)", marca: "Rondón", referencia: "TD-1", precio: 28000 },
  { categoria: "Tornillería", nombre: "Taco expansión 1/4\"", marca: "Rondón", referencia: "TE-14", precio: 900 },
  { categoria: "Tornillería", nombre: "Tuerca hexagonal 3/8\"", marca: "Rondón", referencia: "TH-38", precio: 400 },
  { categoria: "Tornillería", nombre: "Arandela plana 3/8\"", marca: "Rondón", referencia: "AP-38", precio: 350 },
  { categoria: "Tornillería", nombre: "Perno hexagonal 3/8\" x 2\"", marca: "Rondón", referencia: "PH-38", precio: 1600 },
  { categoria: "Tornillería", nombre: "Ancla química 300 ml", marca: "Sika", referencia: "AQ-300", precio: 38900 }
];
