import React from 'react'
import Mainservice from './Components/servicecomponent/mainservice'
import Navbar from './Components/homecomponent/Navbar'
import Footer from './Components/homecomponent/footer'
import Tryus from './Components/servicecomponent/Tryus'
import Fastservice from './Components/servicecomponent/Fastservice'
// import Howdeliverywork from './Components/servicecomponent/Howdeliverywork'
// import Cards from './Components/servicecomponent/Cards'

const Servicespage = () => {
  return (
    <div>
        <Navbar/>
        <Mainservice />
        {/* <Howdeliverywork /> */}
        <Tryus />
        {/* <Fastservice /> */}
        <Footer />
    </div>
  )
}
export default Servicespage 