const initialState = {
    videoGames: [],
     videoGameDetails: [],
     genres: [],
     platforms: [],
     videoGamesSearch: [],
     gameAdded: null
   }
   
export default function reducer(state = initialState, action){
    switch(action.type){
      case 'CARGAR_VIDEOS':
        return {
          ...state,
          videoGames: state.videoGames.concat(action.payload)
     }
     case 'ADD_GAME':
        return {
          ...state,
          videoGameDetails: state.videoGameDetails = action.payload,
          gameAdded: state.gameAdded = true
     }
     case 'CHANGE_ADDED':
        return {
          ...state,
          gameAdded: state.gameAdded = action.payload
     }
     case 'CARGAR_VIDEOS_DB':
        return {
          ...state,
          videoGames: action.payload
          // state.videoGames.concat(action.payload)
     }
     case 'LIMPIAR_VIDEOS_DB':
        return {
          ...state,
          videoGames: state.videoGames = []
     }
     case 'CARGAR_VIDEOS_SEARCH':
        return {
          ...state,
          videoGamesSearch: state.videoGamesSearch = [...action.payload]
     }
     case 'LIMPIAR_VIDEOS_SEARCH':
      return {
        ...state,
        videoGamesSearch: state.videoGamesSearch = []
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
     
     case 'LIMPIAR_GAME_DETAILS':
      return {
        ...state,
        videoGameDetails: state.videoGameDetails = []
   }   
   default:
    return state;
    }
    
  }