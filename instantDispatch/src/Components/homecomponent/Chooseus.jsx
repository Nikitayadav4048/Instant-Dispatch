import React from 'react'
import chooseimg from '../../assets/chooseus.png'
import './chooseus.css'
 const Chooseus =() => {
  return (
    <>
      <div className="choose-us flex">
        <div className="choose-text pt-10">
             <h1 className=' head-choose text-4xl'>Why Choose Us</h1>
             <p className='par-choose pt-4 pl-7 text-lg'>At Instant Dispatch, we prioritize your trust with our secure couriers and real-time tracking, 
                ensuring safe deliveries every time. Our comprehensive insurance coverage provides peace of mind, 
                while our 24/7 support guarantees we're always here for you. Choose us for reliable, sanitized, and efficient delivery services.</p>
                
                <button className='bus-btn font-bold'>Know more</button>
       </div> 
        <div className="choose-img">
             <img src={chooseimg} alt="Image" className='h-96 pr-'/>
        </div>
      </div>
    </>
  )
}

export default Chooseus 