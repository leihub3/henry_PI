import { Link } from 'react-router-dom'
import './Navbar.css'


export default function Navbar(){

    // const [result, setResult] = useState("Probando");
    //console.log("hola result: ", result)

    // function handleChange(event) {
    //     setResult(event.target.value);
    //   }
    
    return(
        <div class="topnav">
            <Link className='active' to='/home'>Home</Link>
            <Link to='/addGame'>ADD</Link>
  {/* <a className="active" href="/home">Home</a> */}
  {/* <a href="/addGame">ADD</a> */}
  <div className="topnav-right">


    {/* <a href="#search">Search</a> */}
    {/* <a href="#about">About</a> */}
  </div>
</div>
    )
}