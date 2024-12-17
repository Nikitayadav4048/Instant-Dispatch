import custimg from '../../assets/shopkeeper.jfif';
import "./forcustomer.css";
const ForShopkeeper = () => {
  return (
    <>
        <div className="section3 flex flex-wrap justify-center gap-24 my-40 ms-12">
         
        

         <div className="section3-part2 w-96 flex flex-col justify-center ">
         <h2 className='section3-heading mb-9'>FOR SHOPKEEPER</h2>
           <p className='section3-p text-lg mb-9'> We empower shopkeepers by providing them with a
             robust platform to manage their deliveries efficiently.
              Partnering with Instant Dispatch means you can focus on your business,
               knowing that your dispatch needs are in good hands. You can easily integrate our dispatch services into your business operations.</p>
                <button className='section3-button'>Book now</button>
         </div>

         <div className="section3-part1">
          <img src={custimg} alt="" className='sec3-img shop-img'/>
          </div>
       
        </div>
    </>
    
  )
}

export default ForShopkeeper
