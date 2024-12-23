
import './tryus.css' 
import Try from '../../assets/tryus.png'
 
 const Tryus = () => {
  return (
    <div>
        <div className="try-us flex md:flex-wrap lg:flex-nowrap flex-wrap items-center">
            <div className="try-img w-full md:w-1/2 lg:w-1/2">
                <img src={Try} alt="" className='tryus ' />
            </div>
            <div className="trytext pt-8">
                  <h1 className='text-4xl  lg:pl-20 md:pl-20 pl-3'>
                  Try Us and See How Good Our Services Are
                  </h1>
                  <p className='text-lg   lg:pr-32 md:pr-32 pr-3 pt-14  lg:pl-20 md:pl-20 pl-3'>
                  At Instant Dispatch, we pride ourselves on delivering exceptional service.
                   Whether its a small package or a large shipment, our dedicated team ensures your delivery reaches its destination safely and on time.
                    Experience the difference with our reliable, efficient, and customer-focused approach.
                   Give us a try and see for yourself how we exceed expectations every step of the way!
                  </p>
                  <button className='safe-btn font-bold'>Book </button>
            </div>
        </div>
    </div>
  )
}
export default Tryus 