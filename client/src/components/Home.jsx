import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { getMovies, getGameDetails } from "../redux/actions"
import Games from "./Games"
import './Home.css'
import { useState } from 'react'
//{vg.id}
function Home (props){
    console.log("Holaaaaa : ", props.videoGames[0].results)
    const [result, setResult] = useState("");
    console.log("hola result: ", result)

    function handleChange(event) {
        setResult(event.target.value);
      }
    

    return(
        <div>
            <h1>HOME</h1>  
            <input
              type="text"
              id="search"
              autoComplete="off"
              value={result}
              placeholder='Buscar Juego'
              onChange={(e) => handleChange(e)}
            />          
            <div id='games-container'>
            
            {props.videoGames[0].results.map(vg => {
                if(vg.name.includes(result)){
                    return <div key={vg.id}>
                           <Games getGameDetails={getGameDetails} game={vg} />
                            </div>
                }
                
            })}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    videoGames: state.videoGames,
    videoGameDetails: state.videoGameDetails
})

const mapDispatchToProps = dispatch => ({
    getMovies: () => dispatch(getMovies())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)