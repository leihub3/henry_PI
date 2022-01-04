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
                    return
                })
            }else{
                plataformas = game.platforms;
            }

            let Background; 
            (game.background_image) ? Background = game.background_image : Background= '/landing.jpg';

            let web;
            if(game.website !== ''){
                web = <div className="txtDetailColor flexDiv2"><b>Website: </b><br></br><a href={game.website} target='_blank' >click here</a></div>
            }else{
                web = '';
            }
    
            return(
                <div id="detailsContainer" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7), rgba(1,1,39,1)), url(${Background})`}}>
                    <div id="titleBig" >
                        <span>{game.name}</span>
                        <p>{plataformas}</p>            
                    </div>
                    <div id="detailsText">
                        <div id="textBox">
                            <h1 className='pageTitle'>About The Game</h1>
                            <div className='flexDetails' style={{display:'flex'}}>
                                <div className="txtDetailColor flexDiv divSeparator"><b>Genres: </b><br></br>{generos}</div>
                                <div className="txtDetailColor flexDiv"><b>Platforms: </b><br></br>{plataformas}</div>
                            </div> 
                            <br></br>
                            <div style={{display:'flex'}}>
                                <div className="txtDetailColor flexDiv2"><b>Rating: </b><br></br>{game.rating}</div>
                                <div className="txtDetailColor flexDiv2"><b>Released: </b><br></br>{game.released}</div>
                                {web}
                            </div>      
                            <br></br>
                            {game.description ? (
                                <div> <b>Description: </b>
                                    <div className="txtDescription">
                                        <p >{game.description}</p>
                                    </div> 
                                </div>
                            ) : null}
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