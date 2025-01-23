import Booking from "./Components/bookingcomponent/Booking"
// import Form from "./Components/bookingcomponent/BookForm"
import Process from "./Components/bookingcomponent/Process"
import Footer from "./Components/homecomponent/Footer"

import BookForm from "./Components/bookingcomponent/BookForm"
import CustomerNav from "./Components/NavbarComponents/CustomerNav"
import Navbar from "./Components/NavbarComponents/Navbar"


function Book() {
  return (
    <>
      {/* <Navbar/> */}
      <Navbar/>
      <Booking/>
      <Process/>
      {/* <Form/> */}
    <BookForm/>
      <Footer/>
    </>
  )
}

export default Book
