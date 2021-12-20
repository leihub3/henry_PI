import { Link } from 'react-router-dom'
import './Games.css'
import { useParams } from 'react-router';
import { connect, useDispatch } from 'react-redux';
import { getGameDetails } from '../redux/actions';

export default function Games({getGameDetails, game}){
    //console.log(getGameDetails)
    const dispatch = useDispatch();
    let db;
    game.origen === 'api' ? db = '' : db = <span id="addedForYou">Added for you</span>;
    let generos;
    generos = '';        
    game.generos.forEach(g => {
    generos += g.nombre + ' '
        })
    let Background = game.background_image;

    return(
        
            <div id="gameContainer" style={{backgroundImage: `url(${Background})`}}>
            
               
                {/* <img src={game.background_image} width='300px' /> */}

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

// const mapStateToProps = state => ({
//     videoGames: state.videoGames
// })

// const mapDispatchToProps = dispatch => ({
//     getGameDetails: (game) => dispatch(getGameDetails(game))
// })

// export default connect(mapStateToProps, mapDispatchToProps)(Games);