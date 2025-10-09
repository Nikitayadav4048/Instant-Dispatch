import './main.css'
import image from '../../assets/hero-img.jpeg'
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { TbHours24 } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

const Maincontainer = () => {
  const navigate = useNavigate();
  
  const handleBookNow = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/book');
    } else {
      navigate('/login');
    }
  };
  
  return (
    <>
    <div className='main xl:flex-nowrap flex-wrap'>
    <div className="sec1 mt-24 ms-12">
    <p className='sec1-para1 mb-8'>Welcome to</p>
    <p className='sec1-h mb-9'>INSTANT DISPATCH</p>
    <p className='sec1-para2'>A courier or parcel dilievery Management system</p>

    <button onClick={handleBookNow} className='btn font-bold'>Book now</button>
    </div>
    <div className="sec2">
      <img src={image} alt="" className='fast-img w-full h-auto object-cover'/>
    </div>
    </div>
    

    <section  className='mt-20 section2 flex justify-center '>
          <div className="second-container flex  flex-wrap justify-center gap-7">
            <div className="boxes flex justify-center">
            <VscWorkspaceTrusted size={70}  className='icon-background' style={{ padding: '10px'}}/>
             <div className="trust-img">
              <h1>100 000+</h1>
                   <p>Trust and Reliability</p>
             </div>
            </div>

            <div className="boxes flex justify-center">
            <MdOutlineHealthAndSafety  size={80} style={{ padding: '10px'}}/>
             <div className="sefty">
             <h1>Safety</h1>
             <p>Sanitized Safe Deliveries</p>
             </div>
            </div>
            
             <div className="boxes flex justify-center">
             <TbHours24 size={80} style={{ padding: '10px'}}/>
             <div className="time-line">
             <h1>24/7</h1>
             <p>dedicated support team</p>
             </div>
             </div>
          </div>
    </section>


    </>
  )
}

export default Maincontainer
// import React from 'react';
// import './main.css';
// import image from '../../assets/hero-img.jpeg';
// import { VscWorkspaceTrusted } from "react-icons/vsc";
// import { MdOutlineHealthAndSafety } from "react-icons/md";
// import { TbHours24 } from "react-icons/tb";

// const Maincontainer = () => {
//   return (
//     <>
//       <div className="main flex flex-col md:flex-row items-center md:justify-between px-6 md:px-12 py-12">
//         <div className="sec1 mt-12 md:mt-0 md:ms-12 text-center md:text-left">
//           <p className="sec1-para1 mb-4 text-lg md:text-xl">Welcome to</p>
//           <p className="sec1-h mb-6 text-2xl md:text-4xl font-bold">INSTANT DISPATCH</p>
//           <p className="sec1-para2 mb-6 text-sm md:text-base">A courier or parcel delivery Management system</p>
//           <button className="btn bg-blue-500 text-white py-2 px-6 rounded-lg font-bold hover:bg-blue-600 transition duration-300">Book now</button>
//         </div>
//         <div className="sec2 mt-8 md:mt-0">
//           <img src={image} alt="Courier service" className="fast-img w-full max-w-md mx-auto md:mx-0 rounded-lg shadow-md" />
//         </div>
//       </div>

//       <section className="section2 mt-20">
//         <div className="second-container flex flex-col md:flex-row justify-center items-center gap-10 md:gap-7 px-6 md:px-12">
//           <div className="flex flex-col items-center text-center">
//             <VscWorkspaceTrusted size={70} className="icon-background mb-4" style={{ padding: '10px' }} />
//             <div className="trust-img">
//               <h1 className="text-xl font-bold">100 000+</h1>
//               <p className="text-sm">Trust and Reliability</p>
//             </div>
//           </div>
//           <div className="flex flex-col items-center text-center">
//             <MdOutlineHealthAndSafety size={80} className="mb-4" style={{ padding: '10px' }} />
//             <div className="sefty">
//               <h1 className="text-xl font-bold">Safety</h1>
//               <p className="text-sm">Sanitized Safe Deliveries</p>
//             </div>
//           </div>
//           <div className="flex flex-col items-center text-center">
//             <TbHours24 size={80} className="mb-4" style={{ padding: '10px' }} />
//             <div className="time-line">
//               <h1 className="text-xl font-bold">24/7</h1>
//               <p className="text-sm">Dedicated support team</p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Maincontainer;
