import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
 videoGames: [
//    {
//   "slug":"telling-lies",
//   "name":"Telling Lies",
//   "playtime":4,
//   "platforms":[
//       {
//           "platform":{"id":4,"name":"PC","slug":"pc"}
//       },
//       {
//           "platform":{"id":1,"name":"Xbox One","slug":"xbox-one"}
//       },
//       {
//           "platform":{"id":18,"name":"PlayStation 4","slug":"playstation4"}
//       }
//       ],
//  "released":"2019-08-23",
//   "background_image":"https://media.rawg.io/media/games/d96/d965a8355c3165cf4698e1b3fdb5dd3a.jpg",
//   "rating":3.75,
//     }  
  ],
  videoGameDetails: [],
  genres: [],
  platforms: []
}
  

function reducer(state = initialState, action){
    switch(action.type){
      case 'CARGAR_VIDEOS':
        return {
          ...state,
          videoGames: state.videoGames.concat(action.payload)
     }
     case 'CARGAR_VIDEOS_DB':
        return {
          ...state,
          videoGames: state.videoGames.concat(action.payload)
     }
     case 'OBTENER_GENRES_API':
        return {
          ...state,
          genres: action.payload
     }
     case 'OBTENER_PLATFORMS_API':
        return {
          ...state,
          platforms: action.payload
     }
     case 'GAME_DETAILS':
        return {
          ...state,
          videoGameDetails: state.videoGameDetails = action.payload
     }    
    }
    return state;
  }

  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), 

const store = createStore(reducer,compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
  
export default store; 