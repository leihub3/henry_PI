import './NotFound.css'
export default function NotFound(){
    return(
        <div id='notfoundContainer'>
            <div id='divImg'></div>
            <div id='message'>
                <h1>404</h1>
            <p>Sorry...page not found</p>
            <button onClick={() => window.location='/videogames/home'}>Go Home... </button>
            </div>
            
        </div>
    )
}