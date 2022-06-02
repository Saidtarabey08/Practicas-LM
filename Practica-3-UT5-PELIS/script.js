
const API_KEY = 'api_key=839b3811bcc8747e5c9a7d3ebc549dcc';
const BASE_URL = 'https://api.themoviedb.org/3';
const POPULARES = '/discover/movie?sort_by=popularity.desc&';
const MEJORES_PELIS = '/movie/top_rated?';
const NUEVOS_ESTRENOS = '/movie/upcoming?'
//const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+ API_KEY+'&language=es';
//const API_URL = BASE_URL + '/trending/all/day?'+ API_KEY+'&language=es';

const API_URL = BASE_URL + '/movie/now_playing?'+ API_KEY+'&language=es';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const IMG_URL_ORIGINAL = 'https://image.tmdb.org/t/p/original';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const carousel = document.getElementById('myCarousel'); 

getMovies(API_URL)

function getMovies(url){

    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showCarrusel(data.results);
        showMovies(data.results);
    })
}

function showMovies(data){
    main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, name} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${IMG_URL+poster_path}" alt="${title}">

        <div class="movie-info">
            <h3>${title? title : name }</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>

        <div class="overview">
            <h3>Sinópsis</h3>
            ${overview}
        </div>`

        main.appendChild(movieEl);
    })
}

function showCarrusel(data){
    carousel.innerHTML = '';
    const movieEl = document.createElement('div');
    var num = getRandomInt(0, data.length-2)
    movieEl.innerHTML = `
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true"
        aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active" style="background-image: url('${IMG_URL_ORIGINAL+data[num].backdrop_path}');">
        <div class="container carousel-info" ></div>
        <div class="carousel-caption text-start">
          <h1>${data[num].title}</h1>
          <p>${data[num].overview}</p>
        </div>
    
      </div>
      <div class="carousel-item" style="background-image: url('${IMG_URL_ORIGINAL+data[num+1].backdrop_path}');">
        <div class="container carousel-info"></div>
        <div class="carousel-caption text-start">
          <h1>${data[num+1].title}</h1>
          <p>${data[num+1].overview}</p>
        </div>
      </div>
      <div class="carousel-item" style="background-image: url('${IMG_URL_ORIGINAL+data[num+2].backdrop_path}');">
        <div class="container carousel-info"></div>
        <div class="carousel-caption text-start">
        <h1>${data[num+2].title}</h1>
        <p>${data[num+2].overview}</p>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
    `
    carousel.appendChild(movieEl);
}


function getColor(vote){
    if(vote>= 8){
        return 'green'
    }else if(vote >= 5){
        return "orange"
    }else{
            return 'red'
        }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm){
        getMovies(searchURL+'&query='+searchTerm)
    }else{
        getMovies(API_URL);
    }
})

let buttonPopu = document.getElementById("populares");
let buttonMejores = document.getElementById("mejores-pelis");
let buttonEstrenos = document.getElementById("estrenos")
buttonPopu.addEventListener('click', (e) => {
  e.preventDefault();
  getMovies(BASE_URL + POPULARES + API_KEY+'&language=es');
})
buttonMejores.addEventListener('click', (e) => {
  e.preventDefault();
  getMovies(BASE_URL + MEJORES_PELIS + API_KEY+'&language=es');
})
buttonEstrenos.addEventListener('click', (e) => {
  e.preventDefault();
  getMovies(BASE_URL + NUEVOS_ESTRENOS + API_KEY+'&language=es');
})

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;    
}