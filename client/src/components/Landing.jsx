import { Link } from "react-router-dom"

export default function Landing(){
    return(
        <div>
            <h1>Landing Page...</h1>
            <Link to='/home' >  <button>Enter to the site</button> </Link>
           
        </div>
    )
}