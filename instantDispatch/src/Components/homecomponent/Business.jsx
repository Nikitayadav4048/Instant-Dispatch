
import './Business.css'
import business from '../../assets/business.png'
 const Business = () => {
  return (
    <div>
         <div className="business flex mt-14">
            <div className="business-text">
                 <h1 className='busniess-head p-4 text-4xl mt-8'>Business Solution</h1>
                 <p className='busniess-par pl-7 text-lg mt-8'>At Instant Dispatch, we understand that efficient and reliable delivery is crucial for your business success.
                     Our comprehensive business solutions are designed to meet the unique needs of companies of all sizes. 
                     Whether you are a small startup or a large enterprise, our services are tailored to ensure seamless and timely deliveries. 
                    </p>

                    <button className='bus-btn'>Know more</button>
            </div>
            <div className="business-img">
               <img src={business} alt="" className='bus-img' />
            </div>
         </div>
    </div>
  )
}
export default Business