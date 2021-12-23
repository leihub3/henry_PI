export default function PruebaTest (){
  return (
    <div>
        <Link to = "/pokemon"> Crear Pokemon </Link>
        <h1> POKEMONNNNNNNNNNNNNN</h1>
      
        <button onClick = {e=>{handleClick(e)}}> 
        {/*  le paso el handle click que cunado click llama al handle y resete la pagina */}
          Volver a Cargar todo 
        </button>
        <div>
        {/* acá voy a hacer los filtros */}
          <select>
                 <option value="asc"> Ascendente </option>
                 <option value="desc"> Descentenrte </option>
          </select>
          <select>
                 <option value="asc"> Ascendente </option>
                 <option value="desc"> Descentenrte </option>
          </select>
    
        {/* <Card name></Card> */}
    
     {allPokemon?.allPokemon.map( (c) => {   //pregunta primero si existe y dsp lo mapea
        
        return (
             <fragment className="cartas">
                 <Link to={"/home/" + c.id}>
                     <Card name={c.name} image={el.img} tipo={el.tipo} key={c.id}/>
                 </Link>
             </fragment> )
        
    } )  
    }
    </div>
    </div> 
    )
  
  }

