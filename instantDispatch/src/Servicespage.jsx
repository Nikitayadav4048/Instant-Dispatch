
import Footer from './Components/homecomponent/Footer';
import Navbar from './Components/NavbarComponent/Navbar'
import Fastservice from './Components/servicecomponent/Fastservice';
import Mainservice from './Components/servicecomponent/Mainservice';
import Tryus from './Components/servicecomponent/Tryus';



const Servicespage = () => {
  return (
    <div>
        <Navbar/>
    <Mainservice/>
    <Tryus/>
    <Fastservice/>
      <Footer/>
    </div>
  )
}
export default Servicespage; 