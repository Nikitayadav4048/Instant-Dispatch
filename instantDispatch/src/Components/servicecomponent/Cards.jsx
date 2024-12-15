import React from 'react'
import './cards.css'

 const Cards = () => {
  return (
    <div>
      <div className="service-cards flex">
                  {/* 1 */}
                     <div className="card1">
                           <div >
                                 <img src= {card1} alt=""  className="card-img1"/>
                           </div>
                           <div className="card-par">
                           <h1 className='text-4xl head text-center justify-center'>Swift Biker</h1>
                           <p className='text-lg par pr-5 pl-5'>Quick and efficient city deliveries for small parcels and documents.
                               Our bike couriers navigate traffic with ease for timely service.</p>
                           </div>
                     </div>
                     {/* 2 */}
                     <div className="card2">
                     <div >
                     <img src={card2} alt="" className="card-img2" /> 
                       </div>
                       <div className="card-par">
                          <h1 className='text-4xl head text-center justify-center'>Motocycle Rider</h1>
                              <p className='text-lg par pr-5 pl-5'>Eco-friendly and cost-effective for lightweight packages and short distances, 
                                  combining speed and sustainability.</p>
                              </div>
                     </div>
                     {/* 3 */}
                     <div className="card3">
                     <div >
                     <img src={card3} alt="" className="card-img3" />
                       </div>
                       <div className="card-par ">
                          <h1 className='text-4xl head text-center justify-center'>Pickup Driver</h1>
                              <p className='text-lg par pr-5 pl-5' >Ideal for larger items and multiple parcels.
                                   Our small trucks ensure secure and efficient transport for safe and timely deliveries.</p>
                      </div>
                     </div>
               </div>
      
              
    </div>
  )
}
export default Cards 