// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import "./Form.css"

// const BookForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     contact: '',
//     pickupAddress: '',
//     deliveryAddress: '',
//     parcelDescription: '',
//     weight: '',
//     pickupTime: '',
//     deliveryTime: '',
//     vehicle: '',
//     price: 0,
//   });
//   const [suggestions, setSuggestions] = useState([]);
//   const [isPickup, setIsPickup] = useState(true);
//   const [errors, setErrors] = useState({ pickupAddress: '', deliveryAddress: '' });
//   const [distance, setDistance] = useState(null);

//   const vehiclePrices = {
//     scooter: 50,
//     bike: 75,
//     miniTruck: 150,
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//       price: name === 'vehicle' ? vehiclePrices[value] : formData.price,
//     });

//     if (name === 'pickupAddress' || name === 'deliveryAddress') {
//       fetchSuggestions(value);
//       setIsPickup(name === 'pickupAddress');
//     }
//   };

//   const fetchSuggestions = async (query) => {
//     const apiKey = '33d227969fe34f1dad9c219cd7b53b6c'; 
//     const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${apiKey}&countrycode=IN&bounds=21.0396,74.1699|26.8826,82.1555`);
//     const data = await response.data;
//     if (data.results) {
//       setSuggestions(data.results);
//     }
//   };

//   const validateAddress = async (address, type) => {
//     const apiKey = '33d227969fe34f1dad9c219cd7b53b6c';
//     const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${apiKey}`);
//     const data = await response.data;
//     if (data.results.length > 0) {
//       setErrors((prev) => ({ ...prev, [type]: '' }));
//       console.log(`${type} is a valid location`);
//       const { lat, lng } = data.results[0].geometry;
//       return { lat, lon: lng };
//     } else {
//       setErrors((prev) => ({ ...prev, [type]: `${type} is not a valid location!!` }));
//       console.log(`${type} is not a valid location!!`);
//       return null;
//     }
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setFormData({
//       ...formData,
//       [isPickup ? 'pickupAddress' : 'deliveryAddress']: suggestion.formatted,
//     });
//     setSuggestions([]);
//   };

//   const haversine = (lon1, lat1, lon2, lat2) => {
//     const R = 6371; // Radius of the Earth in kilometers
//     const dLat = (lat2 - lat1) * (Math.PI / 180);
//     const dLon = (lon2 - lon1) * (Math.PI / 180);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const distance = R * c;
//     return distance;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const pickupCoords = await validateAddress(formData.pickupAddress, 'pickupAddress');
//     const deliveryCoords = await validateAddress(formData.deliveryAddress, 'deliveryAddress');

//     if (pickupCoords && deliveryCoords) {
//       const dist = haversine(pickupCoords.lon, pickupCoords.lat, deliveryCoords.lon, deliveryCoords.lat);
//       setDistance(dist);
//       console.log(`Distance: ${dist.toFixed(2)} km`);

//       try {
//         const response = await axios.post('http://localhost:5000/api/book', formData);
//         console.log('Booking successful:', response.data);
//       } catch (err) {
//         console.error('Error creating booking:', err);
//       }
//     } else {
//       console.log('One or both addresses are invalid. Please correct them.');
//     }
//   };

//   useEffect(() => {
//     const handleClick = (event) => {
//       setSuggestions([]);
//     };

//     document.addEventListener('click', handleClick);

//     return () => {
//       document.removeEventListener('click', handleClick);
//     };
//   }, []);

//   return (
//     <div className="booking-form-container mt-36 mb-36">
//       <h1 className="booking-heading">Book a Rider</h1>
     
//       <form onSubmit={handleSubmit} className="booking-form flex flex-col">
//         <p className="mb-2 text-2xl">Personal Details</p>
       
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           placeholder="Your Name"
//           required
//           autoComplete="off"
//         />
//         <input
//           type="text"
//           name="contact"
//           value={formData.contact}
//           onChange={handleChange}
//           placeholder="Contact Information"
//           required
//           autoComplete="off"
//         />
//         <input
//           type="text"
//           name="pickupAddress"
//           value={formData.pickupAddress}
//           onChange={handleChange}
//           placeholder="Pickup Address"
//           required
//           autoComplete="off"
//           id={errors.pickupAddress ? 'error-border' : ''}
//         />
//         {errors.pickupAddress && <p className="error-text text-red-800 pb-3 ps-1">{errors.pickupAddress}</p>}
//         {isPickup && suggestions.length > 0 && (
//           <ul className="suggestions-list-pickup">
//             {suggestions.map((suggestion, index) => (
//               <li key={index} onClick={() => handleSuggestionClick(suggestion)} className="suggestion-item">
//                 {suggestion.formatted}
//               </li>
//             ))}
//           </ul>
//         )}
//         <input
//           type="text"
//           name="deliveryAddress"
//           value={formData.deliveryAddress}
//           onChange={handleChange}
//           placeholder="Delivery Address"
//           required
//           autoComplete="off"
//           id={errors.deliveryAddress ? 'error-border' : ''}
//         />
//         {errors.deliveryAddress && <p className="error-text text-red-800 pb-3 ps-1">{errors.deliveryAddress}</p>}
//         {!isPickup && suggestions.length > 0 && (
//           <ul className="suggestions-list-delivery">
//             {suggestions.map((suggestion, index) => (
//               <li key={index} onClick={() => handleSuggestionClick(suggestion)} className="suggestion-item">
//                 {suggestion.formatted}
//               </li>
//             ))}
//           </ul>
//         )}
//         <p className="mb-2 text-2xl">Parcel Details</p>
//         <input
//           type="text"
//           name="parcelDescription"
//           value={formData.parcelDescription}
//           onChange={handleChange}
//           placeholder="Parcel Description"
//           required
//           autoComplete="off"
//         />
//         <input
//           type="text"
//           name="weight"
//           value={formData.weight}
//           onChange={handleChange}
//           placeholder="Weight"
//           required
//           autoComplete="off"
//         />
//         <p className="mb-2 text-2xl">Vehicle Selection</p>
//         <div className="vehicle-options flex justify-around mb-4">
//           <label>
//             <input
//               type="radio"
//               name="vehicle"
//               value="scooter"
//               onChange={handleChange}
//               required
//             />
//             <i className="fas fa-motorcycle"></i>
//           </label>
//           <label>
//             <input
//               type="radio"
//               name="vehicle"
//               value="bike"
//               onChange={handleChange}
//               required
//             />
//             <i className="fas fa-bicycle"></i>
//           </label>
//           <label>
//             <input
//               type="radio"
//               name="vehicle"
//               value="miniTruck"
//               onChange={handleChange}
//               required
//             />
//             <i className="fas fa-truck"></i>
//           </label>
//         </div>
//         <p className="mb-2 text-2xl">Booking Details</p>
//         <input
//           type="datetime-local"
//           name="pickupTime"
//           value={formData.pickupTime}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="datetime-local"
//           name="deliveryTime"
//           value={formData.deliveryTime}
//           onChange={handleChange}
//           required
//         />
//         <div className="price-display my-4 text-center">
//           <h3>Total Price: ${formData.price}</h3>
//         </div>
//         {distance !== null && (
//           <div className="distance-display my-4 text-center">
//             <h3>Distance: {distance.toFixed(2)} km</h3>
//           </div>
//         )}
//         <button type="submit" className="booking-button text-dark">Confirm Booking</button>
        
//               </form>
             
//           </div>
//           );
//         };
        
//        export default BookForm;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Form.css";

const BookForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    pickupAddress: '',
    deliveryAddress: '',
    parcelDescription: '',
    weight: '',
    pickupTime: '',
    deliveryTime: '',
    vehicle: '',
    price: 0,
  });
  const [suggestions, setSuggestions] = useState([]);
  const [isPickup, setIsPickup] = useState(true);
  const [errors, setErrors] = useState({ pickupAddress: '', deliveryAddress: '' });
  const [distance, setDistance] = useState(null);

  const vehiclePrices = {
    bike: 10,
    scooter: 30,
    miniTruck: 50,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'pickupAddress' || name === 'deliveryAddress') {
      fetchSuggestions(value);
      setIsPickup(name === 'pickupAddress');
    }
  };

  const fetchSuggestions = async (query) => {
    const apiKey = '33d227969fe34f1dad9c219cd7b53b6c'; 
    const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${apiKey}&countrycode=IN&bounds=21.0396,74.1699|26.8826,82.1555`);
    const data = await response.data;
    if (data.results) {
      setSuggestions(data.results);
    }
  };

  const validateAddress = async (address, type) => {
    const apiKey = '33d227969fe34f1dad9c219cd7b53b6c';
    const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${apiKey}`);
    const data = await response.data;
    if (data.results.length > 0) {
      setErrors((prev) => ({ ...prev, [type]: '' }));
      console.log(`${type} is a valid location`);
      const { lat, lng } = data.results[0].geometry;
      return { lat, lon: lng };
    } else {
      setErrors((prev) => ({ ...prev, [type]: `${type} is not a valid location!!` }));
      console.log(`${type} is not a valid location!!`);
      return null;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData({
      ...formData,
      [isPickup ? 'pickupAddress' : 'deliveryAddress']: suggestion.formatted,
    });
    setSuggestions([]);
  };

  const haversine = (lon1, lat1, lon2, lat2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const calculateTotalPrice = (vehicle, distance) => {
    const rate = vehiclePrices[vehicle];
    return Math.floor(rate * distance);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pickupCoords = await validateAddress(formData.pickupAddress, 'pickupAddress');
    const deliveryCoords = await validateAddress(formData.deliveryAddress, 'deliveryAddress');

    if (pickupCoords && deliveryCoords) {
      const dist = haversine(pickupCoords.lon, pickupCoords.lat, deliveryCoords.lon, deliveryCoords.lat);
      setDistance(dist);
      console.log(`Distance: ${dist.toFixed(2)} km`);

      const totalPrice = calculateTotalPrice(formData.vehicle, dist);
      setFormData((prevFormData) => ({ ...prevFormData, price: totalPrice }));
      console.log(`Total Price: ${totalPrice}`);

      try {
        const response = await axios.post('http://localhost:5000/api/book', formData);
        console.log('Booking successful:', response.data);
      } catch (err) {
        console.error('Error creating booking:', err);
      }
    } else {
      console.log('One or both addresses are invalid. Please correct them.');
    }
  };

  useEffect(() => {
    const handleClick = (event) => {
      setSuggestions([]);
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="booking-form-container mt-36 mb-36">
      <h1 className="booking-heading">Book a Rider</h1>
     
      <form onSubmit={handleSubmit} className="booking-form flex flex-col">
        <p className="mb-2 text-2xl">Personal Details</p>
       
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          autoComplete="off"
        />
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Contact Information"
          required
          autoComplete="off"
        />
        <input
          type="text"
          name="pickupAddress"
          value={formData.pickupAddress}
          onChange={handleChange}
          placeholder="Pickup Address"
          required
          autoComplete="off"
          id={errors.pickupAddress ? 'error-border' : ''}
        />
        {errors.pickupAddress && <p className="error-text text-red-800 pb-3 ps-1">{errors.pickupAddress}</p>}
        {isPickup && suggestions.length > 0 && (
          <ul className="suggestions-list-pickup">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)} className="suggestion-item">
                {suggestion.formatted}
              </li>
            ))}
          </ul>
        )}
        <input
          type="text"
          name="deliveryAddress"
          value={formData.deliveryAddress}
          onChange={handleChange}
          placeholder="Delivery Address"
          required
          autoComplete="off"
          id={errors.deliveryAddress ? 'error-border' : ''}
        />
        {errors.deliveryAddress && <p className="error-text text-red-800 pb-3 ps-1">{errors.deliveryAddress}</p>}
        {!isPickup && suggestions.length > 0 && (
          <ul className="suggestions-list-delivery">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)} className="suggestion-item">
                {suggestion.formatted}
              </li>
            ))}
          </ul>
        )}
        <p className="mb-2 text-2xl">Parcel Details</p>
        <input
          type="text"
          name="parcelDescription"
          value={formData.parcelDescription}
          onChange={handleChange}
          placeholder="Parcel Description"
          required
          autoComplete="off"
        />
        <input
          type="text"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          placeholder="Weight"
          required
          autoComplete="off"
        />
        <p className="mb-2 text-2xl">Vehicle Selection</p>
        <div className="vehicle-options flex justify-around mb-4">
          <label>
            <input
              type="radio"
              name="vehicle"
              value="scooter"
              onChange={handleChange}
              required
            />
            <i className="fas fa-motorcycle"></i>
          </label>
          <label>
            <input
              type="radio"
              name="vehicle"
              value="bike"
              onChange={handleChange}
              required
            />
            <i className="fas fa-bicycle"></i>
          </label>
          <label>
            <input
              type="radio"
              name="vehicle"
              value="miniTruck"
              onChange={handleChange}
              required
            />
            <i className="fas fa-truck"></i>
          </label>
        </div>
        <p className="mb-2 text-2xl">Booking Details</p>
        <input
          type="datetime-local"
          name="pickupTime"
          value={formData.pickupTime}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="deliveryTime"
          value={formData.deliveryTime}
          onChange={handleChange}
          required
        />
<div className="price-display my-4 text-center">
<h3>Total Price: ₹{formData.price}</h3>
</div>
{distance !== null && (
<div className="distance-display my-4 text-center">
  <h3>Distance: {distance.toFixed(2)} km</h3>
</div>
)}
<button type="submit" className="booking-button text-dark">Confirm Booking</button>

    </form>
   
</div>
);
};

export default BookForm;