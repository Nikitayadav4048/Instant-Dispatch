import './main.css'
import image from '../../assets/hero-img.jpeg'
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { TbHours24 } from "react-icons/tb";

const Maincontainer = () => {
  return (
    <>
    <div className='main'>
    <div className="sec1 mt-24 ms-12">
    <p className='sec1-para1 mb-8'>Welcome to</p>
    <p className='sec1-h mb-9'>INSTANT DISPATCH</p>
    <p className='sec1-para2'>A courier or parcel dilievery Management system</p>

    <button className='btn font-bold'>Book now</button>
    </div>
    <div className="sec2">
      <img src={image} alt="" className='fast-img'/>
    </div>
    </div>

    <section  className='mt-20 section2 '>
          <div className="second-container flex justify-center gap-7">
             <VscWorkspaceTrusted size={70}  className='icon-background' style={{ padding: '10px'}}/>
             <div className="trust-img">
              <h1>100 000+</h1>
                   <p>Trust and Reliability</p>
             </div>
             <MdOutlineHealthAndSafety  size={80} style={{ padding: '10px'}}/>
             <div className="sefty">
             <h1>Safety</h1>
             <p>Sanitized Safe Deliveries</p>
             </div>
             <TbHours24 size={80} style={{ padding: '10px'}}/>
             <div className="time-line">
             <h1>24/7</h1>
             <p>dedicated support team</p>
             </div>
          </div>
    </section>


    </>
  )
}

export default Maincontainer