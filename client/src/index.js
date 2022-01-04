import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store/'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Landing from './components/Landing';
import Home from './components/Home';
import AddGameMenu from './components/AddGameMenu';
import GameDetails from './components/GameDetails';
import NotFound from './components/NotFound';
import dotenv from 'dotenv'
import axios from 'axios';
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3001'


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>      
          <Route path='*' element={<NotFound />} />
          <Route path="/" element={<Landing />} />
          <Route path='/videogames/' element={<App />}>     
              <Route path="home"/>
              <Route path="addGame"/>
              <Route path="videogame/:id"/>
          </Route>
        </Routes>
      </BrowserRouter> 
    </Provider>   
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
