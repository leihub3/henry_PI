import { Link } from 'react-router-dom'
import './Game.css'
import { useParams } from 'react-router';
import { connect, useDispatch } from 'react-redux';
import { getGameDetails } from '../redux/actions';

export default function Games({getGameDetails, game}){
    console.log(getGameDetails)
    const dispatch = useDispatch();
    let generos = '';
    game.genres.forEach(g => {
        generos += g.name + ' '
    })

    return(
            <div>
                <h3>{game.name} </h3>
                <p><b>Generos: </b>{generos}</p>
                <img src={game.background_image} width='300px' />

                <Link to={`/gameDetails/${game.id}`} onClick={() => dispatch(getGameDetails(game))}><br/> More details... </Link>
                
           
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