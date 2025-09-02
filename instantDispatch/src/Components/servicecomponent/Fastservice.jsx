
import './fastservice.css'
import fast from '../../assets/fast.gif'
 const Fastservice = () => {
  return (
    <div>
           {/* <div className="fastservice flex lg:flex-nowrap md:flex-wrap flex-wrap lg:justify-normal md:justify-center justify-center ">
            <div className="fast-text ">
                <h1 className='text-4xl'>Do You Want Fast Service? Just Book Your Rider!</h1>
                <p className='text-lg'>Experience the speed and efficiency of Instant Dispatch! Whether you need a quick bike delivery,
                     eco-friendly bicycle service, or a secure small truck delivery, booking your rider has never been easier.
                     With just a few clicks, you can arrange for a prompt and reliable delivery. 
                    Try us now and see how we make your logistics effortless!</p>

                    <button className='safe-btn font-bold '>Try Us</button>
            </div>
               <div className="fast-img flex justify-center">
                    <img src={fast} alt=""  className='fastimg'/>
               </div>
           </div> */}

           <div className="business flex mt-14 flex-wrap lg:flex-nowrap justify-center">
                       <div className="business-text">
                            <h1 className='busniess-head p-4 text-4xl mt-32'>Business Solution</h1>
                            <p className='busniess-par pl-7 text-lg '>At Instant Dispatch,
                              we understand that efficient and reliable delivery is crucial for your business success.
                                Our comprehensive business solutions are designed to meet the unique needs of companies of all sizes. 
                                Whether you are a small startup or a large enterprise, our services are tailored
                                 to ensure seamless and timely deliveries. 
                               </p>
           
                               <button className='bus-btn font-bold'>Try Us</button>
                       </div>
                       <div className="business-img">
                          <img src={fast} alt="" className='bus-img' />
                       </div>
                    </div>
    </div>
  )
}
export default Fastservice ;