import "./Navbar.css"
import logo from '../../assets/logo-final.png';

const Navbar = () => {
  return (
    <div>
      <div className="main-div">
     
     
        <div className="container" >
       
        <img src={logo} alt="logo"  className = "nav-logo nav-brand"/>
          <a href="home.jsx" className = "nav-item text-black">Home</a>
          <a href="" className = "nav-item text-black">About us</a>
          <a href="" className = "nav-item text-black">Services</a>
         
        <button className = "login-img">Log in</button>
           
        </div>
      </div>
    </div>
  )
}

export default Navbar
