import { useParams } from 'react-router';
import { connect } from 'react-redux';
import './GameDetails.css';
import { useState, useEffect } from 'react';
import { Loading } from './Loading';



function GameDetails(props){
    let game = props.videoGameDetails[0];    

    const [estado, setEstado] = useState('loading');

    useEffect(() => {
        setEstado('loaded') 
        })

        if(!game){
            return (
                <div>{<Loading /> }</div>
            )
        }else{

let generos = ''; 
    if(game.generos.length){        
        let cantGeneros = game.generos.length-1;
    game.generos.forEach((g,i) =>{
        if(i !== cantGeneros){
            generos += g.nombre + ' - '
        }else{
            generos += g.nombre + '.'
        }
    })

    }
   

let plataformas ='';

if(game.origen === 'api'){
    game.platforms.map((p,i) => {
        if(i !== game.platforms.length-1){
            plataformas += (p.platform.name + '; ')
        }else{
            plataformas += (p.platform.name + '.')
        }
        
    })
}else{
    plataformas = game.platforms + '.';
}

let Background = game.background_image;

let web;
if(game.website !== ''){
   web = <p className="txtDetailColor"><b>Website: </b><a href={game.website} target='_blank' >click here</a></p>
}else{
   web = '';
}
    
    return(
        <div id="detailsContainer" style={{backgroundImage: `url(${Background})`}}>
            <div id="detailsText">
                <div id="textBox">
                <h1>Game Details</h1>
            <h2 className="txtDetailColor">{game.name}</h2>
            <p className="txtDetailColor"><b>Genres: </b>{generos}</p>
            <p className="txtDetailColor"><b>Platforms: </b>{plataformas}</p>
                {/* <img src={game.background_image} width='600px' /> */}
                <p className="txtDetailColor"><b>Rating: </b>{game.rating}</p>
                <p className="txtDetailColor"><b>Released: </b>{game.released}</p>
                {web}
             <div className="txtDescription">
             <p ><b>Description: </b>{game.description}</p>
                 </div>   
               
                </div>
           
            </div>    
        </div>
    )
        }
}


const mapStateToProps = state => ({
    videoGames: state.videoGames,
    videoGameDetails: state.videoGameDetails
})


export default connect(mapStateToProps, null)(GameDetails)