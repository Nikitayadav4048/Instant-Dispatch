
import Form from "./Components/bookingcomponent/BookForm"
import Process from "./Components/bookingcomponent/Process"
import Footer from "./Components/homecomponent/Footer"
import Navbar from "./Components/NavbarComponent/Navbar"
import BookForm from "./Components/bookingcomponent/BookForm"


function Book() {
  return (
    <>
      <Navbar/>
     <Booking /> 
      <Process/>
      <Form/>
    <BookForm/>
      <Footer/>
    </>
  )
}

export default Book
