async function getTrendingMoviesPreviw() {
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key='+ API_KEY_URL);

    const data = await res.json();

    const movies = data.results;

    movies.forEach(movie => {
        const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .shelf__track')
        trendingPreviewMoviesContainer.classList.add('shelf__track')


        const movieContainer = document.createElement('article');
        movieContainer.classList.add('poster-card');

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
    const res = await fetch(`https://api.themoviedb.org/3//genre/movie/list?api_key=${API_KEY_URL}&language=es`);
    const data = await res.json();
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
getMoviesGenders()
getTrendingMoviesPreviw()