import step1 from '../../assets/booking.png';
import step2 from '../../assets/protection.png'
import step3 from '../../assets/delivery.png'
import "./process.css"

const Process = () => {
  return (
    <>
      
    <div className="process flex flex-col justify-center items-center mt-32 gap-10">
     <h1 className='text-4xl'>How it works</h1>
     <div className="steps flex flex-wrap justify-center gap-28">
         <div className="step flex flex-col  justify-center items-center gap-3 p-6">
          <div className="img-box bg-blue-50">
          <img src={step1} alt="" className='h-28 w-28  p-10 step-img'/>
          </div>
            <p className='text-3xl '>Book a Rider</p>
           
           <p className='w-60 text-lg'>Start by our booking page and 
           filling out the necessary details.</p>           
         </div>
         <div className="step flex flex-col justify-center items-center gap-3 p-6">
         <div className="img-box bg-blue-50">
          <img src={step2} alt="" className='h-28 w-28  p-10 step-img'/>
          </div>
         <p className='text-3xl'>Parcel with us</p>
         <p  className='w-60 text-lg'>Your parcel is securely packed and
              collected from  pickup point.
              </p>
             </div>
             <div className="step flex flex-col justify-center items-center gap-3 p-6">
             <div className="img-box bg-blue-50">
          <img src={step3} alt="" className='h-28 w-28  p-10 step-img'/>
          </div>
             <p className='text-3xl'>Delivery</p>
             <p  className='w-60 text-lg'>Our riders are committed to 
                 delivering your parcel on time</p>
 
             </div>
     </div>
    </div>
 
     </>
  )
}
export default Process
