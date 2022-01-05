import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'; 
import { render, screen, fireEvent, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddGameMenu from './components/AddGameMenu';
import reducer from './reducer'

afterEach(cleanup);
let startingState = {
  videoGames: [],
  videoGameDetails: [],
  genres: [],
  platforms: [],
  videoGamesSearch: [],
  gameAdded: null
}


function renderWithRedux(
  component, 
  { startingState, store = createStore(reducer, applyMiddleware(thunk)) } = {}
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
