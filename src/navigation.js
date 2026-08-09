window.addEventListener('Load', navigator, false)
window.addEventListener('hashchange', navigator, false)

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
    getTrendingMoviesPreviw()
    getMoviesGenders()
    getSimilarMoviesPreview()
}

function trendsPage(){
    console.log('trends')
}


function searchPage(){
    console.log('search')
}

function moviePage(){
    console.log('movie')
}

function categoryPage(){
    console.log('category')
}
