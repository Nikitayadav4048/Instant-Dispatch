import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addNotification } from '../redux/notificationSlice';
import './Form.css';

const BookForm = () => {
  const dispatch = useDispatch();

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
  const [liveDistance, setLiveDistance] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
   const [finalDistance, setFinalDistance] = useState(null);
  const [finalPrice, setFinalPrice] = useState(null);


  const vehiclePrices = {
    bike: 10,
    scooter: 30,
    miniTruck: 50,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'pickupAddress' || name === 'deliveryAddress') {
      fetchSuggestions(value);
      setIsPickup(name === 'pickupAddress');
    }
  };

  const fetchSuggestions = async (query) => {
    if (!query) return;
    const apiKey = 'a240b743e5574003a8ef34ccc7ce329c';
    try {
      const res = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${apiKey}&countrycode=IN&bounds=21.0396,74.1699|26.8826,82.1555`);
      if (res.data.results) setSuggestions(res.data.results);
    } catch (err) {
      console.error('Error fetching suggestions:', err);
    }
  };

  const validateAddress = async (address, type) => {
    const apiKey = 'a240b743e5574003a8ef34ccc7ce329c';
    try {
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${apiKey}`);
      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry;
        setErrors((prev) => ({ ...prev, [type]: '' }));
        return { lat, lon: lng };
      } else {
        setErrors((prev) => ({ ...prev, [type]: `${type} is not a valid location.` }));
        return null;
      }
    } catch (err) {
      console.error(`Error validating ${type}:`, err);
      return null;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData((prev) => ({
      ...prev,
      [isPickup ? 'pickupAddress' : 'deliveryAddress']: suggestion.formatted,
    }));
    setSuggestions([]);
  };

  const haversine = (lon1, lat1, lon2, lat2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pickupCoords = await validateAddress(formData.pickupAddress, 'pickupAddress');
    const deliveryCoords = await validateAddress(formData.deliveryAddress, 'deliveryAddress');
    if (!pickupCoords || !deliveryCoords) return;

    const distance = haversine(pickupCoords.lon, pickupCoords.lat, deliveryCoords.lon, deliveryCoords.lat);
    setLiveDistance(distance);
    setFinalDistance(distance);


    const totalPrice = Math.floor(vehiclePrices[formData.vehicle] * distance);
    setFinalPrice(totalPrice);


    // const totalPrice = Math.floor(vehiclePrices[formData.vehicle] * distance);
    const bookingData = {
      ...formData,
      price: totalPrice,
      contact: Number(formData.contact),
      pickupTime: new Date(formData.pickupTime),
      deliveryTime: new Date(formData.deliveryTime),
    };

    try {
      const res = await axios.post('http://localhost:5000/api/book', bookingData);
      console.log('✅ Booking successful:', res.data);

      dispatch(addNotification({
        id: Date.now(),
        message: `Booking confirmed for ${formData.name}`,
        timestamp: new Date().toLocaleString()
      }));

      setFormData({
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
      // setLiveDistance(null);
      setShowConfirmation(true);
    } catch (err) {
      console.error('❌ Booking failed:', err);
    }
  };

  useEffect(() => {
    const clearSuggestions = () => setSuggestions([]);
    document.addEventListener('click', clearSuggestions);
    return () => document.removeEventListener('click', clearSuggestions);
  }, []);

  return (
    <div className="booking-form-container">
      <h1 className="booking-heading">Book a Rider</h1>

        {showConfirmation && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>✅ Booking Confirmed!</h2>
            <p>Your booking for <strong>{formData.name || 'the rider'}</strong> is successfully placed.</p>

            {finalDistance !== null && finalPrice !== null && (
              <div className="modal-details">
                <p><strong>Distance:</strong> {finalDistance.toFixed(2)} km</p>
                <p><strong>Total Price:</strong> ₹{finalPrice}</p>
              </div>
            )}

            <button onClick={() => {
              setShowConfirmation(false);
              setLiveDistance(null);
              setFinalDistance(null);
              setFinalPrice(null);
            }}>Close</button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="booking-form">
        <p className="text-2xl p-2">Personal Details</p>
        <input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
        <input name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} required />

        <input name="pickupAddress" placeholder="Pickup Address" value={formData.pickupAddress} onChange={handleChange} required className={errors.pickupAddress ? 'error-border' : ''} />
        {errors.pickupAddress && <p className="error-text">{errors.pickupAddress}</p>}
        {isPickup && suggestions.length > 0 && (
          <ul className="suggestions-list-pickup">
            {suggestions.map((s, i) => (
              <li key={i} className="suggestion-item" onClick={() => handleSuggestionClick(s)}>{s.formatted}</li>
            ))}
          </ul>
        )}

        <input name="deliveryAddress" placeholder="Delivery Address" value={formData.deliveryAddress} onChange={handleChange} required className={errors.deliveryAddress ? 'error-border' : ''} />
        {errors.deliveryAddress && <p className="error-text">{errors.deliveryAddress}</p>}
        {!isPickup && suggestions.length > 0 && (
          <ul className="suggestions-list-delivery">
            {suggestions.map((s, i) => (
              <li key={i} className="suggestion-item" onClick={() => handleSuggestionClick(s)}>{s.formatted}</li>
            ))}
          </ul>
        )}

        <p className='p-2 text-2xl'>Parcel Details</p>
        <input name="parcelDescription" placeholder="Parcel Description" value={formData.parcelDescription} onChange={handleChange} required />
        <input name="weight" type="number" placeholder="Weight in kg" value={formData.weight} onChange={handleChange} required />

        <p className='text-2xl p-2 pb-5'>Vehicle Selection</p>
        <div className="vehicle-options">
          {[
            { value: 'bike', label: 'Bike', icon: 'fa-bicycle' },
            { value: 'scooter', label: 'Scooter', icon: 'fa-motorcycle' },
            { value: 'miniTruck', label: 'Mini Truck', icon: 'fa-truck' }
          ].map(({ value, label, icon }) => (
            <label key={value} className={`vehicle-label ${formData.vehicle === value ? 'active' : ''}`}>
              <input type="radio" name="vehicle" value={value} checked={formData.vehicle === value} onChange={handleChange} required />
              <i className={`fas ${icon}`}></i>
              <span>{label}</span>
            </label>
          ))}
        </div>

         <p className='text-2xl p-2'>Timing</p>
        <div className="timing-row">
          <input type="datetime-local" name="pickupTime" value={formData.pickupTime} onChange={handleChange} required />
          <input type="datetime-local" name="deliveryTime" value={formData.deliveryTime} onChange={handleChange} required />
        </div>

        {/* {liveDistance !== null && (
          <div className="distance-display">
            <h3>Distance: {liveDistance.toFixed(2)} km</h3>
            <h3>Total Price: ₹{Math.floor(vehiclePrices[formData.vehicle] * liveDistance)}</h3>
          </div>
       
        )} */} 

        <div className='pt-3 pb-3 pl-56'>
          <button type="submit" className="booking-button">Confirm Booking</button>
            </div>
               </form>
     </div>
   );
 };
export default BookForm; 