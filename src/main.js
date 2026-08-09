const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'aplication/json;charset=utf-8'
    },
    params: {
        'api_key' : API_KEY_URL
    }
});


async function getTrendingMoviesPreviw() {
    const {data} = await api('/trending/movie/day');

    const movies = data.results.slice(0,6);

    trendingTrack.innerHTML = '';

    movies.forEach(movie => {
        const movieContainer = document.createElement('article');
        movieContainer.classList.add('poster-card');
        movieContainer.setAttribute('id', movie.id)
        movieContainer.addEventListener('click', () => {
            location.hash = `#movie=${movie.id}-${movie.title}`;
        });

        const movieImg = document.createElement('img') ;
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);

        const voteMovie = document.createElement('span');
        voteMovie.classList.add('poster-card__rank');
        voteMovie.innerHTML = movie.vote_count ;

        //Info
        const movieInfo = document.createElement('div');
        movieInfo.classList.add('poster-card__body')

        const movieTitle = document.createElement('p');
        const movieClas = document.createElement('p');

        movieTitle.textContent = movie.title;
        movieClas.textContent = movie.media_type;

        movieInfo.append(movieTitle)
        movieInfo.append(movieClas)



        movieContainer.append(movieImg)
        movieContainer.append(voteMovie)
        movieContainer.append(movieInfo)

        trendingTrack.append(movieContainer)
        
    });


}

//Generos

let allGenders = [];
let showingAll = false;

categoriesLink.addEventListener('click', () => {
    showingAll = !showingAll;
})
categoriesLink.textContent = showingAll ? 'Ver menos' : 'Ver todo';


async function ensureGenders() {
    if (allGenders.length === 0) {
        const { data } = await api.get('/genre/movie/list', {
            params: { language: 'es' }
        });
        allGenders = data.genres;
    }
}

async function getMoviesGenders() {
    await ensureGenders();

    renderCategories(allGenders.slice(0, 6));
    categoriesLink.addEventListener('click', (e) => {
        renderCategories(showingAll ? allGenders : allGenders.slice(0, 6));
        categoriesLink.textContent = showingAll ? 'Ver menos' : 'Ver todo';
    });
}

function renderCategories(list) {
    categoriesGrid.innerHTML = ''; // limpia antes de volver a pintar

    const iconMap = {
        'Acción': '🎬', 'Aventura': '🗺️', 'Animación': '🎨', 'Comedia': '😂', 'Crimen': '🕵️', 'Documental': '🎥', 'Drama': '🎭', 'Familia': '👨‍👩‍👧', 'Fantasía': '🧙', 'Historia': '📜', 'Terror': '👻', 'Música': '🎵', 'Misterio': '🔍', 'Romance': '💘', 'Ciencia ficción': '🚀', 'Película de TV': '📺', 'Suspense': '⚡', 'Bélica': '⚔️', 'Western': '🤠'
    };

    list.forEach(gender => {
        const catChip = document.createElement('button');
        catChip.classList.add('category-chip');
        catChip.setAttribute('id', gender.id)
        //minuscula y sin tilde
        const genderName = gender.name
                            .normalize('NFD')
                            .replace(/[\u0300-\u036f]/g, '')
                            .toLowerCase();
        catChip.addEventListener('click', () => {
            location.hash = `#category=${gender.id}-${genderName}`;
        });

        const chipIcon = document.createElement('span');
        chipIcon.classList.add('category-chip__icon');
        chipIcon.textContent = iconMap[gender.name] || '🎞️';

        const chipLabel = document.createTextNode(gender.name);

        catChip.append(chipIcon, chipLabel);
        categoriesGrid.append(catChip);
    });
}

async function getSimilarMoviesPreview() {
    const { data } = await api.get('/discover/movie', {
        params: { language: 'es', sort_by: 'popularity.desc' }
    });

    const movies = data.results.slice(0, 6); // solo las primeras 6
    similarTrack.innerHTML = ''; // limpia antes de pintar, evita duplicados
    movies.forEach(movie => {
        const movieContainer = document.createElement('article');
        movieContainer.classList.add('poster-card', 'poster-card--sm');
        movieContainer.setAttribute('id', movie.id);
        movieContainer.addEventListener('click', () => {
            location.hash = `#movie=${movie.id}-${movie.title}`;
        });

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);

        const movieInfo = document.createElement('div');
        movieInfo.classList.add('poster-card__body');

        const movieTitle = document.createElement('p');
        movieTitle.classList.add('poster-card__title');
        movieTitle.textContent = movie.title;

        const movieSub = document.createElement('p');
        movieSub.classList.add('poster-card__sub');
        const genreName = allGenders.find(g => g.id === movie.genre_ids[0])?.name || 'Película';
        movieSub.textContent = `${genreName} · ${movie.vote_average.toFixed(1)}`;

        movieInfo.append(movieTitle);
        movieInfo.append(movieSub);

        movieContainer.append(movieImg);
        movieContainer.append(movieInfo);

        similarTrack.append(movieContainer);
    });
}


async function getHeroMovie() {
    const { data } = await api.get('/movie/popular', {
        params: { language: 'es' }
    });

    const movie = data.results[0];

    heroMedia.style.backgroundImage =
        `linear-gradient(160deg, rgba(10,10,12,0.15), rgba(10,10,12,0.9)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;
    heroMedia.style.backgroundSize = 'cover';
    heroMedia.style.backgroundPosition = 'center';

    heroTitle.textContent = movie.title;

    const year = movie.release_date ? movie.release_date.slice(0, 4) : '';
    const genreName = allGenders.find(g => g.id === movie.genre_ids[0])?.name || '';
    heroMeta.textContent = `${year} · ${genreName} · ⭐ ${movie.vote_average.toFixed(1)}`;
}

// ===== DETALLE DE PELICULA (#movie=ID) =====

async function getMovieDetail(movieId) {
    await ensureGenders();

    const { data: movie } = await api.get(`/movie/${movieId}`, {
        params: { language: 'es' }
    });

    movieBackdropImg.setAttribute('src', 'https://image.tmdb.org/t/p/original' + movie.backdrop_path);
    movieBackdropImg.setAttribute('alt', movie.title);
    movieBackdropImg.style.width = '100%';
    movieBackdropImg.style.display = 'block';

    movieTitle.textContent = movie.title;
    movieRating.textContent = `★ ${movie.vote_average.toFixed(1)}`;
    movieOverview.textContent = movie.overview;

    movieGenres.innerHTML = '';
    const dotColors = ['#f5c542', '#8bc34a', '#f56565', '#4fc3f7', '#b565f5'];

    movie.genres.forEach((genre, index) => {
        const genreTag = document.createElement('button');
        genreTag.type = 'button';
        genreTag.classList.add('genre-tag');
        genreTag.addEventListener('click', () => {
            location.hash = `#category=${genre.id}-${genre.title}`;
        });

        const dot = document.createElement('span');
        dot.classList.add('genre-tag__dot');
        dot.style.backgroundColor = dotColors[index % dotColors.length];

        const label = document.createElement('span');
        label.textContent = genre.name;

        genreTag.append(dot, label);
        movieGenres.append(genreTag);
    });

    getMovieSimilar(movieId);
}

async function getMovieSimilar(movieId) {
    const { data } = await api.get(`/movie/${movieId}/similar`, {
        params: { language: 'es' }
    });

    const movies = data.results.slice(0, 6);
    movieSimilarTrack.innerHTML = '';

    movies.forEach(movie => {
        const movieContainer = document.createElement('article');
        movieContainer.classList.add('poster-card', 'poster-card--sm');
        movieContainer.setAttribute('id', movie.id);
        movieContainer.addEventListener('click', () => {
            location.hash = `#movie=${movie.id}-${movie.title}`;
        });

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);

        const movieInfo = document.createElement('div');
        movieInfo.classList.add('poster-card__body');

        const title = document.createElement('p');
        title.classList.add('poster-card__title');
        title.textContent = movie.title;

        const sub = document.createElement('p');
        sub.classList.add('poster-card__sub');
        const genreName = allGenders.find(g => g.id === movie.genre_ids[0])?.name || 'Película';
        sub.textContent = `${genreName} · ${movie.vote_average.toFixed(1)}`;

        movieInfo.append(title, sub);
        movieContainer.append(movieImg, movieInfo);

        movieSimilarTrack.append(movieContainer);
    });
}

// ===== CATEGORIA (#category=ID) =====

async function getCategoryMovies(categoryId) {
    await ensureGenders();

    const categoryName = allGenders.find(g => g.id === Number(categoryId))?.name || 'Categoría';
    categoryTitle.textContent = categoryName;

    const { data } = await api.get('/discover/movie', {
        params: { language: 'es', with_genres: categoryId, sort_by: 'popularity.desc' }
    });

    categoryGrid.innerHTML = '';

    data.results.forEach(movie => {
        const movieContainer = document.createElement('article');
        movieContainer.classList.add('poster-card');
        movieContainer.setAttribute('id', movie.id);
        movieContainer.addEventListener('click', () => {
            location.hash = `#movie=${movie.id}-${movie.title}`;
        });

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);

        const movieInfo = document.createElement('div');
        movieInfo.classList.add('poster-card__body');

        const title = document.createElement('p');
        title.classList.add('poster-card__title');
        title.textContent = movie.title;

        const sub = document.createElement('p');
        sub.classList.add('poster-card__sub');
        sub.textContent = `⭐ ${movie.vote_average.toFixed(1)}`;

        movieInfo.append(title, sub);
        movieContainer.append(movieImg, movieInfo);

        categoryGrid.append(movieContainer);
    });
}

// ===== TENDENCIAS COMPLETAS (#trends) =====

async function getTrendsFull() {
    const { data } = await api('/trending/movie/day');
    const movies = data.results;

    trendsGrid.innerHTML = '';

    movies.forEach(movie => {
        const movieContainer = document.createElement('article');
        movieContainer.classList.add('poster-card');
        movieContainer.setAttribute('id', movie.id);
        movieContainer.addEventListener('click', () => {
            location.hash = `#movie=${movie.id}-${movie.title}`;
        });

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);

        const movieInfo = document.createElement('div');
        movieInfo.classList.add('poster-card__body');

        const title = document.createElement('p');
        title.classList.add('poster-card__title');
        title.textContent = movie.title;

        const sub = document.createElement('p');
        sub.classList.add('poster-card__sub');
        sub.textContent = `⭐ ${movie.vote_average.toFixed(1)}`;

        movieInfo.append(title, sub);
        movieContainer.append(movieImg, movieInfo);

        trendsGrid.append(movieContainer);
    });
}

// ===== BUSQUEDA (#search=QUERY) =====

async function getSearchResults(query) {
    searchResultsTitle.textContent = query ? `Resultados para "${query}"` : 'Buscar';
    searchGrid.innerHTML = '';

    if (!query) {
        return;
    }

    const { data } = await api.get('/search/movie', {
        params: { language: 'es', query, include_adult: false }
    });

    if (data.results.length === 0) {
        searchGrid.innerHTML = '<p class="search-view__empty">No se encontraron resultados.</p>';
        return;
    }

    data.results.forEach(movie => {
        if (!movie.poster_path) return;

        const movieContainer = document.createElement('article');
        movieContainer.classList.add('poster-card');
        movieContainer.setAttribute('id', movie.id);
        movieContainer.addEventListener('click', () => {
            location.hash = `#movie=${movie.id}-${movie.title}`;
        });

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);

        const movieInfo = document.createElement('div');
        movieInfo.classList.add('poster-card__body');

        const title = document.createElement('p');
        title.classList.add('poster-card__title');
        title.textContent = movie.title;

        const sub = document.createElement('p');
        sub.classList.add('poster-card__sub');
        sub.textContent = `⭐ ${movie.vote_average.toFixed(1)}`;

        movieInfo.append(title, sub);
        movieContainer.append(movieImg, movieInfo);

        searchGrid.append(movieContainer);
    });
}