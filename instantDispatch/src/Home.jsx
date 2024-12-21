import Navbar from "./Components/homecomponent/Navbar";
import Business from "./Components/homecomponent/Business";
import Chooseus from "./Components/homecomponent/Chooseus";
import Maincontainer from "./Components/homecomponent/Maincontainer";


import Opitions from "./Components/homecomponent/Opitions";
import Safety from "./Components/homecomponent/Safety";
import Footer from "./Components/homecomponent/footer";


const Home = () => {
  return (
    <div>
      <Navbar/> 
      <Maincontainer />
      <Chooseus />
       <Opitions />
       <Safety />
      <Business />
      <Footer />

      
   
    </div>
  )
}

export default Home;
