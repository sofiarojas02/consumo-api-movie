window.addEventListener('load', navigator, false)
window.addEventListener('hashchange', navigator, false)
// NOTA: antes decía 'Load' (con mayúscula), que no es un evento válido del
// navegador, así que nunca se disparaba en la carga inicial. Lo corregí a 'load'.

// Grupos de secciones para controlar qué se muestra en cada página.
// hero, trendingPreview, categories, similarMovies, movieView y categoryView
// vienen de nodes.js.
const homeSections = [hero, trendingPreview, categories, similarMovies];
const allSections  = [...homeSections, movieView, categoryView, trendsView, searchView];

function hideAllSections(){
    allSections.forEach(section => section.classList.add('inactive'));
}

movieBackBtn.addEventListener('click', () => {
    history.back();
});

function navigator(){
    console.log({location})

    if(location.hash.startsWith('#trends')){
        trendsPage()
    }
    else if(location.hash.startsWith('#search=')){
        searchPage()
    }
    else if(location.hash.startsWith('#movie=')){
        moviePage()
    }
    else if(location.hash.startsWith('#category=')){
        categoryPage()
    }
    else{
        homePage()
    }
}

navigator()

function homePage(){
    console.log('Home')
    hideAllSections()
    homeSections.forEach(section => section.classList.remove('inactive'))

    getHeroMovie()
    getTrendingMoviesPreviw()
    getMoviesGenders()
    getSimilarMoviesPreview()
}

function trendsPage(){
    console.log('trends')
    hideAllSections()
    trendsView.classList.remove('inactive')

    getTrendsFull()
}


function searchPage(){
    console.log('search')
    hideAllSections()
    searchView.classList.remove('inactive')

    const query = decodeURIComponent(location.hash.split('=')[1] || '')
    getSearchResults(query)
}

function moviePage(){
    console.log('movie')
    hideAllSections()
    movieView.classList.remove('inactive')

    const movieId = location.hash.split('=')[1]
    getMovieDetail(movieId)
}

function categoryPage(){
    console.log('category')
    hideAllSections()
    categoryView.classList.remove('inactive')

    const categoryId = location.hash.split('=')[1]
    getCategoryMovies(categoryId)
}

function goHome(){
    location.hash = '#home'
}