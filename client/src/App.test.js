import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'; 
import { render, screen, fireEvent, cleanup} from '@testing-library/react';
//import "jest-dom/extend-expect";
import '@testing-library/jest-dom/extend-expect';
import AddGameMenu from './components/AddGameMenu';
import App from './App'
import Games from './components/Games'
import PruebaTest from './components/PruebaTest'

afterEach(cleanup);
let startingState = {
  videoGames: [],
  videoGameDetails: [],
  genres: [],
  platforms: [],
  videoGamesSearch: [],
  gameAdded: null
}
function reducer(state = startingState, action){
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

function renderWithRedux(
  component, 
  { initialState, store = createStore(reducer, applyMiddleware(thunk)) } = {}
  ) {
    return {
      ...render(<Provider store={store}>{component}</Provider>)
    }
  } 

  describe('Testing the AddGameMenu connected component', () => {
    it('renders component', () => {
      renderWithRedux(<AddGameMenu />)
      
    })
    
    it('contains all the required fields', () => {
      renderWithRedux(<AddGameMenu />)
      expect(screen.getByRole('heading', { name: 'ADD GAME' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'SUBMIT' })).toBeInTheDocument()
      expect(screen.getByText(/game name/i)).toBeInTheDocument()
      expect(screen.getByText(/description/i)).toBeInTheDocument()
      expect(screen.getByText(/platforms/i)).toBeInTheDocument()
      expect(screen.getByText(/image url/i)).toBeInTheDocument()
    })

    it('contains the Heading', () => {
      renderWithRedux(<AddGameMenu />)
      expect(screen.getByRole('heading', { name: 'ADD GAME' })).toBeInTheDocument()
    })

    it('contains the Submit button', () => {
      renderWithRedux(<AddGameMenu />)
      expect(screen.getByRole('button', { name: 'SUBMIT' })).toBeInTheDocument()
    })

  })

  



// it('should show description textarea', () => {
//   renderWithRedux(<AddGameMenu />)
//   expect(screen.getByText(/Genres/)).toBeInTheDocument()
//   // Events and assertions...
// })



// test('renders learn react link', () => {
//   render(<Games />);//<div><a href="/about">About ℹ️</a></div>
//   const aboutAnchorNode = screen.getByText(/chat/i)
//   expect(aboutAnchorNode).toBeInTheDocument();
//  // console.log(aboutAnchorNode)
// });

// describe('PruebaTest', () => {
//   it('renders appropriately', () => {
//     render(<PruebaTest />)
//     expect(screen.getByText(/chat/i)).toBeInTheDocument()
//     //.catch((err) => console.log(err))
//   })
//  })