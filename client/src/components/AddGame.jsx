import { useState, useEffect } from "react"
import { connect } from "react-redux";
import { addGame, changeAdded } from '../redux/actions';
import ('./AddGame.css')


function AddGame(props){
    const { changeAdded } = props;
    useEffect(() => {
        changeAdded(null)
    }, [])
    const [form, setForm] = useState({nombre:'', description:'', released:'', rating:5, generos:[], platforms:[], image_url:''});

    //console.log(form.generos)

    function handleChangeNombre(event) {
        setForm({...form,nombre: event.target.value});
      }
    
      function handleChangeDescription(event) {
        setForm({...form,description: event.target.value});
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

   if(document.getElementById("rating")){
    var slider = document.getElementById("rating");
    var output = document.getElementById("ratingValue");
    output.innerHTML = ' Your Rating is: '  + slider.value;

    slider.oninput = function() {
    output.innerHTML = this.value;
    }
   }

   function formSubmit(){
       //alert('Hola')
       let name = form.nombre;
       let description = form.description;
       let urlImage = form.image_url;
       let genres = form.generos;
       let platforms = form.platforms;
       let r = /^(ftp|http|https):\/\/[^ "]+$/;
       
      
       if(name === ''){
        document.getElementById('formName').classList.add('infoRequired')
        document.getElementById('requiredName').style.display = 'inline'
       }else if(description === ''){
        document.getElementById('formDescription').classList.add('infoRequired')
        document.getElementById('requiredDescription').style.display = 'inline'
       }else if(genres.length === 0){
        document.getElementById('addGameGeneros').classList.add('infoRequired')
        document.getElementById('requiredGeneros').style.display = 'inline'
       }else if(platforms.length === 0){
        document.getElementById('addGamePlataformas').classList.add('infoRequired')
        document.getElementById('requiredPlatforms').style.display = 'inline'
       }else if( r.test(urlImage) === false){
        document.getElementById('formUrl').classList.add('infoRequired')
        document.getElementById('requiredUrl').style.display = 'inline'
        }else{
            //document.formAddGame.submit();
            props.addGame(form)
        }
   }

   function nameReset(){
    document.getElementById('formName').classList.remove('infoRequired');
    document.getElementById('formName').value = ''
    document.getElementById('requiredName').style.display = 'none'
   }

   function descriptionReset(){
    document.getElementById('formDescription').classList.remove('infoRequired');
    document.getElementById('formDescription').value = ''
    document.getElementById('requiredDescription').style.display = 'none'
   }

   function urlReset(){
    document.getElementById('formUrl').classList.remove('infoRequired');
    document.getElementById('formUrl').value = ''
    document.getElementById('requiredUrl').style.display = 'none'
   }

   function genresReset(){
    document.getElementById('addGameGeneros').classList.remove('infoRequired');
    document.getElementById('requiredGeneros').style.display = 'none'
   }

   function platformsReset(){
    document.getElementById('addGamePlataformas').classList.remove('infoRequired');
    document.getElementById('requiredPlatforms').style.display = 'none'
   }

   

if(props.gameAdded === true) {
    //alert('Video agregado exito')    
    var modal = document.getElementById("myModal");
   var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    //setTimeout(() => props.changeAdded(false), 10000);    
    span.onclick = function() {
        modal.style.display = "none";
        props.changeAdded(false)
        window.location.href = "http://localhost:3000/videogames/home";
      }
} 


      return(
        <div id="addGameContainer">
            <h1 className="title">ADD GAME</h1>
            <form method="POST" action="http://localhost:3001/videogame" name="formAddGame">
                <label className="subtitle" title="Required">Game name*:</label>
                <input type="text" name="nombre" id="formName" value={form.nombre} className="" placeholder="Enter the game name" onChange={(e) => {handleChangeNombre(e)}} onFocus={() => nameReset()}/><span id='requiredName' style={{display:'none', color:'red'}}> Campo requerido</span><br/>
                <label className="subtitle" title="Required">Description*:</label>
                <textarea name='description' id='formDescription' value={form.description} className='form-control' rows='1' cols='40' placeholder="Enter a game description" onChange={(e) => {handleChangeDescription(e)}} onFocus={() => descriptionReset()}></textarea><span id='requiredDescription' style={{display:'none', color:'red'}}> Campo requerido</span><br />                
                <label className="subtitle">Date of Release:</label>
                <input type='date' name='lanzamiento' value={form.released} className='' onChange={(e) => handleChangeReleased(e)} /><br/>
                <label className="subtitle">Rating (between 0 and 5):</label>
                <input type="range" className="slider" id="rating" name="rating" value={form.rating} min="0" max="5" onChange={(e) => handleChangeRating(e)}/><span id="ratingValue"></span><br/>               
                <label className="subtitle">Image Url:</label>
                <input className='form-control' type="text" name="image_url" id="formUrl" value={form.image_url} className="" placeholder="Enter a valid url image" onChange={(e) => handleChangeImageUrl(e)} onFocus={() => urlReset()}/><span id='requiredUrl' style={{display:'none', color:'red'}}> Campo requerido</span>
                <br/>
                <label className="subtitle">Genres:</label> <span id='requiredGeneros' style={{display:'none', color:'red'}}> Campo requerido</span><br/>
                {/* {generosDB} */}
                <div id="addGameGeneros">
                {props.genres.map(g => (
                   <div key={g.id} className="addGameCadaGenero"><label >{g.nombre}</label><input type="checkbox" name="generos" value={g.id} onChange={(e) => {handleChangeGeneros(e); genresReset()}} /></div>
                ))}
                </div>
                <br/><label className="subtitle" title="Required">Platforms*:</label><span id='requiredPlatforms' style={{display:'none', color:'red'}}> Campo requerido</span><br/>
                <div id="addGamePlataformas">
                {props.platforms.map(g => (
                   <div key={g.nombre} className="addGameCadaPlatform"><label >{g.nombre}</label><input   type="checkbox" id="formPlatforms" name="plataformas" value={g.nombre} onChange={(e) => {handleChangePlatforms(e); platformsReset()}} /></div>
                ))}
                </div>

           <br/>
                
   
                <button type="button" onClick={() => formSubmit()} className="btn btn-primary" >SUBMIT</button>
   

            </form>
            <div id="myModal" className="modal">
        
          <div className="modal-content">
            <span className="close">&times;</span>
            <p>Game <span className="spanName"> { props.gameDetails } </span> Added Satisfactory.</p>
          </div>
        
        </div>
        </div>
    )
}

const mapStateToProps = state => ({
    genres: state.genres,
    platforms: state.platforms,
    gameAdded: state.gameAdded,
    gameDetails: state.videoGameDetails
})

const mapDispatchToProps = dispatch => ({
    addGame: (game) => dispatch(addGame(game)),
    changeAdded: (state) => dispatch(changeAdded(state))
})

export default connect(mapStateToProps,mapDispatchToProps)(AddGame)