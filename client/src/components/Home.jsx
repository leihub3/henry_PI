import { connect } from 'react-redux'
import { getVideosDB, getGameDetails, getVideosSearch, cleanVideosSearch, cleanGameDetails, cleanVideosDB } from "../redux/actions"
import Games from "./Games"
import { Loading } from "./Loading"
import './Home.css'
import { useState, useEffect } from 'react'
import AddGameModal from './AddGameModal'

function Home (props){
    const [pageState, setPageState] = useState('loading');
    const [result, setResult] = useState("");
    const [generoSearch, setGeneroSearch] = useState("");
    const [alfSearch, setAlfSearch] = useState("");
    const [paginationOffset, setPaginationOffset] = useState(0);
    const [historialPag, setHistorialPag] = useState({prev:1, actual:1, historico:[1]});
    const [showAddGame, setShowAddGame] = useState(false)

    useEffect(() => { 
        props.cleanGameDetails()
       }, [])

    useEffect(() => {
            setPageState('loaded')
        })       
    
    useEffect(() => {
        if(showAddGame === true){
            var modal = document.getElementById("myModalForm");
            var span = document.getElementsByClassName("close")[0];
            modal.style.display = "block";
            span.onclick = function() {
            modal.style.display = "none";
            setShowAddGame(false)
                    }
        }
    })    

    /*************comienzo FUNCIONES MANEJAR EVENTOS Y SETEAR ESTADOS *****************/
    function handleChange(event) {
        event.preventDefault();
        setResult(event.target.value);        
    }

    function handleChangeSelect(event) {
        event.preventDefault();
        setGeneroSearch(event.target.value);        
    } 
     
    function handleChangeAlf(event) {
        event.preventDefault();
        setAlfSearch(event.target.value);
    }  


    function handleHistorialPag(event) {
        event.preventDefault();        
        let historico = historialPag.historico;
        setHistorialPag({prev: historialPag.actual, actual:event.target.value, historico:[...historico,event.target.value]}); 
    }  
           
    function handleClickOffset(event){
        event.preventDefault();         
        let startPage;
        event.target.value === 1 ? startPage=0 : startPage=(event.target.value-1) * resToShowPerPage;
        setPaginationOffset(startPage)
    }

    function handleClickSearch(){
        if(result !== ''){
            props.cleanVideosSearch()
            setResult('')
            setPaginationOffset(0)
            setPageState('loading')
            props.getVideosSearch(result)
        }else{
            props.cleanVideosSearch()
            setResult('')
            setPaginationOffset(0)
            setPageState('loading')
            props.getVideosDB()
        }
                        
    }

    function handleShowAddGame(){
            setShowAddGame(true);
    }
/*************fin FUNCIONES MANEJAR EVENTOS Y SETEAR ESTADOS *****************/

//Mapeo el Estado que contiene las plataformas traidas de la Api, armo los option y pongo todo en un array
//para luego insertarlo en un select mas abajo
    const generosOptionsToList = [];    
        (props.genres && Array.isArray(props.genres) ? props.genres : []).map(g => {
            generosOptionsToList.push(<option key={g.id} value={g.nombre}>{g.nombre}</option>)//'<option value={g.name}>{g.name}</option>'
    })

        
/************************* COMIENZO FUNCIONES ORDER BY **********************/       
        function SortArrayAlfAsc(x, y){
            if (x.name < y.name) {return -1;}
            if (x.name > y.name) {return 1;}
            return 0;
        }

        function SortArrayAlfDesc(x, y){
            if (x.name > y.name) {return -1;}
            if (x.name < y.name) {return 1;}
            return 0;
        }

        function SortArrayRatDesc(x, y){
            if (x.rating > y.rating) {return -1;}
            if (x.rating < y.rating) {return 1;}
            return 0;
        }

        function SortArrayRatAsc(x, y){
            if (x.rating < y.rating) {return -1;}
            if (x.rating > y.rating) {return 1;}
            return 0;
        }

        function SortArrayOrigen(x, y){
            if (x.origen > y.origen) {return -1;}
            if (x.origen < y.origen) {return 1;}
            return 0;
        }

        /********* FIN FUNCIONES ORDER BY ******/

        var a;
        //si Search tiene juegos (porque se realizo una busqueda) los muestro, sino muestro los que al comienzo traje de la Api
        (props.videoGamesSearch.length>0) ? a = props.videoGamesSearch : a = props.videoGames

        //Una vez que decido CUALES MOSTRAR los ORDENO SEGUN LOS CRITERIOS SELECCIONADOS
        var s;
        switch(alfSearch){
            case 'alf_asc':
            s = a.sort(SortArrayAlfAsc); 
            break;
            case 'alf_desc':
            s = a.sort(SortArrayAlfDesc);   
            break;
            case 'rat_desc':
            s = a.sort(SortArrayRatDesc);   
            break;
            case 'rat_asc':
            s = a.sort(SortArrayRatAsc);   
            break;
            case 'seleccionar':
            s = a.sort(SortArrayOrigen); 
            break;    
            default:
            s = a.sort(SortArrayOrigen);        
        }

        /**********************COMIENZO PAGINACION******************************* */
        //CLASES CSS
        //RESETEO la clase del boton al cambiar el criterio de busqueda. Si el boton activo es el 1 no es necesario resetearlo
        if(pageState === 'loaded'){
            let activeButton = document.getElementById('btnPag_'+historialPag.historico[historialPag.historico.length-1]); 
            let lastVisitedPage = historialPag.historico[historialPag.historico.length-1];
            if(activeButton !== null && lastVisitedPage !== 1){
                activeButton.classList.remove('actualPagination') 
            }

        let prev = historialPag.prev;
        let current = historialPag.actual;    
        let prevBtn = document.getElementById('btnPag_'+prev)
        let currentBtn = document.getElementById('btnPag_'+current)
        
        //Una vez reseteado el paginado AGREGO LA CLASE al boton activo y SACO LA CLASE al previo
        if( prevBtn !== null && currentBtn !== null ){
            prevBtn.classList.remove('actualPagination')
            currentBtn.classList.add('actualPagination')
        }  
        }
       
        let resToShowPerPage = 15;
        let botones = [];
        
        //Esta funcion me crealos botones necesarios segun la cantidad de resultados a mostrar
        //Recibe como argumento la cantidad de resultados que se encontraron
        function hacerBotones(c){
            let pages = Math.ceil(c/resToShowPerPage);
            let classBtn;
            for(let i=1; i<=pages; i++){
                //Asigna la clase activa al primer boton y al resto no
                if(i === 1) {
                    classBtn = 'actualPagination'
                }else{
                    classBtn = ''
                } 
                // llena el array de botones para luego ser mostrados en el fondo de la pagina              
                botones.push(<button key={`btnPag_${i}`} className={classBtn} id={`btnPag_${i}`} value={i} onClick={(e) => {handleHistorialPag(e); handleClickOffset(e);}}>{i}</button>)
            }
        }       
       
      
        let count = 0; //Almacena la cantidad de games cuando no se utiliza ningun criterio de busqueda y/o filtrado
        let countGeneros = 0; //Almacena cant de games al filtrar por genero 
        let countApi = 0; //Almacena cant de games al filtrar por Existentes
        let countDb = 0; //Almacena cant de games al filtrar por agrregados por el usuario
        let countSearch = props.videoGamesSearch.length; //Almacena cant games al reallizar search

 /**********************FIN PAGINACION******************************* */

//Mientras la pagina se este cargando va a renderizar el componente Loading
    if(pageState === 'loading'){
        return (
            <div>{<Loading /> }</div>
        )
    }
    
//una vez que se llenaron los estados con la data traida de la api y/o DB renderiza el componente Home    
        else{
    
        return(
            <div id='homeContainer'>
                <h1 className="pageTitle">HOME</h1>  
                    <div id="searchBar">
                        <input
                            type="text"
                            className='form-control'
                            id="search"
                            name='inputSearch'
                            autoComplete="off"
                            value={result}
                            placeholder='Search By Name'
                            onChange={(e) => {
                                handleChange(e)
                                setPaginationOffset(0)
                                let historial = historialPag;  
                                setHistorialPag({...historial, prev:1, actual:1})
                            }}
                        />
                        <input type="button" 
                            onClick={() => {
                            props.cleanVideosDB();
                            handleClickSearch();
                            setGeneroSearch('seleccionar')
                            setAlfSearch('seleccionar')
                            }}
                        />
                        
                    </div>

                    <div id='divSelects'>              

                    <select 
                        onChange={(e) => {
                        let historial = historialPag;    
                        setHistorialPag({...historial, prev:1, actual:1});  
                        handleChangeSelect(e)
                        setPaginationOffset(0)
                        setPageState('loading')
                        }} 
                        value={generoSearch} className='form-control'>
                            <option value='seleccionar'>Filter by:</option>
                            <optgroup label='Genres'>
                                {generosOptionsToList}
                            </optgroup>
                            <optgroup label='Origen'>
                                <option value='api'>Existentes</option>
                                <option value='db'>Añadidos por ti</option>
                            </optgroup>
                    </select>

        

                    <select onChange={(e) =>{ 
                        handleChangeAlf(e); 
                        setPaginationOffset(0)
                        let historial = historialPag;    
                        //reseteo las propiedades PREV y ACTUAL del ESTADO
                        setHistorialPag({...historial, prev:1, actual:1});                
                        }} 
                        value={alfSearch}  className='form-control select'>
                            <option value='seleccionar'>Order by:</option>                
                            <option value='alf_asc'>Alphabethic (asc)</option>
                            <option value='alf_desc'>Alphabethic (desc)</option>
                            <option value='rat_desc'>Rating (highest first)</option>
                            <option value='rat_asc'>Rating (lowest first)</option>
                        
                    </select>

                    </div>

                    <div className='btnAddGame' onClick={() => handleShowAddGame()}> + ADD GAME </div>
                <div id='games-container'>
        
                {
                s.map(vg => {
                if(!vg.mensaje){
                    // let nameToLower = vg.name.toLowerCase();
                    // let resultToLower = result.toLowerCase();
                        if(generoSearch !== 'seleccionar'){
                        //FILTRO POR GENERO
                            if(generoSearch !== 'api' && generoSearch !== 'db' && JSON.stringify(vg.generos).includes(generoSearch) === true){ ///*&& nameToLower.includes(resultToLower)*/ 
                                countGeneros++;
                                    if(countGeneros > paginationOffset && countGeneros <= (paginationOffset+resToShowPerPage)){
                                        return <div key={vg.id}>
                                                    <Games getGameDetails={getGameDetails} game={vg} />
                                                </div>
                                    }
                            }
                                    countSearch = 0;                     
                        //FILTRO POR ORIGEN: API                
                        if(generoSearch === 'api'){
                            if(vg.origen === 'api'){ ///*nameToLower.includes(resultToLower) && */
                                countApi++;
                                    if(countApi > paginationOffset && countApi <= (paginationOffset+resToShowPerPage)){
                                        return <div  key={vg.id}>
                                                    <Games getGameDetails={getGameDetails} game={vg} />
                                                </div>
                                    }
                            }
                        //FILTRO POR ORIGEN: DB     
                        }else if(generoSearch === 'db'){
                            if(vg.origen === 'db'){  /*nameToLower.includes(resultToLower) && */
                                countDb++;
                                    if(countDb > paginationOffset && countDb <= (paginationOffset+resToShowPerPage)){
                                        return <div key={vg.id}>
                                                    <Games getGameDetails={getGameDetails} game={vg} />
                                            </div>
                                    }
                            }
                        }
                    
                        // si NO HAY FILTROS SELECCIONADOS                    
                        }else{
                            //if(nameToLower.includes(resultToLower)){//y el criterio de busqueda coincide con algun registro
                            count++;
                                    if(count > paginationOffset && count <= (paginationOffset+resToShowPerPage)){
                                        return <div key={vg.id}>
                                                    <Games getGameDetails={getGameDetails} game={vg} />
                                                </div>
                                    }                            
                            //}
                        }
                    }
                    /*Si el criterio de BUSQUEDA no arroja ningun resultado*/
                    else{
                        return (<div className='div_no_results'>{vg.mensaje}</div>)
                    }
                    
                })
            }
            
            {count === 0 && countGeneros === 0 && countApi === 0 && countDb === 0 && countSearch === 0 ? <div className='div_no_results'><span>...mmm...I didn't find any result with this filter criteria. Please try with another filter... </span></div> : null} 
            </div>
            {count !== 0 ? hacerBotones(count) : null}
            {countGeneros !== 0 ? hacerBotones(countGeneros) : null}
            {countApi !== 0 ? hacerBotones(countApi) : null}
            {countDb !== 0 ? hacerBotones(countDb) : null}
            {(botones.length>0) ? <span>{botones}</span>  : null }

            
            <div id="myModalForm" className="modal">    
                <div className="modal-content">
                    <span className="close">&times;</span>
                        <AddGameModal />
                </div>
            </div>

        </div>
            
        )
    }
}

const mapStateToProps = state => ({
    videoGames: state.videoGames,
    videoGameDetails: state.videoGameDetails,
    genres: state.genres,
    videoGamesSearch: state.videoGamesSearch,
    gameAdded: state.gameAdded
})


const mapDispatchToProps = dispatch => ({
    getVideosDB: () => dispatch(getVideosDB()),
    getVideosSearch: (search) => dispatch(getVideosSearch(search)),
    cleanVideosSearch: () => dispatch(cleanVideosSearch()),
    cleanGameDetails: () => dispatch(cleanGameDetails()),
    cleanVideosDB: () => dispatch(cleanVideosDB())
})


export default connect(mapStateToProps, mapDispatchToProps)(Home)