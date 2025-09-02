// import "./aboutus.css" 
// import sec2img from '../../assets/section2.png';
// import ForCustomer from "./ForCustomer";
// import ForShopkeeper from "./ForShopkeeper";
// import ForRider from "./ForRider";


// const Aboutus = () => {
//   return (
//     <>
//     <div className="section1">
//   <h1 className="section1-heading"> About us </h1>
//   <p className="section1-p">
//   Swift, Reliable, Seamless and Innovative.
//   </p>
// </div>

// <div className="section2">
//     <div className="section2-div1">
//     <h1 className="section2-heading p-4 text-4xl mt-32"> Who we are </h1>
//     <p className="section2-p  pl-7 text-lg"> We are a dedicated
//         and passionate team committed to revolutionizing the 
//         dispatch industry. Our missionis to provide seamless,
//         reliable, and efficient dispatch services that meet
//         the diverse needs of our clients. We believe in leveraging
//         technology to streamline operations and enhance customer
//         satisfaction.</p>
//     </div>
//           <div>
//           <img src={sec2img} alt="" className="sec2-img" />
//           </div>
// </div>
// <ForCustomer/>
// <ForShopkeeper/>
// <ForRider/>

// </> 





//   )
// }

// export default Aboutus


import "./aboutus.css" 
import sec2img from '../../assets/section2.png';
import ForCustomer from "./ForCustomer";
import ForShopkeeper from "./ForShopkeeper";
import ForRider from "./ForRider";


const Aboutus = () => {
  return (
    <>
    <div className="section1">
  <h1 className="section1-heading"> About us </h1>
  <p className="section1-p">
  Swift, Reliable, Seamless and Innovative.
  </p>
</div>

 <div>
         <div className="about-us flex mt-14 flex-wrap lg:flex-nowrap justify-center">
            <div className="business-text">
                 <h1 className='busniess-head p-4 text-4xl mt-32'>Who we are</h1>
                 <p className='busniess-par pl-7 text-lg '>We are a dedicated
                        and passionate team committed to revolutionizing the 
                     dispatch industry. Our missionis to provide seamless,
                 reliable, and efficient dispatch services that meet
              the diverse needs of our clients. We believe in leveraging
             technology to streamline operations and enhance customer
            satisfaction. 
                    </p>

                    <button className='bus-btn font-bold'>Know more</button>
            </div>
            <div className="business-img">
               <img src={sec2img} alt="" className='bus-img' />
            </div>
         </div>
    </div>
<ForCustomer/>
<ForShopkeeper/>
<ForRider/>

</> 





  )
}

export default Aboutus

