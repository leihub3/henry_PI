import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { getGameDetails, getVideosApi } from "../redux/actions"
import Games from "./Games"
import './Home.css'
import { useState } from 'react'
//{vg.id}
function Home (props){
    //console.log("Holaaaaa : ", props.videoGames[0].results)
    const [result, setResult] = useState("");
    const [generoSearch, setGeneroSearch] = useState("");
    const [alfSearch, setAlfSearch] = useState("");
    //console.log("hola result: ", result)

    function handleChange(event) {
        setResult(event.target.value);
      }
    function handleChangeSelect(event) {
        setGeneroSearch(event.target.value);
    }  
    function handleChangeAlf(event) {
        setAlfSearch(event.target.value);
    }  
    // SETEANDO GENEROS DEDE EL JSON DELA API
    // const generosArray = [] ;//new Set(["a","b","c"])
    //     var generosSet;
    //     props.videoGames[0].results.map((g,index) => {
    //         g.genres.forEach((p,i) => {
    //             generosArray.push(p.name)//
    //         })
    //     })
    //     generosSet = new Set(generosArray)
        
    //     var generosOptions = [...generosSet]; 
    //     const generosOptionsToList = [];
    
    //     generosOptions.map(g => {
    //         generosOptionsToList.push(<option value={g}>{g}</option>)//'<option value={g.name}>{g.name}</option>'
    //     })

    /**** SETEANDO RESULTADOS DE LA BASE DE DATOS */
    console.log(props.videoGames)
    
    //console.log(generosSet)
    //console.log(generosOptionsToList)

    const generosOptionsToList = [];

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

            <select onChange={(e) => handleChangeSelect(e)} value={generoSearch}>
                <option value='selccionar'>Select Genres</option>
                {generosOptionsToList}
            </select>

            {/* var a = [
	{FirsName:"Ellie", LastName:"Williams"},
	{FirstName:"Lara", LastName : "Croft"}
];
function SortArray(x, y){
    if (x.LastName < y.LastName) {return -1;}
    if (x.LastName > y.LastName) {return 1;}
    return 0;
}
var s = a.sort(SortArray);
console.log(s); */}

            <select onChange={(e) => handleChangeAlf(e)} value={alfSearch}>
                <option value='seleccionar'>Order by:</option>
                <option value='alf_desc'>Alphabethic (desc)</option>
                <option value='alf_asc'>Alphabethic (asc)</option>
                <option value='rat_asc'>Rating (highest first)</option>
                <option value='rat_desc'>Rating (lowest first)</option>
                
            </select>
            <div id='games-container'>
            
            {
            // props.videoGames[0].results.map(vg => {
            //     console.log(generoSearch)
            //     if(generoSearch !== 'seleccionar'){
            //         if(vg.name.includes(result) && JSON.stringify(vg.genres).includes(generoSearch) === true){ //&& vg.genres[0].name === 'Adventure'
            //             return <div key={vg.id}>
            //                    <Games getGameDetails={getGameDetails} game={vg} />
            //                     </div>
            //         }
            //     }else{
            //         if(vg.name.includes(result)){ //&& vg.genres[0].name === 'Adventure'
            //             return <div key={vg.id}>
            //                    <Games getGameDetails={getGameDetails} game={vg} />
            //                     </div>
            //         }
            //     }
                                
                
                
            // })
            }
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    videoGames: state.videoGames,
    videoGameDetails: state.videoGameDetails
})

const mapDispatchToProps = dispatch => ({
    getVideosApi: () => dispatch(getVideosApi())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)