import { Link } from 'react-router-dom'
import './Games.css'
import { useDispatch } from 'react-redux';


export default function Games({getGameDetails, game}){
    const dispatch = useDispatch();
    let db;
    game.origen === 'api' ? db = '' : db = <span id="addedForYou">Added for you</span>;
    let generos;
    generos = '';        
    game.generos.forEach(g => {
        generos += g.nombre + ' '
    })
    let Background; 
    (game.background_image) ? Background = game.background_image : Background= '/landing.jpg';
    
    return(
        <div id="gameContainer" style={{backgroundImage: `url(${Background})`}}>
            <div id='caption'>
                <h3>{game.name} </h3>
                <p>{db}</p>
            </div>
            <div id='hover'>         
                <p><b>Genres: </b><br/>{generos}</p>
                <Link to={`/videogames/videogame/${game.id}`} onClick={() => dispatch(getGameDetails(game.id))}><br/> More details... </Link>
            </div>
        </div>
    )        
}
