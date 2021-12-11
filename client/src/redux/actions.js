const { YOUR_API_KEY } = '451cd02e38814ccf96069140a6031557';
const axios = require('axios');


export function getVideosApi() {
  console.log(YOUR_API_KEY)
    //return({ type: "CARGAR_POST", payload: movie });
    return function(dispatch) {
      return fetch(`https://api.rawg.io/api/games?key=451cd02e38814ccf96069140a6031557&page_size=100`)//./Api.json https://jsonplaceholder.typicode.com/posts
        .then(response => response.json())
        .then(json => {
          console.log(json)
          dispatch({ type: "CARGAR_VIDEOS", payload: json.results });
        });
    };
  }

  export function getVideosDB() {
    //return({ type: "CARGAR_POST", payload: movie });
    return function(dispatch) {
      return fetch("http://localhost:3001/videogames")
        .then(response => response.json())
        .then(json => {
          dispatch({ type: "CARGAR_VIDEOS_DB", payload: json });
        });
    };
  }

  export function getGenresAPI() {
    //Busco todos los generos de la API
    return function(dispatch) {
      return fetch("https://api.rawg.io/api/genres?key=451cd02e38814ccf96069140a6031557")
        .then(response => response.json())
        .then(json => {
          
          let arrayGeneros = [];
          json.results.map(g => {
            arrayGeneros.push({nombre: g.name})
          })
          //Los guardo en la DB
              axios.post('http://localhost:3001/genres', {
                arrayGeneros: arrayGeneros
              })
              .then(function (response) {
                //console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
          
          //Los pido a la BD 
          axios.get('http://localhost:3001/genres')
              .then(function (response) {
                //los despacho a la Store
                //console.log(response.data);
                dispatch({ type: "OBTENER_GENRES_API", payload: response.data });
              })
              .catch(function (error) {
                console.log(error);
              });    
      
          //
        });
    };
  }

  export function getPlatformsAPI() {
    //Busco todos los generos de la API
    return function(dispatch) {
      return fetch("https://api.rawg.io/api/platforms?key=451cd02e38814ccf96069140a6031557")
        .then(response => response.json())
        .then(json => {
          
          let arrayPlataformas = [];
          json.results.map(p => {
            arrayPlataformas.push({nombre: p.name})
          })
          dispatch({ type: "OBTENER_PLATFORMS_API", payload: arrayPlataformas });
      
          //
        });
    };
  }

   export function getGameDetails(payload) {
   return { type: "GAME_DETAILS", payload};
       
  }

  