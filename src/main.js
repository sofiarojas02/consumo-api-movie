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

    const movies = data.results;

    movies.forEach(movie => {
        const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .shelf__track')
        trendingPreviewMoviesContainer.classList.add('shelf__track')


        const movieContainer = document.createElement('article');
        movieContainer.classList.add('poster-card');
        movieContainer.setAttribute('id', movie.id)

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

        trendingPreviewMoviesContainer.append(movieContainer)
        
    });


}

//Generos

let allGenders = [];
let showingAll = false;

async function getMoviesGenders() {
    const { data } = await api.get('/genre/movie/list', {
        params: { language: 'es' }
    });

    allGenders = data.genres; // array de objetos

    renderCategories(allGenders.slice(0, 6));

    const toggleBtn = document.querySelector('.categories .shelf__link');
    toggleBtn.addEventListener('click', () => {
        showingAll = !showingAll;
        renderCategories(showingAll ? allGenders : allGenders.slice(0, 6));
        toggleBtn.textContent = showingAll ? 'Ver menos' : 'Ver todo';
    });
}

function renderCategories(list) {
    const catGrid = document.querySelector('.categories .categories__grid');
    catGrid.innerHTML = ''; // limpia antes de volver a pintar

    const iconMap = {
        'Acción': '🎬', 'Aventura': '🗺️', 'Animación': '🎨', 'Comedia': '😂', 'Crimen': '🕵️', 'Documental': '🎥', 'Drama': '🎭', 'Familia': '👨‍👩‍👧', 'Fantasía': '🧙', 'Historia': '📜', 'Terror': '👻', 'Música': '🎵', 'Misterio': '🔍', 'Romance': '💘', 'Ciencia ficción': '🚀', 'Película de TV': '📺', 'Suspense': '⚡', 'Bélica': '⚔️', 'Western': '🤠'
    };

    list.forEach(gender => {
        const catChip = document.createElement('button');
        catChip.classList.add('category-chip');
        catChip.setAttribute('id', gender.id)

        const chipIcon = document.createElement('span');
        chipIcon.classList.add('category-chip__icon');
        chipIcon.textContent = iconMap[gender.name] || '🎞️';

        const chipLabel = document.createTextNode(gender.name);

        catChip.append(chipIcon, chipLabel);
        catGrid.append(catChip);
    });
}

async function getSimilarMoviesPreview() {
    const { data } = await api.get('/discover/movie', {
        params: { language: 'es', sort_by: 'popularity.desc' }
    });

    const movies = data.results.slice(0, 6); // solo las primeras 6
    const similarMoviesContainer = document.querySelector('#similarMovies .shelf__track');
    similarMoviesContainer.innerHTML = ''; // limpia antes de pintar, evita duplicados

    movies.forEach(movie => {
        const movieContainer = document.createElement('article');
        movieContainer.classList.add('poster-card', 'poster-card--sm');
        movieContainer.setAttribute('id', movie.id);

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

        similarMoviesContainer.append(movieContainer);
    });
}


async function getHeroMovie() {
    const { data } = await api.get('/movie/popular', {
        params: { language: 'es' }
    });

    const movie = data.results[0];

    const heroMedia = document.querySelector('#heroMedia');
    heroMedia.style.backgroundImage =
        `linear-gradient(160deg, rgba(10,10,12,0.15), rgba(10,10,12,0.9)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;
    heroMedia.style.backgroundSize = 'cover';
    heroMedia.style.backgroundPosition = 'center';

    document.querySelector('#heroTitle').textContent = movie.title;

    const year = movie.release_date ? movie.release_date.slice(0, 4) : '';
    const genreName = allGenders.find(g => g.id === movie.genre_ids[0])?.name || '';
    document.querySelector('#heroMeta').textContent = `${year} · ${genreName} · ⭐ ${movie.vote_average.toFixed(1)}`;
}

    getHeroMovie() 
