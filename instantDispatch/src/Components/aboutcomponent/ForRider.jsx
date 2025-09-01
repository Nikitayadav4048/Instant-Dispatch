import custimg from '../../assets/rider2.png';
import "./forcustomer.css";
const ForRider = () => {
  return (
    <>
    {/* <div className="section3 flex flex-wrap justify-center gap-40 my-40 ">
      <div className="section3-part1">
      <img src={custimg} alt="" className='sec3-img rider-img '/>
      </div>
     <div className="section3-part2 w-96 flex flex-col justify-center px-4 md:px-0 lg:px-0">
     <h2 className='section3-heading mb-9'>FOR RIDER</h2>
       <p className='section3-p text-lg mb-9'> Our riders are the backbone of our service.
         We provide our riders with the tools and support they need to deliver top-notch 
         service while ensuring their safety and satisfaction. We prioritize your safety with thorough safety protocols and support systems.
         </p>
            <button className='section3-button'>Start earning</button>
     </div>
    </div> */}

     <div className="business flex mt-14 flex-wrap lg:flex-nowrap justify-center">
                    <div className="business-img pl-10">
                       <img src={custimg} alt="" className='bus-img' />
                    </div>
                    <div className="business-text">
                         <h1 className='busniess-head p-4 text-4xl mt-32'>FOR RIDER</h1>
                         <p className='busniess-par pl-8 text-lg '>Our riders are the backbone of our service.
         We provide our riders with the tools and support they need to deliver top-notch 
         service while ensuring their safety and satisfaction. We prioritize your safety with thorough safety protocols and support systems. 
                            </p>
        
                            <button className='bus-btn font-bold'>Start earning</button>
                    </div>
                 </div>
</>
  )
}

export default ForRider
