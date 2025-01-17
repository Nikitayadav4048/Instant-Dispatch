
import Footer from './Components/homecomponent/Footer';

import CustomerNav from './Components/NavbarComponents/CustomerNav';
import Fastservice from './Components/servicecomponent/Fastservice';
import Mainservice from './Components/servicecomponent/Mainservice';
import Tryus from './Components/servicecomponent/Tryus';



const Servicespage = () => {
  return (
    <div>
        <CustomerNav/>
    <Mainservice/>
    <Tryus/>
    <Fastservice/>
      <Footer/>
    </div>
  )
}
export default Servicespage; 