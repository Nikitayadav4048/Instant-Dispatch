 /* eslint-disable no-unused-vars */



// import { useState } from 'react';
// import './RiderForm.css';

// const RiderForm = () => {
//   const [vehicleType, setVehicleType] = useState('');
//   const [hasLicense, setHasLicense] = useState(false);
//   const [riderID, setRiderID] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupMessage, setPopupMessage] = useState(''); 
//   const [popupTitle, setPopupTitle] = useState(''); 

//   const handleVehicleTypeChange = (event) => {
//     setVehicleType(event.target.value);
//   };

//   const handleLicenseChange = (event) => {
//     setHasLicense(event.target.checked);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if ((vehicleType === 'bike' || vehicleType === 'miniTruck') && !hasLicense) {
//       setPopupTitle('Registration Failed');
//       setPopupMessage('You must have a license to register a bike or mini truck.');
//     } else {
//       const generatedRiderID = `RIDER-${Math.floor(1000 + Math.random() * 9000)}`;
//       setRiderID(generatedRiderID);
//       setPopupTitle('Registration Successful!');
//       setPopupMessage(`Your Rider ID is: ${generatedRiderID}`);
//     }
//     setShowPopup(true);
//   };

//   const closePopup = () => {
//     setShowPopup(false);
//   };

//   return (
//     <>
//       <form className="form-container flex flex-col items-center" onSubmit={handleSubmit}>
//         <div className="contain py-14 flex flex-col items-center gap-3 mt-10 shadow-lg">
//           <h2>Rider Registration Form</h2>
//           <div className="form-group flex flex-col gap-1">
//             <label>Rider Contact</label>
//             <input
//               type="text"
//               id="contact"
//               name="contact"
//               placeholder="Enter contact details"
//               className="p-2 rounded-md"
//               pattern="\d{10}" 
//            maxLength={10}
//               minLength={10}
//               required
//             />
//           </div>
//           <div className="form-group-type flex flex-col gap-1">
//   <label htmlFor="vehicleType">Vehicle Type</label>
//   <select
//     id="vehicleType"
//     name="vehicleType"
//     onChange={handleVehicleTypeChange}
//     className="p-2 rounded-md vehicle-select"
//     required
//   >
//     <option value="">Select a vehicle type</option>
//     <option value="cycle">Cycle</option>
//     <option value="bike">Bike</option>
//     <option value="miniTruck">Mini Truck</option>
//   </select>
// </div>

//           {(vehicleType === 'bike' || vehicleType === 'miniTruck') && (
//             <>
//               <div className="form-group flex flex-col gap-1">
//                 <label>Vehicle Model</label>
//                 <input
//                   type="text"
//                   id="vehicleModel"
//                   name="vehicleModel"
//                   placeholder="Enter vehicle model"
//                   className="p-2 rounded-md"
//                   required
//                 />
//               </div>
//               <div className="form-group flex">
//                 <label className="w-96">Do you have a license?</label>
//                 <input
//                   type="checkbox"
//                   id="hasLicense"
//                   name="hasLicense"
//                   onChange={handleLicenseChange}
                  
//                 />
//               </div>
//               {hasLicense && (
//                 <div className="form-group flex flex-col gap-1">
//                   <label>License Number</label>
//                   <input
//                     type="text"
//                     id="licenseNumber"
//                     name="licenseNumber"
//                     placeholder="Enter license number"
//                     className="p-2 rounded-md"
//                     required
//                   />
//                 </div>
//               )}
//               <div className="form-group flex flex-col gap-1">
//                 <label>Number Plate</label>
//                 <input
//                   type="text"
//                   id="numberPlate"
//                   name="numberPlate"
//                   placeholder="Enter number plate"
//                   className="p-2 rounded-md"
//                   required
//                 />
//               </div>
//             </>
//           )}
//           <div className="form-group flex justify-center">
//             <button type="submit" className="px-14 py-2 submit-btn rounded-md mt-5">
//               Submit
//             </button>
//           </div>
//         </div>
//       </form>

//       {showPopup && (
//         <div className="popup-overlay top-popup " onClick={closePopup}>
//           <div className="popup-content" onClick={(e) => e.stopPropagation()}>
//             <h3 className="popup-title">{popupTitle}</h3>
//             <p className="popup-message">{popupMessage}</p>
//             <button className="popup-button" onClick={closePopup}>Close</button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default RiderForm;


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RiderForm.css';


const RiderForm = () => {
  const [vehicleType, setVehicleType] = useState('');
  const [hasLicense, setHasLicense] = useState(false);
  const [riderID, setRiderID] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupTitle, setPopupTitle] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleVehicleTypeChange = (event) => {
    setVehicleType(event.target.value);
  };

  const handleLicenseChange = (event) => {
    setHasLicense(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if ((vehicleType === 'bike' || vehicleType === 'miniTruck') && !hasLicense) {
      setPopupTitle('Registration Failed');
      setPopupMessage('You must have a license to register a bike or mini truck.');
    } else {
      const generatedRiderID = `RIDER-${Math.floor(1000 + Math.random() * 9000)}`;
      setRiderID(generatedRiderID);
      setPopupTitle('Registration Successful!');
      setPopupMessage(`Your Rider ID is: ${generatedRiderID}`);
      
      // Update backend
      try {
        await fetch('http://localhost:5000/api/users/complete-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          
          body: JSON.stringify({ email: user.email }),

        });

      } catch (error) {
        console.error('Error updating form completion:', error);
      }
    }
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    navigate('/'); // Redirect to Home after closing the popup
  };

  return (
    <>
      <form className="form-container flex flex-col items-center" onSubmit={handleSubmit}>
        <div className="contain py-14 flex flex-col items-center gap-3 mt-10 shadow-lg">
          <h2>Rider Registration Form</h2>
          <div className="form-group flex flex-col gap-1">
            <label>Rider Contact</label>
            <input
              type="text"
              id="contact"
              name="contact"
              placeholder="Enter contact details"
              className="p-2 rounded-md"
              pattern="\d{10}"
              maxLength={10}
              minLength={10}
              required
            />
          </div>
          <div className="form-group-type flex flex-col gap-1">
            <label htmlFor="vehicleType">Vehicle Type</label>
            <select
              id="vehicleType"
              name="vehicleType"
              onChange={handleVehicleTypeChange}
              className="p-2 rounded-md vehicle-select"
              required
            >
              <option value="">Select a vehicle type</option>
              <option value="cycle">Cycle</option>
              <option value="bike">Bike</option>
              <option value="miniTruck">Mini Truck</option>
            </select>
          </div>

          {(vehicleType === 'bike' || vehicleType === 'miniTruck') && (
            <>
              <div className="form-group flex flex-col gap-1">
                <label>Vehicle Model</label>
                <input
                  type="text"
                  id="vehicleModel"
                  name="vehicleModel"
                  placeholder="Enter vehicle model"
                  className="p-2 rounded-md"
                  required
                />
              </div>
              <div className="form-group flex">
                <label className="w-96">Do you have a license?</label>
                <input
                  type="checkbox"
                  id="hasLicense"
                  name="hasLicense"
                  onChange={handleLicenseChange}
                />
              </div>
              {hasLicense && (
                <div className="form-group flex flex-col gap-1">
                  <label>License Number</label>
                  <input
                    type="text"
                    id="licenseNumber"
                    name="licenseNumber"
                    placeholder="Enter license number"
                    className="p-2 rounded-md"
                    required
                  />
                </div>
              )}
              <div className="form-group flex flex-col gap-1">
                <label>Number Plate</label>
                <input
                  type="text"
                  id="numberPlate"
                  name="numberPlate"
                  placeholder="Enter number plate"
                  className="p-2 rounded-md"
                  required
                />
              </div>
            </>
          )}
          <div className="form-group flex justify-center">
            <button type="submit" className="px-14 py-2 submit-btn rounded-md mt-5">
              Submit
            </button>
          </div>
        </div>
      </form>

      {showPopup && (
        <div className="popup-overlay top-popup " onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="popup-title">{popupTitle}</h3>
            <p className="popup-message">{popupMessage}</p>
            <button className="popup-button" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default RiderForm;
