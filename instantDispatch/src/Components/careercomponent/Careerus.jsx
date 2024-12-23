import "./career.css"
import sec2img from '../../assets/restaurant.png';

const Careerus = () => {
  return (
     <>
         <div className="flex flex-col items-center justify-center section1 md:mx-48 mx-14 ">
      <h1 className=" mb-4 section1-heading ">Career</h1>
      <p className="text-center section1-p ">
      Join our dynamic team
        
      </p>
    </div>
    
    <div className="section2 ">
        <div className="section2-div1  py-20 ">
        <h1 className="mb-10 text-4xl section2-heading ">Join Our Team at Instant Dispatch </h1>
        <p className="text-lg section2-p ps-7">We are seeking reliable and 
          hardworking delivery drivers to join our team. At Instant Dispatch,
            we are committed to providing exceptional delivery services,
             and we know that our success is driven by our incredible team.
              Join us and be part of an innovative and supportive workplace 
              where your contributions make a real impact.</p>
        </div>
              <div>
              <img src={sec2img} alt="" className="sec2-img py-10" />
              </div>
    </div>

   
    
        </>
  )
}

export default Careerus
