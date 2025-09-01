import custimg from '../../assets/customer.png';
import "./forcustomer.css";
const ForCustomer = () => {
  return (
    <>
        {/* <div className="section3 flex  flex-wrap justify-center gap-40 my-40 ">
          <div className="section3-part1">
          <img src={custimg} alt="" className='sec3-img  cust-img'/>
          </div>
         <div className="section3-part2 w-96 flex flex-col justify-center  px-4 md:px-0 lg:px-0">
         <h2 className='section3-heading mb-9'>FOR CUSTOMERS</h2>
           <p className='section3-p text-lg mb-9'> We understand that our customers value speed,
             reliability, and convenience. Our service is designed to provide
              you with the most efficient dispatch solutions, ensuring your 
              needs are met promptly. Whether you’re ordering groceries, essential
               items, or just need something picked up quickly, we are here to make
                your life easier.</p>
                <button className='section3-button'>Book now</button>
         </div>
        </div> */}

        <div className="business flex mt-14 flex-wrap lg:flex-nowrap justify-center">
                            <div className="business-img pl-10">
                               <img src={custimg} alt="" className='bus-img cust-img' />
                            </div>
                            <div className="business-text">
                                 <h1 className='busniess-head p-4 text-4xl mt-32'>FOR CUSTOMERS</h1>
                                 <p className='busniess-par pl-8 text-lg '>We understand that our customers value speed,
             reliability, and convenience. Our service is designed to provide
              you with the most efficient dispatch solutions, ensuring your 
              needs are met promptly. Whether you’re ordering groceries, essential
               items, or just need something picked up quickly, we are here to make
                your life easier. 
                                    </p>
                
                                    <button className='bus-btn font-bold'>Book now</button>
                            </div>
                         </div>
    </>
  )
}

export default ForCustomer
