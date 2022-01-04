import { Link} from 'react-router-dom'
import { useState } from 'react';
import './Navbar.css'


export default function Navbar(){
  const [menu, setMenu] = useState({active:'home'});

  function handleClickMenu(e,value){
    //e.preventDefault();
    setMenu({active: value})
  }

  let claseHome;
  let claseAddGame;

  switch(menu.active){
      case 'home':
      claseHome = 'active';
      claseAddGame = 'pasive';
      break;
      case 'addGame':
      claseHome = 'pasive';
      claseAddGame = 'active';
      break;
      default:
      claseHome = 'active';
      claseAddGame = 'pasive';
  }
    
  return(
      <div className="topnav">
          <Link className={claseHome} to='home' onClick={(e) =>{ handleClickMenu(e,'home')}}>HOME</Link>
          <Link className={claseAddGame} to='addGame' onClick={(e) =>{ handleClickMenu(e,'addGame')}}>ADD GAME</Link>
          <div className="topnav-right">
          The All Time Video Games Collection
          </div>  
      </div>
  )
}