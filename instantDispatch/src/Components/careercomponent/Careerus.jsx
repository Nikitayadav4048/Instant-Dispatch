// import "./career.css"
// import sec2img from '../../assets/restaurant.png';

// const Careerus = () => {
//   return (
//      <>
//          <div className="flex flex-col items-center justify-center section1 md:mx-48 mx-14 ">
//       <h1 className=" mb-4 section1-heading ">Career</h1>
//       <p className="text-center section1-p ">
//       Join our dynamic team
        
//       </p>
//     </div>
    
//     {/* <div className="section2 ">
//         <div className="section2-div1  py-10 ">
//         <h1 className="mb-10 text-4xl section2-heading ">Join Our Team at Instant Dispatch </h1>
//         <p className="text-lg section2-p ps-7">We are seeking reliable and 
//           hardworking delivery drivers to join our team. At Instant Dispatch,
//             we are committed to providing exceptional delivery services,
//              and we know that our success is driven by our incredible team.
//               Join us and be part of an innovative and supportive workplace 
//               where your contributions make a real impact.</p>
//         </div>
//               <div>
//               <img src={sec2img} alt="" className="sec2-img py-10" />
//               </div>
//     </div> */}


//      <div className="section2  flex mt-14 flex-wrap lg:flex-nowrap justify-center">
//                 <div className="section2-div1">
//                      <h1 className='busniess-head p-4 text-4xl mt-32'>Join Our Team at Instant Dispatch</h1>
//                      <p className='busniess-par pl-7 text-lg '>We are seeking reliable and 
//           hardworking delivery drivers to join our team. At Instant Dispatch,
//             we are committed to providing exceptional delivery services,
//              and we know that our success is driven by our incredible team.
//               Join us and be part of an innovative and supportive workplace 
//               where your contributions make a real impact.
//                         </p>
    
//                         <button className='bus-btn font-bold'>Know more</button>
//                 </div>
//                 <div className="business-img">
//                    <img src={sec2img} alt="" className='bus-img' />
//                 </div>
//              </div>

   
    
//         </>
//   )
// }

// export default Careerus


import "./career.css";
import sec2img from '../../assets/restaurant.png';
import { useNavigate } from 'react-router-dom';

const Careerus = () => {
  const navigate = useNavigate();
  
  const handleKnowMore = () => {
    navigate('/career-form');
  };
  
  return (
    <>
      {/* Section 1: Hero */}
      <div className="flex flex-col items-center justify-center h-[500px] px-6 md:px-20 text-center bg-white">
        <h1 className="text-5xl md:text-6xl mb-6" style={{fontFamily: 'Poppins, sans-serif'}}>Career</h1>
        <p className="text-2xl md:text-3xl" style={{fontFamily: 'Nunito, sans-serif'}}>Join our dynamic team</p>
      </div>

      {/* Section 2: Career Info */}
      <div className="flex flex-wrap lg:flex-nowrap justify-center items-center bg-[#F8F5F3] px-6 md:px-20 py-20 gap-44">
        {/* Text Block */}
        <div className="max-w-xl">
          <h2 className="text-4xl mb-6" style={{fontFamily: 'Poppins, sans-serif'}}>Join Our Team at Instant Dispatch</h2>
          <p className="text-lg leading-relaxed mb-6" style={{fontFamily: 'Inter, sans-serif'}}>
            We are seeking reliable and hardworking delivery drivers to join our team. At Instant Dispatch,
            we are committed to providing exceptional delivery services, and we know that our success is
            driven by our incredible team. Join us and be part of an innovative and supportive workplace
            where your contributions make a real impact.
          </p>
          <button 
            onClick={handleKnowMore}
            className="bg-[#F8AD42] text-white px-6 py-3 rounded-md font-bold border-none cursor-pointer transition hover:bg-[#e69a3a]"
          >
            Know more
          </button>
        </div>

        {/* Image Block */}
        <div>
          <img
            src={sec2img}
            alt="Delivery Team"
            className="w-[400px] h-[300px] "
          />
        </div>
      </div>
    </>
  );
};

export default Careerus; 