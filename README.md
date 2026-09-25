# Ferretería El Competidor

Sitio web oficial de **Ferretería El Competidor**, ferretería y distribución de materiales de construcción en Paz de Ariporo, Casanare (Colombia). Empresa familiar activa desde 1990.

## 🔧 Tecnologías

- **HTML5** / **CSS3** (diseño responsive, mobile-first)
- **JavaScript** (catálogo dinámico, filtros por categoría)
- **PWA manifest** (`manifest.webmanifest`) con soporte de favicons e íconos
- Sitio 100% estático: sin base de datos ni backend
- Desplegado en **Latinoamerica Hosting** (dominio propio)

## 📄 Páginas

| Página | Descripción |
|--------|-------------|
| `index.html` | Inicio con hero, categorías, proyectos destacados, testimonios, FAQ y contacto con mapa |
| `catalogo.html` | Catálogo interactivo con 19 categorías y filtrado dinámico |
| `nosotros.html` | Historia y valores del negocio |
| `proyectos.html` | Proyectos destacados de la empresa |
| `404.html` | Página personalizada de error |

## 📁 Estructura

```
├── index.html
├── catalogo.html
├── nosotros.html
├── proyectos.html
├── 404.html
├── css/          → estilos por página + theme + estilos globales
├── js/           → main.js, productos.js (datos), catalogo.js (lógica catálogo)
├── assets/
│   ├── img/      → imágenes, categorías, proyectos, logos de marcas (.webp) + og-image.png
│   └── icons/    → favicons e íconos
├── manifest.webmanifest
├── sitemap.xml
└── robots.txt
```

## 🧭 SEO

- Meta tags de title, description, Open Graph y Twitter por página
- Imagen social `assets/img/og-image.png` (1200×630) para WhatsApp, Facebook y X
- Datos estructurados **JSON-LD** (HardwareStore) con dirección, teléfono, horario, geolocalización y redes sociales
- `sitemap.xml` + `robots.txt`
- `rel="canonical"` en cada página

## 🚀 Despliegue

- **Hosting:** Latinoamerica Hosting
- **Dominio:** https://ferreteriaelcompetidorpza.com
- **Tipo:** estático — se suben los archivos a la raíz pública (`public_html` / `htdocs`)

El detalle paso a paso está en [`INSTRUCCIONES-PUBLICACION.txt`](INSTRUCCIONES-PUBLICACION.txt).
El sitio **debe quedar en la raíz del dominio**, nunca en una subcarpeta: las URL de
canonical, Open Graph, JSON-LD y sitemap ya apuntan a la raíz.

## ☎️ Contacto

- **WhatsApp / Teléfono:** +57 311 452 0820
- **Correo:** competidorpza@gmail.com
- **Dirección:** Carrera 10 # 7 - 21, Paz de Ariporo, Casanare
- **Horario:** Lun–Sáb 7:30 a.m. – 6:00 p.m. · Dom 8:00 a.m. – 12:00 m.
