import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from './components/Home';
import AddGame from './components/AddGame';
import { getVideosDB, getGenresAPI, getPlatformsAPI } from './redux/actions';
import { useEffect } from 'react';
import GameDetails from './components/GameDetails';
import Navbar from './components/Navbar';
import { connect } from 'react-redux'
import { Loading } from './components/Loading';

function App(props) {
  const dispatch = useDispatch();

  useEffect(() => {
  //dispatch(getVideosApi())
  dispatch(getGenresAPI())
  dispatch(getVideosDB())
  dispatch(getPlatformsAPI())
  },[dispatch])


  return (
    <div className="App">
      {<Navbar />}
      <Routes> 
        { ((props.videoGames.length !== 0 || props.videoGamesSearch.length !== 0 ) && props.genres.length !== 0) ? <Route path="/home" element={<Home/> } /> : <Route path="/home" element={<Loading /> }></Route> }
      
      
      <Route path="/videogame/:id" element={<GameDetails/> } /> 
      <Route path="/addGame" element={<AddGame/> } /> 
      </Routes>
      
    </div>
  );
}

const mapStateToProps = state => ({
  videoGames: state.videoGames,
  videoGamesSearch: state.videoGamesSearch,
  genres: state.genres
})

export default connect(mapStateToProps,null)(App);
