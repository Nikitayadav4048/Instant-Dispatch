import React from 'react'
import './tryus.css' 
import Try from '../../assets/tryus.png'
 
 const Tryus = () => {
  return (
    <div>
        <div className="try-us flex">
            <div className="try-img">
                <img src={Try} alt="" className='tryus' />
            </div>
            <div className="trytext pt-8">
                  <h1 className='text-4xl pl-20'>
                  Try Us and See How Good Our Services Are
                  </h1>
                  <p className='text-lg pl-24 pr-32 pt-14 '>
                  At Instant Dispatch, we pride ourselves on delivering exceptional service.
                   Whether it's a small package or a large shipment, our dedicated team ensures your delivery reaches its destination safely and on time.
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