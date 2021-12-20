const axios = require('axios');


  export function getVideosDB() {
    return function(dispatch) {
      return fetch("http://localhost:3001/videogames")
        .then(response => response.json())
        .then(json => {         
          dispatch({ type: "CARGAR_VIDEOS_DB", payload: json });
        });
    };
  }

  export function addGame(game) {
    console.log(game)
    return function(dispatch) {
      const newGame = axios.post('http://localhost:3001/videogame',game)
      .then(json => {
        console.log(json)
        dispatch({ type: "ADD_GAME", payload: json.data });
      })
      
      // let resultado = [{
      //   nombre: newGame.nombre,
      //   description: newGame.description,
      //   released: newGame.released,
      //   rating: newGame.rating,
      //   generos: newGame.generos,
      //   image_url: newGame.image_url,
      //   platforms: newGame.platforms,
      //   origen:'db'


      // }]
          
    };
  }


  export function changeAdded(state) {
    return function(dispatch) {      
      console.log('Estado: ',state)
      return dispatch({ type: "CHANGE_ADDED", payload: state });
    };
  }

  export function cleanVideosDB() {
    return function(dispatch) {      
      return dispatch({ type: "LIMPIAR_VIDEOS_DB", payload: null });
    };
  }

  export function getVideosSearch(name) {
    return function(dispatch) {
      return fetch("http://localhost:3001/videogames?name=" + name)
        .then(response => response.json())
        .then(json => {     
          dispatch({ type: "CARGAR_VIDEOS_SEARCH", payload: json });
        });
    };
  }

  export function cleanVideosSearch() {
    return function(dispatch) {      
      return dispatch({ type: "LIMPIAR_VIDEOS_SEARCH", payload: null });
    };
  }



 export function getGenresAPI() {
    return function(dispatch) {
      return fetch("http://localhost:3001/genres")
        .then(response => response.json())
        .then(json => {         
          dispatch({ type: "OBTENER_GENRES_API", payload: json });
        });
    };
  }

   export function getPlatformsAPI() {
    return function(dispatch) {
      return fetch("http://localhost:3001/platforms")
        .then(response => response.json())
        .then(json => {         
          dispatch({ type: "OBTENER_PLATFORMS_API", payload: json });
        });
    };
  }


  export function getGameDetails(id) {
    return function(dispatch) {
      return fetch("http://localhost:3001/videogame/" + id)
        .then(response => response.json())
        .then(json => {         
          dispatch({ type: "GAME_DETAILS", payload: json });
        });
    };
  }

  export function cleanGameDetails() {
    return function(dispatch) {
      return dispatch({ type: "LIMPIAR_GAME_DETAILS", payload: null });
    };
  }

  