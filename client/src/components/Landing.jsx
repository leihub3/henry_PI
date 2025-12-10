import { Link } from "react-router-dom"
import { useEffect } from "react"
import './Landing.css'

export default function Landing(){
    useEffect(() => {
        // Disable scrolling on body when landing page is mounted
        document.body.style.overflow = 'hidden';
        
        // Re-enable scrolling when component unmounts
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return(
        <div id="container">
            <h1 id="h1Landing">The All Time Video Games Collection</h1>
            <Link to='/videogames/home' >  <button id="btnLanding"><span>Enter Site</span></button> </Link>
        </div>
    )
}