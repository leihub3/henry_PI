import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from './components/Home';
import Landing from './components/Landing';
import AddGame from './components/AddGame';
import { getMovies, getVideosDB } from './redux/actions';
import { useEffect } from 'react';
import GameDetails from './components/GameDetails';
import Navbar from './components/Navbar';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
  dispatch(getMovies())//{movie:'Title'}
  //dispatch(getVideosDB())
  },[dispatch])

  return (
    <div className="App">
      {/* <!-- <h1>Henry Videogames</h1> --> */}
      <Navbar />
      <Routes>
      <Route path="/" element={<Landing />} /> 
      </Routes>
      
      <Routes>
      <Route path="/home" element={<Home/> } /> 
      </Routes>

      <Routes>
      <Route path="/gameDetails/:id" element={<GameDetails/> } /> 
      </Routes>

      <Routes>
      <Route path="/addGame" element={<AddGame/> } /> 
      </Routes>
    </div>
  );
}

export default App;
