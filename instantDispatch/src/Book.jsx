import Booking from "./Components/bookingcomponent/Booking"
import Form from "./Components/bookingcomponent/Form"
import Process from "./Components/bookingcomponent/Process"
import Footer from "./Components/homecomponent/Footer"
import Navbar from "./Components/homecomponent/Navbar"


function Book() {
  return (
    <>
      <Navbar/>
      <Booking/>
      <Process/>
      <Form/>
      <Footer/>
    </>
  )
}

export default Book
