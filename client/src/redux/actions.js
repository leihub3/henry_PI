const axios = require('axios');


  export function getVideosDB() {
    return async function(dispatch) {
      const games = await axios.get('/videogames')
      dispatch({ type: "CARGAR_VIDEOS_DB", payload: games.data });
    };
  }

  export function addGame(game) {
    //console.log(game)
    return async function(dispatch) {
     const newGame = await axios.post('/videogame',game)
     dispatch({ type: "ADD_GAME", payload: newGame.data });               
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
    return async function(dispatch) {
      // return fetch("http://localhost:3001/videogames?name=" + name)
      //   .then(response => response.json())
      //   .then(json => {     
      //     dispatch({ type: "CARGAR_VIDEOS_SEARCH", payload: json });
      //   });
      const games = await axios.get("/videogames?name=" + name);
      dispatch({ type: "CARGAR_VIDEOS_SEARCH", payload: games.data});
    };
  }

  export function cleanVideosSearch() {
    return function(dispatch) {      
      return dispatch({ type: "LIMPIAR_VIDEOS_SEARCH", payload: null });
    };
  }



 export function getGenresAPI() {
    return async function(dispatch) {
      // return fetch("http://localhost:3001/genres")
      //   .then(response => response.json())
      //   .then(json => {         
      //     dispatch({ type: "OBTENER_GENRES_API", payload: json });
      //   });
      const genres = await axios.get('/genres')
      dispatch({ type: "OBTENER_GENRES_API", payload: genres.data });
    };
  }

   export function getPlatformsAPI() {
    return async function(dispatch) {
      // return fetch("http://localhost:3001/platforms")
      //   .then(response => response.json())
      //   .then(json => {         
      //     dispatch({ type: "OBTENER_PLATFORMS_API", payload: json });
      //   });
      const platfomrms = await axios.get('/platforms')
      dispatch({ type: "OBTENER_PLATFORMS_API", payload: platfomrms.data });
    };
  }


  export function getGameDetails(id) {
    return async function(dispatch) {
      // return fetch("http://localhost:3001/videogame/" + id)
      //   .then(response => response.json())
      //   .then(json => {         
      //     dispatch({ type: "GAME_DETAILS", payload: json });
      //   });
      const gameDetails = await axios.get("/videogame/" + id)
      dispatch({ type: "GAME_DETAILS", payload: gameDetails.data });
    };
  }

  export function cleanGameDetails() {
    return function(dispatch) {
      return dispatch({ type: "LIMPIAR_GAME_DETAILS", payload: null });
    };
  }

  