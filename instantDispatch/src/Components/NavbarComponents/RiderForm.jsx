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
import { MdCheckCircle, MdDirectionsBike, MdLocalShipping } from 'react-icons/md';


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
    const formData = new FormData(event.target);
    
    if ((vehicleType === 'bike' || vehicleType === 'miniTruck') && !hasLicense) {
      setPopupTitle('Registration Failed');
      setPopupMessage('You must have a license to register a bike or mini truck.');
    } else {
      const generatedRiderID = `RIDER-${Math.floor(1000 + Math.random() * 9000)}`;
      setRiderID(generatedRiderID);
      
      // Save rider form data to localStorage
      const riderData = {
        fullName: user.username || 'Rider',
        email: user.email,
        phoneNumber: formData.get('contact'),
        vehicleType: vehicleType,
        vehicleModel: formData.get('vehicleModel') || '',
        vehicleNumber: formData.get('numberPlate') || '',
        licenseNumber: formData.get('licenseNumber') || '',
        riderId: generatedRiderID,
        hasLicense: hasLicense
      };
      
      // Save to both user and riderFormData in localStorage
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = { ...currentUser, ...riderData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      localStorage.setItem('riderFormData', JSON.stringify(riderData));
      
      setPopupTitle('Registration Successful!');
      setPopupMessage(`Your Rider ID is: ${generatedRiderID}`);
      
      // Update backend (optional - works without backend)
      try {
        await fetch('http://localhost:5000/api/users/complete-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: user.email, ...riderData }),
        });
      } catch (error) {
        console.log('Backend not available - continuing with local data');
      }
    }
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    if (riderID) {
      navigate('/rider-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent mb-4">
            Complete Your Rider Profile
          </h1>
          <p className="text-gray-600 text-lg">Just a few more details to get you started!</p>
        </div>
        
        <form className="bg-white rounded-2xl shadow-xl p-8" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Contact Number</label>
              <input
                type="text"
                id="contact"
                name="contact"
                placeholder="Enter your 10-digit phone number"
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                pattern="\d{10}"
                maxLength={10}
                minLength={10}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Vehicle Type</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'cycle', label: 'Cycle', icon: '🚲' },
                  { value: 'bike', label: 'Motorcycle', icon: '🏍️' },
                  { value: 'miniTruck', label: 'Mini Truck', icon: '🚚' }
                ].map((vehicle) => (
                  <label key={vehicle.value} className={`cursor-pointer border-2 rounded-xl p-4 text-center transition-all ${
                    vehicleType === vehicle.value ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'
                  }`}>
                    <input
                      type="radio"
                      name="vehicleType"
                      value={vehicle.value}
                      onChange={handleVehicleTypeChange}
                      className="sr-only"
                      required
                    />
                    <div className="text-3xl mb-2">{vehicle.icon}</div>
                    <div className="font-medium">{vehicle.label}</div>
                  </label>
                ))}
              </div>
            </div>

            {(vehicleType === 'bike' || vehicleType === 'miniTruck') && (
              <div className="space-y-6 p-6 bg-gray-50 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800">Vehicle Details</h3>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Vehicle Model</label>
                  <input
                    type="text"
                    id="vehicleModel"
                    name="vehicleModel"
                    placeholder="e.g., Honda CB Shine, Tata Ace"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                  />
                </div>
                
                <div>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      id="hasLicense"
                      name="hasLicense"
                      onChange={handleLicenseChange}
                      className="w-5 h-5 text-orange-500 rounded focus:ring-orange-400"
                    />
                    <span className="text-gray-700 font-medium">I have a valid driving license</span>
                  </label>
                </div>
                
                {hasLicense && (
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">License Number</label>
                    <input
                      type="text"
                      id="licenseNumber"
                      name="licenseNumber"
                      placeholder="Enter your license number"
                      className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                      required
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Vehicle Number Plate</label>
                  <input
                    type="text"
                    id="numberPlate"
                    name="numberPlate"
                    placeholder="e.g., MH 01 AB 1234"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                  />
                </div>
              </div>
            )}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold rounded-xl shadow-lg hover:from-orange-600 hover:to-orange-500 transform hover:scale-[1.02] transition-all duration-300"
            >
              Complete Registration
            </button>
          </div>
        </form>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-96 text-center">
            {riderID ? (
              <MdCheckCircle className="text-green-500 mx-auto mb-4" size={64} />
            ) : (
              <div className="text-red-500 mx-auto mb-4 text-6xl">⚠️</div>
            )}
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{popupTitle}</h3>
            <p className="text-gray-600 mb-6">{popupMessage}</p>
            <button
              onClick={closePopup}
              className={`px-8 py-3 rounded-xl font-semibold transition-colors ${
                riderID ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-red-500 hover:bg-red-600 text-white'
              }`}
            >
              {riderID ? 'Continue to Dashboard' : 'Try Again'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiderForm;
