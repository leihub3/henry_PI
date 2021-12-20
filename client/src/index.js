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
import Navbar from './components/Navbar';
import AddGame from './components/AddGame';
import GameDetails from './components/GameDetails';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <Routes>    
      <Route path="/" element={<Landing />} />
    </Routes>
    <Routes>      
      <Route path='/videogames' element={<App />}>      
        <Route path="home" element={<Home />} />
        <Route path="addGame" element={<AddGame /> } /> 
        <Route path="videogame/:id" element={<GameDetails /> } />
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
