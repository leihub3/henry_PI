const { YOUR_API_KEY } = '451cd02e38814ccf96069140a6031557';

export function getMovies() {
  console.log(YOUR_API_KEY)
    //return({ type: "CARGAR_POST", payload: movie });
    return function(dispatch) {
      return fetch(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page_size=100`)//./Api.json https://jsonplaceholder.typicode.com/posts
        .then(response => response.json())
        .then(json => {
          console.log(json)
          dispatch({ type: "CARGAR_VIDEOS", payload: json });
        });
    };
  }

  export function getVideosDB() {
    //return({ type: "CARGAR_POST", payload: movie });
    return function(dispatch) {
      return fetch("http://localhost:3001/")
        .then(response => response.json())
        .then(json => {
          dispatch({ type: "CARGAR_VIDEOS_DB", payload: json });
        });
    };
  }

   export function getGameDetails(payload) {
   return { type: "GAME_DETAILS", payload};
       
  }

  