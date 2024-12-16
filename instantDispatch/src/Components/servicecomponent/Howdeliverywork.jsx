
import './howdeliverywork.css'
import { SlBasket } from "react-icons/sl";

const Howdeliverywork = () => {
  return (
    <div>
      <div className="service-sec5  ">
        <div className="head text-center justify-center">
                <h1 className='text-4xl'>How Delivery Works</h1>
                <p className='p-6 text-lg'>At Instant Dispatch, we have streamlined our delivery process to ensure it is as efficient and reliable as possible. 
                    The journey begins when a customer places an order through our user-friendly website or mobile app, providing all necessary details</p>
                    </div>
               <div className="aboutwork flex">
                   <div className="OrderPlacement box-width">
                        <div className="orderimg">

                        </div>
                        <div className="ordertext">
                          <div >

                        <SlBasket className='icon ' />
                          </div>
                            <h1 className='text-2xl'>Order Placement</h1>
                            <p className='text-sm pt-5'>Customers place their delivery requests via our website,
                                 providing all necessary details for the delivery.</p>
                        </div>
                   </div>
                   <div className="PackagePickup box-width">
                          <div className="packageimg">

                        </div>
                        <div className="packagetext">
                            <h1 className='text-2xl'>Package Pickup</h1>
                            <p className='text-sm pt-5'> Our professional couriers promptly arrive at the specified location to pick up the package, 
                                using the appropriate mode of transportation—bike, bicycle, or small truck—based on the package size and urgency.</p>
                        </div>
                   </div>
                   <div className="OrderDelivered box-width">
                   <div className="deliveryimg">

                        </div>
                        <div className="deliverytext">
                             <h1 className='text-2xl'>Order Delivered</h1>
                             <p className='text-sm pt-5'>Upon reaching the destination, our couriers ensure the package is delivered safely to the recipient.
                                 The recipient then confirms receipt of the package.Upon reaching the destination, our couriers ensure the package is delivered safely to the recipient.
                                  The recipient then confirms receipt of the package.</p>
                        </div>
                   </div>
                   <div className="DeliveryConfirmation box-width">
                   <div className="conformationimg">

                     </div>
                   <div className="conformationtext">
                      <h1 className='text-2xl'>Confirmation</h1>
                      <p className='text-sm pt-5'>Once the delivery is confirmed, customers receive a notification confirming the successful delivery. 
                        This confirmation provides assurance that the package has reached its intended destination.</p>
                   </div>
                   </div>
               </div>
          </div>
    </div>
  )
}
export default Howdeliverywork 