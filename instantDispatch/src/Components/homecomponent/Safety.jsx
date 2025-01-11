
import './safety.css' 
import safe from '../../assets/safety2.png'

const Safety = () => {
  return (
    <div> 
       <div className="safety flex flex-wrap md:flex-wrap lg:flex-nowrap justify-center">
           <div className="safety-img ">
              <img src={safe} alt="" className='safe-img' />
           </div>
           <div className="safety-text">
               <h1 className='safe-head p-4 text-4xl'>Safety For All</h1>
                <p className='safe-par pl-4 text-lg'>At Instant Dispatch, safety is our top priority. We adhere to strict protocols to ensure the secure handling
                     and delivery of all parcels. Our team is trained to follow the highest standards of safety, including sanitized and 
                     contactless delivery options. We also offer comprehensive insurance coverage for peace of mind. Your trust and security are paramount to us,
                      and we are committed to providing a safe and reliable service for everyone.</p>

                      <button className='safe-btn font-bold'>Know more</button>
           </div>
       </div>
    </div>
  )
}
export default Safety