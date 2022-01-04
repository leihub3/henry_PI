import { useState, useEffect } from "react"
import { connect, useDispatch } from "react-redux";
import { addGame, changeAdded, getVideosDB } from '../redux/actions';
import { Loading } from "./Loading";
import ('./AddGameMenu.css')


function AddGame(props){
    //console.log(props)
    const [pageState, setPageState] = useState('loading');
    const { changeAdded } = props;
    // const dispatch = useDispatch();
    useEffect(() => {
        changeAdded(null)
    }, [])

    useEffect(() => {
        setPageState('loaded')
    }) 

    let formInitialState = {nombre:'', description:'', released:'', rating:5, generos:[], platforms:[], image_url:''}

    const [form, setForm] = useState(formInitialState);
    const [nombresGeneros, setNombresGeneros] = useState([]);
    const [nombresPlataformas, setNombresPlataformas] = useState([]);
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


    function handleNombresGeneros(nombre){
        const previousState = nombresGeneros;
        if(previousState.includes(nombre) === true){
           setNombresGeneros(previousState.filter(g => g !== nombre))
        }else{
            setNombresGeneros([...previousState, nombre])
        }
    }

    function handleNombresPlataformas(nombre){
        const previousState = nombresPlataformas;
        if(previousState.includes(nombre) === true){
           setNombresPlataformas(previousState.filter(g => g !== nombre))
        }else{
            setNombresPlataformas([...previousState, nombre])
        }
    }

   if(document.getElementById("rating")){
    var slider = document.getElementById("rating");
    var output = document.getElementById("ratingValue");
    output.innerHTML = slider.value;

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
        // document.getElementById('requiredName').style.display = 'inline'
       }else if(description === ''){
        document.getElementById('formDescription').classList.add('infoRequired')
        // document.getElementById('requiredDescription').style.display = 'inline'
       }else if(genres.length === 0){
        document.getElementById('selectBox').classList.add('infoRequired')
        // document.getElementById('requiredGeneros').style.display = 'inline'
       }else if(platforms.length === 0){
        document.getElementById('selectBoxPlataformas').classList.add('infoRequired')
        // document.getElementById('requiredPlatforms').style.display = 'inline'
       }else if( r.test(urlImage) === false){
        document.getElementById('formUrl').classList.add('infoRequired')
        // document.getElementById('requiredUrl').style.display = 'inline'
        }else{
            //document.formAddGame.submit();
           setForm(formInitialState)
           setNombresGeneros([])
           setNombresPlataformas([])
            props.addGame(form)
            
        }
   }
   var expanded = false;
   var expandedPlatform = false;
   function displayGeneros(){
    // document.querySelector('select').style.display = 'none'
      if(!expanded){
       document.getElementById('addGameGenerosDiv').style.display = 'grid'
       document.getElementById('genresSpan').classList.remove('triangleUp');
       document.getElementById('genresSpan').classList.add('triangleDown');
        expanded = true;
      }else{
        document.getElementById('addGameGenerosDiv').style.display = 'none'
        document.getElementById('genresSpan').classList.remove('triangleDown');
        document.getElementById('genresSpan').classList.add('triangleUp');
        expanded = false;
      }   
   }

   function displayPlataformas(){
    // document.querySelector('select').style.display = 'none'
      if(!expandedPlatform){
       document.getElementById('addGamePlataformas').style.display = 'grid'
       document.getElementById('platformsSpan').classList.remove('triangleUp');
       document.getElementById('platformsSpan').classList.add('triangleDown');
        expandedPlatform = true;
      }else{
        document.getElementById('addGamePlataformas').style.display = 'none'
        document.getElementById('platformsSpan').classList.remove('triangleDown');
        document.getElementById('platformsSpan').classList.add('triangleUp');
        expandedPlatform = false;
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
    // document.getElementById('addGameGeneros').classList.remove('infoRequired');
    document.getElementById('requiredGeneros').style.display = 'none'
   }

   function platformsReset(){
    // document.getElementById('addGamePlataformas').classList.remove('infoRequired');
    document.getElementById('requiredPlatforms').style.display = 'none'
   }

   

if(props.gameAdded === true) {        
    //alert('Video agregado exito')    
    var modal = document.getElementById("myModal");
    // var modal2 = document.getElementById("myModalForm");
   var span = document.getElementsByClassName("close2")[0];
    modal.style.display = "block";
    
    //setTimeout(() => props.changeAdded(false), 10000);    
    span.onclick = function() {
       // dispatch(getVideosDB())
        modal.style.display = "none";
        // modal2.style.display = "none";
        window.location.href = "/videogames/home";
      }
      props.changeAdded(null)
    //   dispatch(getVideosDB())
} 


if(pageState === 'loading'){
    return (
        <div>{<Loading /> }</div>
    )
}else{
      return(
        <div id="addGameMenuContainer">
            <h1 className="pageTitle">ADD GAME</h1>
            <div id='divForm'>            
            <form method="POST" action="http://localhost:3001/videogame" name="formAddGame">
                <div className="divsFlex">
                    <div>
                <label key={1} className="subtitle" title="Required">Game name*:               
                <input data-testid='formNombre' type="text" name="nombre" id="formName" value={form.nombre} className="" placeholder="Enter the game name" onChange={(e) => {handleChangeNombre(e)}} onFocus={() => nameReset()}/></label> <br/>
                </div>               
                <div>
                <label key={2} className="subtitle">Date of Release:</label>
                <input type='date' name='lanzamiento' value={form.released} className='' onChange={(e) => handleChangeReleased(e)} />
                </div>
                </div>
                <div className="divsFlex">
                    <div>
                    <label key={3} className="subtitle">Rating (between 0 and 5):</label>
                <input type="range" className="slider" id="rating" name="rating" value={form.rating} min="0" max="5" onChange={(e) => handleChangeRating(e)}/><span id="ratingValue"></span><br/>
                    </div>
                    <div>
                    <label key={4} className="subtitle">Image Url*:</label>
                <input className='form-control' type="text" name="image_url" id="formUrl" value={form.image_url} className="" placeholder="Enter a valid url image" onChange={(e) => handleChangeImageUrl(e)} onFocus={() => urlReset()}/><span id='requiredUrl' style={{display:'none', color:'red'}}> Campo requerido</span>
                <br/>
                    </div>

                </div>

                <label key={5} className="subtitle" title="Required">Description*:</label>
                <textarea name='description' id='formDescription' value={form.description} className='form-control' rows='1' cols='40' placeholder="Enter a game description" onChange={(e) => {handleChangeDescription(e)}} onFocus={() => descriptionReset()}></textarea><span id='requiredDescription' style={{display:'none', color:'red'}}> Campo requerido</span>

                <div className="divsFlex">
                    <div>
                    <label key={6} className="subtitle">Genres:</label> <span id='requiredGeneros' style={{display:'none', color:'red'}}> Campo requerido</span><br/><div className="selectBox" id='selectBox' onClick={() => displayGeneros()}>                    
                <a style={{width:'95%', textAlign:'left'}}>Select one or more genre</a>
                <span id='genresSpan' className="triangleUp"></span>
      </div>
                <div id="addGameGenerosDiv" onMouseOut={() => displayGeneros()} >                   
                {props.genres.map(g => (
                <label key={g.id}>{g.nombre}<input type="checkbox" name="generos" value={g.id} onChange={(e) => {handleChangeGeneros(e); genresReset(); handleNombresGeneros(g.nombre)}} /></label> //displayNombresGeneros(g.nombre)
                ))}
                </div>
                    </div>  
                    
                    <div>
                    <label key={8} className="subtitle" title="Required">Platforms*:</label><span id='requiredPlatforms' style={{display:'none', color:'red'}}> Campo requerido</span><br/>
                
                <div className="selectBoxPlataformas" id='selectBoxPlataformas' onClick={() => displayPlataformas()}>                    
                <a style={{width:'95%', textAlign:'left'}}>Select one or more platform</a>
                <span id='platformsSpan' className="triangleUp"></span>
      </div>
                <div id="addGamePlataformas" onMouseOut={() => displayPlataformas()} style={{display:'none'}}>
                {props.platforms.map(g => (
                   <label key={g.id} >{g.nombre}<input  type="checkbox" id="formPlatforms" name="plataformas" value={g.nombre} onChange={(e) => {handleChangePlatforms(e); platformsReset(); handleNombresPlataformas(g.nombre)}} /></label>
                ))}
                {/* <div id='divMostrarPlataformas' style={{width:'100%'}}></div> */}
                </div>                        
                    </div>

                </div>    

                <div className="divsGrid">
                     <div>
                     <div id='divMostrarGeneros' style={{height:'50px', overflow:'auto', padding:'0px 10px', color:'var(--main-bg-color)', position:'relative'}}>{nombresGeneros.join(" | ")}</div>
                     </div>
                     <div>
                     <div id='divMostrarPlataformas' style={{height:'50px', overflow:'auto', padding:'0px 10px', color:'var(--main-bg-color)', position:'relative'}}>{nombresPlataformas.join(" | ")}</div>    
                     </div>
                     </div> 
                <button type="button" onClick={() => formSubmit()} className="btn btn-primary" >SUBMIT</button>
   

                </form>
            </div>
            <div id="myModal" className="modalGameAdded">
        
          <div className="modal-content-added">
            <span className="close2">&times;</span>
            <p>Game <span className="spanNameAdded"> { (typeof props.gameDetails === 'string') ? props.gameDetails : null } </span> Added Satisfactory.</p>
          </div>
        
        </div>
            
        </div>
    )
                }
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