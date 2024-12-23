import "./booking.css"
import sec2img from '../../assets/bookform2.png';

const Booking = () => {
  return (
    <>
    <div className="flex flex-col items-center justify-center section1 ">
 <h1 className=" mb-4 section1-heading ">Book now</h1>
 <p className="text-center section1-p ">
Start booking your rider now
   
 </p>
</div>

<div className="section2 ">
   <div className="section2-div1  py-20 ">
   <h1 className="mb-10 text-4xl section2-heading "> Book now </h1>
   <p className="text-lg section2-p"> Booking a delivery with
      Instant Dispatch is simple, efficient, and designed to
       meet your specific needs. Whether you are sending a small
        parcel or a large shipment, our booking process ensures
         a seamless experience Our services are designed to ensure
          your parcels are delivered safely and on time, every time
          : Our dedicated support team is available to assist you
           with any queries or concerns you may have throughout the
            booking process.</p>
   </div>
         <div>
         <img src={sec2img} alt="" className="sec2-img py-10" />
         </div>
</div>

   </>
  )
}

export default Booking;
