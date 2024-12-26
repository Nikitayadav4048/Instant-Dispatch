import Navbar from "./Components/homecomponent/Navbar";
import Business from "./Components/homecomponent/Business";
import Chooseus from "./Components/homecomponent/Chooseus";
import Maincontainer from "./Components/homecomponent/Maincontainer";
import Safety from "./Components/homecomponent/Safety";
import Footer from "./Components/homecomponent/Footer";
import Process from "./Components/homecomponent/Process";


const Home = () => {
  return (
    <div>
      <Navbar/> 
      <Maincontainer />
      <Chooseus />
       <Process/>
       <Safety />
      <Business />
      <Footer />

      
   
    </div>
  )
}

export default Home;
