import { connect } from 'react-redux'
import { getGameDetails, getVideosSearch, cleanVideosSearch, cleanGameDetails, cleanVideosDB } from "../redux/actions"
import Games from "./Games"
import { Loading } from "./Loading"
import './Home.css'
import { useState, useEffect } from 'react'

function Home (props){
    
    const [pageState, setPageState] = useState('loading');
    const [result, setResult] = useState("");
    const [generoSearch, setGeneroSearch] = useState("");
    const [alfSearch, setAlfSearch] = useState("");
    const [paginationOffset, setPaginationOffset] = useState(0);
    const [historialPag, setHistorialPag] = useState({prev:1, actual:1, historico:[1]});
    

    useEffect(() => { 
        props.cleanGameDetails()
        //console.log(props.videoGameDetails)
        }, [])

    useEffect(() => {
            setPageState('loaded')
        })       

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
    
    const generosOptionsToList = [];
    
        props.genres.map(g => {
            generosOptionsToList.push(<option key={g.id} value={g.nombre}>{g.nombre}</option>)//'<option value={g.name}>{g.name}</option>'
        })

        function handleClickSearch(){
            //alert(result)
            props.cleanVideosSearch()
            setResult('')
            setPaginationOffset(0)
            setPageState('loading')
            props.getVideosSearch(result)
            
        }

        /////////////ORDER BY
       
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

        // function SortArrayId(x, y){
        //     if (x.id > y.id) {return -1;}
        //     if (x.id < y.id) {return 1;}
        //     return 0;
        // }
        var a;
        //si Search tiene juegos los muestro, sino muestro los otros
        (props.videoGamesSearch.length>0) ? a = props.videoGamesSearch : a = props.videoGames

        //console.log(JSON.stringify(props.videoGamesSearch.name).includes('sorry'))
      
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

        //console.log(s)

        /******  PAGINATION */
        if(pageState === 'loaded'){
            if( document.getElementById('btnPag_'+historialPag.historico[historialPag.historico.length-1]) !== null &&
       historialPag.historico[historialPag.historico.length-1] !== 1){
            document.getElementById('btnPag_'+historialPag.historico[historialPag.historico.length-1]).classList.remove('actualPagination') 
        }
        let prev = historialPag.prev;
        let actual = historialPag.actual;    

        if(document.getElementById('btnPag_'+prev) !== null && document.getElementById('btnPag_'+actual) !== null ){
            document.getElementById('btnPag_'+prev).classList.remove('actualPagination')
            document.getElementById('btnPag_'+actual).classList.add('actualPagination')
        }  
        }
       
        let resToShowPerPage = 15;
        let botones = [];
        function hacerBotones(c){
            let pages = Math.ceil(c/resToShowPerPage);
            let classBtn;
            for(let i=1; i<=pages; i++){
                if(i === 1) {
                    classBtn = 'actualPagination'
                }else{
                    classBtn = ''
                } 
                              
                botones.push(<button key={`btnPag_${i}`} className={classBtn} id={`btnPag_${i}`} value={i} onClick={(e) => {handleHistorialPag(e); handleClickOffset(e);}}>{i}</button>)
            }
        }
        
      
        let count = 0;
        let countGeneros = 0;
        let countApi = 0;
        let countDb = 0;
        let countSearch = props.videoGamesSearch.length;

        

               
    if(pageState === 'loading'){
        return (
            <div>{<Loading /> }</div>
        )
    }else{

   
    return(
        <div id='homeContainer'>
            <h1 className="title">HOME</h1>  
            
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
                    }}/>
                </div>
                

            <select 
                onChange={(e) => {
                let historial = historialPag;    
                setHistorialPag({...historial, prev:1, actual:1});  
                handleChangeSelect(e)
                setPaginationOffset(0)
                setPageState('loading')
                }} value={generoSearch} className='form-control'>
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
                setHistorialPag({...historial, prev:1, actual:1});                
                }} value={alfSearch}  className='form-control select'>
                <option value='seleccionar'>Order by:</option>                
                <option value='alf_asc'>Alphabethic (asc)</option>
                <option value='alf_desc'>Alphabethic (desc)</option>
                <option value='rat_desc'>Rating (highest first)</option>
                <option value='rat_asc'>Rating (lowest first)</option>
                
            </select>
            <div id='games-container'>
          
            {
                s.map(vg => {
                   if(!vg.mensaje){
                    // let nameToLower = vg.name.toLowerCase();
                    // let resultToLower = result.toLowerCase();
                    if(generoSearch !== 'seleccionar'){
                        //console.log('no deberia pero estoy aca linea 267')
                            if(generoSearch !== 'api' && generoSearch !== 'db' /*&& nameToLower.includes(resultToLower)*/ && JSON.stringify(vg.generos).includes(generoSearch) === true){
                                countGeneros++;
                                if(countGeneros > paginationOffset && countGeneros <= (paginationOffset+resToShowPerPage)){
                                return <div key={vg.id}>
                                <Games getGameDetails={getGameDetails} game={vg} />
                                 </div>
                                }
                            }
                                countSearch = 0;
                         
                                    
                                    if(generoSearch === 'api'){
                                        if(/*nameToLower.includes(resultToLower) && */vg.origen === 'api'){
                                            countApi++;
                                            if(countApi > paginationOffset && countApi <= (paginationOffset+resToShowPerPage)){
                                            return <div  key={vg.id}>
                                <Games getGameDetails={getGameDetails} game={vg} />
                                 </div>
                                        }
                                    }
                                    }else if(generoSearch === 'db'){
                                        if(/*nameToLower.includes(resultToLower) && */vg.origen === 'db'){
                                            countDb++;
                                            if(countDb > paginationOffset && countDb <= (paginationOffset+resToShowPerPage)){
                                            return <div key={vg.id}>
                                <Games getGameDetails={getGameDetails} game={vg} />
                                 </div>
                                            }
                                        }
                                    }
                   
                                        
                    }else{ // si no hay seleccionado ningun genero
                        //console.log('Estoy aca sin genero select')
                        //if(nameToLower.includes(resultToLower)){//y el criterio de busqueda coincide con algun registro
                            count++;
                            //console.log(count)
                            if(count > paginationOffset && count <= (paginationOffset+resToShowPerPage)){
                                return <div key={vg.id}>
                <Games getGameDetails={getGameDetails} game={vg} />
                 </div>
                            }                            
                        //}
                    }
                    }else{
                        return (<div className='div_no_results'>{vg.mensaje}</div>)
                    }
                    
                })
            }
            {count === 0 && countGeneros === 0 && countApi === 0 && countDb === 0 && countSearch === 0 ? <div className='div_no_results'><span>...mmm...I didn't find any result here. Please try changing searching criteria... </span></div> : ''} 
            {/* <input id='btnSearch' type="button" onClick={() => handleClickSearch()}
                value='BY CLICKING HERE'/> */}
            {/* {console.log('soy count: ', count, countGeneros, countApi, countDb, countSearch)} */}
            </div>
            {count !== 0 ? hacerBotones(count) : ''}
            {countGeneros !== 0 ? hacerBotones(countGeneros) : ''}
            {countApi !== 0 ? hacerBotones(countApi) : ''}
            {countDb !== 0 ? hacerBotones(countDb) : ''}
            {(botones.length>0) ? <span>Page/s of results: {botones}</span>  : '' }
        </div>
    )
}
}

const mapStateToProps = state => ({
    videoGames: state.videoGames,
    videoGameDetails: state.videoGameDetails,
    genres: state.genres,
    videoGamesSearch: state.videoGamesSearch,
})


const mapDispatchToProps = dispatch => ({
    getVideosSearch: (search) => dispatch(getVideosSearch(search)),
    cleanVideosSearch: () => dispatch(cleanVideosSearch()),
    cleanGameDetails: () => dispatch(cleanGameDetails()),
    cleanVideosDB: () => dispatch(cleanVideosDB())
})


export default connect(mapStateToProps, mapDispatchToProps)(Home)