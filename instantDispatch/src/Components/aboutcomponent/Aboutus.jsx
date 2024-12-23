import "./Aboutus.css"
import sec2img from '../../assets/section2.png';
import ForCustomer from "./ForCustomer";
import ForShopkeeper from "./ForShopkeeper";
import ForRider from "./ForRider";


const Aboutus = () => {
  return (
    <>
    <div className="flex flex-col items-center justify-center section1 md:mx-48 mx-5">
  <h1 className="  mb-4 section1-heading "> About us </h1>
  <p className="text-center section1-p ">
  Swift, Reliable, Seamless and Innovative.
  </p>
</div>

<div className="section2 ">
    <div className="section2-div1">
    <h1 className="mb-10 text-4xl section2-heading "> Who we are </h1>
    <p className="text-lg section2-p"> We are a dedicated
        and passionate team committed to revolutionizing the 
        dispatch industry. Our missionis to provide seamless,
        reliable, and efficient dispatch services that meet
        the diverse needs of our clients. We believe in leveraging
        technology to streamline operations and enhance customer
        satisfaction.</p>
    </div>
          <div>
          <img src={sec2img} alt="" className="sec2-img" />
          </div>
</div>
<ForCustomer/>
<ForShopkeeper/>
<ForRider/>

</> 





  )
}

export default Aboutus
