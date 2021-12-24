import './NotFound.css'
export default function NotFound(){
    /**http://localhost:3000 */
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