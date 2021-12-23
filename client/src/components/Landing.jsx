import { Link } from "react-router-dom"
import './Landing.css'
export default function Landing(){
    return(
        <div id="container">
            <h1 id="h1Landing">The All Time's Video Games Collection</h1>
            <Link to='/videogames/home' >  <button id="btnLanding"><span>Enter Site</span></button> </Link>
        </div>
    )
}