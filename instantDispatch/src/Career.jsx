import CareerForm from "./Components/careercomponent/CareerForm"
import Careerus from "./Components/careercomponent/Careerus"
import Howto from "./Components/careercomponent/Howto"
import Footer from "./Components/homecomponent/Footer"

import CustomerNav from "./Components/NavbarComponents/CustomerNav"



const Career = () => {
  return (
    <>
    

    <CustomerNav/>
   <Careerus/>
    <Howto/>
      <CareerForm/>
      <Footer/>
    </>
  )
}

export default Career
