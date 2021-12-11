import { useState } from "react"
import { connect } from "react-redux";
import ('./AddGame.css')

function AddGame(props){
    const [form, setForm] = useState({nombre:'', released:'', rating:'', generos:[], platforms:[], image_url:''});

    console.log(form.generos)

    function handleChangeNombre(event) {
        setForm({...form,nombre: event.target.value});
      }
    
    function handleChangeReleased(event) {
       setForm({...form, released: event.target.value});
    }

    function handleChangeRating(event){
        setForm({...form, rating: event.target.value});
    }

    function handleChangeGeneros(event){;
        let generos = form.generos
        if(JSON.stringify(generos).includes(event.target.value) === false){
            setForm({...form, generos: [...generos,{genero: event.target.value}]});
        }else{
            setForm({...form, generos: generos.filter(g => g.genero !== event.target.value)})
        }
        
    }

    function handleChangePlatforms(event){;
        let plataformas = form.platforms
        if(JSON.stringify(plataformas).includes(event.target.value) === false){
            setForm({...form, platforms: [...plataformas,{platform: event.target.value}]});
        }else{
            setForm({...form, platforms: plataformas.filter(p => p.platform !== event.target.value)})
        }        
    }

    function handleChangeImageUrl(event){
        setForm({...form, image_url: event.target.value});
    }

    const generosDB = [];
    props.genres.forEach(g => {
        generosDB.push(<span><input  key={g.id} type="checkbox" name="generos" value={g.id} onChange={(e) => handleChangeGeneros(e)}/>{g.nombre}</span>)
    })

        const platformsOptionsToList = [];
    
        props.platforms.map(p => {
            platformsOptionsToList.push(<span><input  key={p.nombre} type="checkbox" name="plataformas" value={p.nombre} onChange={(e) => handleChangePlatforms(e)}/>{p.nombre}</span>)
        })

    return(
        <div>
            <h1>Add Game</h1>
            <form method="POST" action="http://localhost:3001/videogame">
                <label>Game name:</label>
                <input type="text" name="nombre" value={form.nombre} className="" placeholder="Enter the game name" onChange={(e) => handleChangeNombre(e)}/><br/>
                <label>Date of Release:</label>
                <input type='date' name='lanzamiento' value={form.released} className='' onChange={(e) => handleChangeReleased(e)} /><br/>
                <label>Rating (between 0 and 5):</label>
                <input type="range" id="rating" name="rating" min="0" max="5" onChange={(e) => handleChangeRating(e)}/><br/>
                <label>Genres:</label><br/>
                {generosDB}
                <br/><label>Platforms:</label><br/>
                {platformsOptionsToList}
           <br/>               
                <label>Image Url:</label>
                <input type="text" name="image_url" value={form.image_url} className="" placeholder="Enter a valid url image" onChange={(e) => handleChangeImageUrl(e)}/><br/>
                
   
                <button type="submit" className="btn btn-primary" >SUBMIT</button>
   

            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    genres: state.genres,
    platforms: state.platforms
})

export default connect(mapStateToProps,null)(AddGame)