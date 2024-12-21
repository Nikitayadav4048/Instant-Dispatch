
import Footer from './Components/homecomponent/footer';
import Navbar from './Components/homecomponent/Navbar'
import Fastservice from './Components/servicecomponent/Fastservice';
import Mainservice from './Components/servicecomponent/Mainservice';
import Tryus from './Components/servicecomponent/Tryus';



const Servicespage = () => {
  return (
    <div>
        <Navbar/>
    <Mainservice/>
    <Fastservice/>
      <Tryus/>
      <Footer/>
    </div>
  )
}
export default Servicespage; 