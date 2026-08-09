// nodes.js
// Referencias a los contenedores del DOM de SofiMovies, seleccionadas
// exclusivamente por ID (según los ids agregados en index.html).
//
// IMPORTANTE: searchBar, searchToggle, searchClose, searchInput, mainNav
// y navToggle YA están declaradas como const en el <script> inline del
// HTML. Si este archivo las vuelve a declarar con const/let, el navegador
// lanza "Identifier ... has already been declared" y todo este script
// deja de ejecutarse desde esa línea. Por eso aquí NO se repiten esos 6 nombres.

// ===== HEADER =====
const siteHeader    = document.getElementById('siteHeader');
const logo          = document.getElementById('logo');

// searchBar, searchToggle, searchClose, searchInput -> ya declaradas en el inline script del HTML
// mainNav, navToggle -> ya declaradas en el inline script del HTML

const navHome    = document.getElementById('navHome');
const navMovies  = document.getElementById('navMovies');
const navSeries  = document.getElementById('navSeries');

const headerActions = document.getElementById('headerActions');

// ===== HERO (home) =====
const hero        = document.getElementById('hero');
const heroMedia    = document.getElementById('heroMedia');
const heroBadge    = document.getElementById('heroBadge');
const heroInfo     = document.getElementById('heroInfo');
const heroEyebrow  = document.getElementById('heroEyebrow');
const heroTitle    = document.getElementById('heroTitle');
const heroMeta     = document.getElementById('heroMeta');
const heroActions  = document.getElementById('heroActions');
const heroPlayBtn  = document.getElementById('heroPlayBtn');
const heroListBtn  = document.getElementById('heroListBtn');

// ===== TENDENCIAS (home) =====
const trendingPreview = document.getElementById('trendingPreview');
const trendingHead    = document.getElementById('trendingHead');
const trendingTitle   = document.getElementById('trendingTitle');
const trendingLink    = document.getElementById('trendingLink');
const trendingTrack   = document.getElementById('trendingTrack');

// ===== CATEGORÍAS (home) =====
const categories       = document.getElementById('categories');
const categoriesHead   = document.getElementById('categoriesHead');
const categoriesTitle  = document.getElementById('categoriesTitle');
const categoriesLink   = document.getElementById('categoriesLink');
const categoriesGrid   = document.getElementById('categoriesGrid');

// ===== SIMILARES (home) =====
const similarMovies = document.getElementById('similarMovies');
const similarHead   = document.getElementById('similarHead');
const similarTitle  = document.getElementById('similarTitle');
const similarLink   = document.getElementById('similarLink');
const similarTrack  = document.getElementById('similarTrack');

// ===== DETALLE DE PELICULA (#movie=ID) =====
const movieView         = document.getElementById('movieView');
const movieBackdrop     = document.getElementById('movieBackdrop');
const movieBackdropImg  = document.getElementById('movieBackdropImg');
const movieBackBtn      = document.getElementById('movieBackBtn');
const movieCard         = document.getElementById('movieCard');
const movieHead         = document.getElementById('movieHead');
const movieTitle        = document.getElementById('movieTitle');
const movieRating       = document.getElementById('movieRating');
const movieOverview     = document.getElementById('movieOverview');
const movieGenres       = document.getElementById('movieGenres');
const movieSimilarShelf = document.getElementById('movieSimilarShelf');
const movieSimilarTrack = document.getElementById('movieSimilarTrack');

// ===== CATEGORIA (#category=ID) =====
const categoryView  = document.getElementById('categoryView');
const categoryHead  = document.getElementById('categoryHead');
const categoryTitle = document.getElementById('categoryTitle');
const categoryGrid  = document.getElementById('categoryGrid');

// ===== FOOTER =====
const siteFooter = document.getElementById('siteFooter');
const footerText = document.getElementById('footerText');

// ===== TENDENCIAS COMPLETAS (#trends) =====
const trendsView  = document.getElementById('trendsView');
const trendsHead  = document.getElementById('trendsHead');
const trendsGrid  = document.getElementById('trendsGrid');

// ===== BUSQUEDA (#search=QUERY) =====
const searchView          = document.getElementById('searchView');
const searchHead          = document.getElementById('searchHead');
const searchResultsTitle  = document.getElementById('searchResultsTitle');
const searchGrid          = document.getElementById('searchGrid');