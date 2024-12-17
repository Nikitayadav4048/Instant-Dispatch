import custimg from '../../assets/customer.png';
import "./forcustomer.css";
const ForCustomer = () => {
  return (
    <>
        <div className="section3 flex  flex-wrap justify-center gap-40 my-40 ">
          <div className="section3-part1">
          <img src={custimg} alt="" className='sec3-img cust-img'/>
          </div>
         <div className="section3-part2 w-96 flex flex-col justify-center px-4 md:px-0 lg:px-0">
         <h2 className='section3-heading mb-9'>FOR CUSTOMERS</h2>
           <p className='section3-p text-lg mb-9'> We understand that our customers value speed,
             reliability, and convenience. Our service is designed to provide
              you with the most efficient dispatch solutions, ensuring your 
              needs are met promptly. Whether you’re ordering groceries, essential
               items, or just need something picked up quickly, we are here to make
                your life easier.</p>
                <button className='section3-button'>Book now</button>
         </div>
        </div>
    </>
  )
}

export default ForCustomer
