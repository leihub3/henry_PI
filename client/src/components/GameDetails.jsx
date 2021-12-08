import { useParams } from 'react-router';
import { connect } from 'react-redux'

function GameDetails(props){
    const params = useParams();
//console.log("Soy propsDetails: ", props)
    let generos = '';
        props.videoGameDetails.genres.forEach(g => {
            generos += g.name + ' '
        })
        let plataformas = '';
        props.videoGameDetails.platforms.forEach(p => {
            plataformas += p.platform.name + ' '
        })    
    
    
    return(
        <div>
            <h1>Game Details</h1>
            <h2>{props.videoGameDetails.name}</h2>
            <p><b>Generos: </b>{generos}</p>
            <p><b>Plataformas: </b>{plataformas}</p>
                <img src={props.videoGameDetails.background_image} width='600px' />
                <p><b>Rating: </b>{props.videoGameDetails.rating}</p>
                <p><b>Fecha de Lanzamiento: </b>{props.videoGameDetails.released}</p>
        </div>
    )
}


const mapStateToProps = state => ({
    videoGames: state.videoGames,
    videoGameDetails: state.videoGameDetails
})

// const mapDispatchToProps = dispatch => ({
//     getMovies: () => dispatch(getMovies())
// })

export default connect(mapStateToProps, null)(GameDetails)