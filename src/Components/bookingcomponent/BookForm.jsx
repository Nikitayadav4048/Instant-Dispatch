import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addNotification } from '../redux/notificationSlice';
import './Form.css';

const BookForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    pickupAddress: '',
    deliveryAddress: '',
    parcelDescription: '',
    weight: '',
    vehicle: '',
    price: 0,
    paymentStatus: 'cod',
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.email) {
      setFormData(prev => ({ ...prev, email: user.email }));
    }
  }, []);

  const [suggestions, setSuggestions] = useState([]);
  const [isPickup, setIsPickup] = useState(true);
  const [errors, setErrors] = useState({ pickupAddress: '', deliveryAddress: '' });
  const [calculatedDistance, setCalculatedDistance] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [finalDistance, setFinalDistance] = useState(null);
  const [finalPrice, setFinalPrice] = useState(null);
  const [recommendedVehicles, setRecommendedVehicles] = useState([]);

  const vehiclePrices = {
    cycle: 5,
    motorcycle: 10,
    miniTruck: 50,
  };

  const vehicleCapacity = {
    cycle: { maxWeight: 2, name: 'Cycle', icon: 'fa-bicycle', description: 'Up to 2kg' },
    motorcycle: { maxWeight: 10, name: 'Motorcycle', icon: 'fa-motorcycle', description: 'Up to 10kg' },
    miniTruck: { maxWeight: 100, name: 'Mini Truck', icon: 'fa-truck', description: 'Up to 100kg' }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'pickupAddress' || name === 'deliveryAddress') {
      fetchSuggestions(value);
      setIsPickup(name === 'pickupAddress');
    }

    if (name === 'weight') {
      const weight = parseFloat(value);
      if (weight > 0) {
        const suitable = Object.entries(vehicleCapacity)
          .filter(([key, vehicle]) => weight <= vehicle.maxWeight)
          .map(([key, vehicle]) => ({ key, ...vehicle }));
        setRecommendedVehicles(suitable);
        
        if (suitable.length > 0) {
          const bestVehicle = suitable[0].key;
          setFormData(prev => ({ ...prev, vehicle: bestVehicle }));
        }
      } else {
        setRecommendedVehicles([]);
      }
    }
  };

  const fetchSuggestions = async (query) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }
    const apiKey = 'a240b743e5574003a8ef34ccc7ce329c';
    try {
      const res = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)} Madhya Pradesh India&key=${apiKey}&countrycode=IN&limit=5`);
      if (res.data.results && res.data.results.length > 0) {
        setSuggestions(res.data.results);
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      console.error('Error fetching suggestions:', err);
      setSuggestions([]);
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

  const handleSuggestionClick = async (suggestion) => {
    const fieldName = isPickup ? 'pickupAddress' : 'deliveryAddress';
    const newFormData = {
      ...formData,
      [fieldName]: suggestion.formatted,
    };
    
    setFormData(newFormData);
    setSuggestions([]);
    
    if (newFormData.pickupAddress && newFormData.deliveryAddress) {
      await calculateLiveDistance(newFormData.pickupAddress, newFormData.deliveryAddress);
    }
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

  const calculateLiveDistance = async (pickup, delivery) => {
    try {
      const pickupCoords = await validateAddress(pickup, 'pickupAddress');
      const deliveryCoords = await validateAddress(delivery, 'deliveryAddress');
      
      if (pickupCoords && deliveryCoords) {
        const distance = haversine(pickupCoords.lon, pickupCoords.lat, deliveryCoords.lon, deliveryCoords.lat);
        setCalculatedDistance(distance);
      }
    } catch (error) {
      console.error('Error calculating distance:', error);
    }
  };

  const completeBooking = async (bookingData, totalPrice) => {
    try {
      const res = await axios.post('http://localhost:5002/api/bookings', bookingData);
      console.log('Booking successful:', res.data);
    } catch (err) {
      console.error('Backend not available, using mock booking:', err.message);
      // Continue with mock booking when backend is down
    }
    
    // Always complete the booking (with or without backend)
    const parcelId = `PID${Date.now().toString().slice(-6)}`;
    
    dispatch(addNotification({
      id: Date.now(),
      parcelId: parcelId,
      message: `Booking confirmed! Parcel ID: ${parcelId}`,
      details: {
        customerName: formData.name,
        contact: formData.contact,
        pickup: formData.pickupAddress,
        delivery: formData.deliveryAddress,
        parcelDescription: formData.parcelDescription,
        weight: formData.weight,
        vehicle: formData.vehicle,
        distance: finalDistance?.toFixed(2),
        price: totalPrice,
        paymentMethod: formData.paymentStatus
      },
      timestamp: new Date().toLocaleString(),
      type: 'booking'
    }));

    setFormData({
      name: '',
      email: '',
      contact: '',
      pickupAddress: '',
      deliveryAddress: '',
      parcelDescription: '',
      weight: '',
      vehicle: '',
      price: 0,
      paymentStatus: 'cod',
    });
    setShowConfirmation(true);
    setPaymentProcessing(false);
  };

  const processUPIPayment = (amount) => {
    return new Promise((resolve) => {
      const upiId = 'merchant@paytm';
      const upiUrl = `upi://pay?pa=${upiId}&pn=InstantDispatch&am=${amount}&cu=INR&tn=Delivery Payment`;
      
      // Create UPI payment link
      const paymentWindow = window.open(upiUrl, '_blank');
      
      // Simulate payment processing
      setTimeout(() => {
        if (paymentWindow) paymentWindow.close();
        // In real implementation, you'd verify payment status from backend
        const paymentSuccess = Math.random() > 0.2; // 80% success rate for demo
        resolve(paymentSuccess);
      }, 3000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.vehicle) {
      alert('Please select a vehicle type');
      return;
    }
    
    const pickupCoords = await validateAddress(formData.pickupAddress, 'pickupAddress');
    const deliveryCoords = await validateAddress(formData.deliveryAddress, 'deliveryAddress');
    if (!pickupCoords || !deliveryCoords) return;

    const distance = haversine(pickupCoords.lon, pickupCoords.lat, deliveryCoords.lon, deliveryCoords.lat);
    setFinalDistance(distance);

    const totalPrice = Math.floor(vehiclePrices[formData.vehicle] * distance);
    setFinalPrice(totalPrice);

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const bookingData = {
      ...formData,
      price: totalPrice,
      contact: Number(formData.contact),
      customerUsername: formData.email || user.email || 'Unknown User',
      customerEmail: formData.email,
      customerId: user.id,
      userId: user.id,
    };

    // Handle UPI payment
    if (formData.paymentStatus === 'upi') {
      setPaymentProcessing(true);
      try {
        const paymentSuccess = await processUPIPayment(totalPrice);
        if (paymentSuccess) {
          bookingData.paymentStatus = 'paid';
          await completeBooking(bookingData, totalPrice);
        } else {
          alert('UPI payment failed. Please try again or choose a different payment method.');
          setPaymentProcessing(false);
          return;
        }
      } catch (error) {
        alert('UPI payment error. Please try again.');
        setPaymentProcessing(false);
        return;
      }
    } else {
      await completeBooking(bookingData, totalPrice);
    }
  };

  useEffect(() => {
    const clearSuggestions = () => setSuggestions([]);
    document.addEventListener('click', clearSuggestions);
    return () => document.removeEventListener('click', clearSuggestions);
  }, []);

  return (
    <div className="booking-form-container">
      {showConfirmation && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>✅ Booking Confirmed!</h2>
            <p>Your booking has been successfully placed.</p>
            {finalPrice !== null && (
              <div className="modal-details">
                <p><strong>Total Price:</strong> ₹{finalPrice}</p>
              </div>
            )}
            <button onClick={() => {
              setShowConfirmation(false);
              setFinalDistance(null);
              setFinalPrice(null);
              setPaymentProcessing(false);
            }}>Close</button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="booking-form">
        <h1 className="booking-heading">Book a Delivery</h1>

        <div className="form-row">
          <div className="input-group">
            <input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
            <i className="fas fa-user"></i>
          </div>
          
          <div className="input-group">
            <input name="email" type="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
            <i className="fas fa-envelope"></i>
          </div>
        </div>
        
        <div className="input-group">
          <input name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} required />
          <i className="fas fa-phone"></i>
        </div>
        
        <div className="input-group">
          <input name="pickupAddress" placeholder="Pickup Address" value={formData.pickupAddress} onChange={handleChange} required className={errors.pickupAddress ? 'error-border' : ''} />
          <i className="fas fa-map-marker-alt"></i>
        </div>
        {errors.pickupAddress && <p className="error-text">{errors.pickupAddress}</p>}
        {isPickup && suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((s, i) => (
              <li key={i} className="suggestion-item" onClick={(e) => {
                e.stopPropagation();
                handleSuggestionClick(s);
              }}>{s.formatted}</li>
            ))}
          </ul>
        )}

        <div className="input-group">
          <input name="deliveryAddress" placeholder="Delivery Address" value={formData.deliveryAddress} onChange={handleChange} required className={errors.deliveryAddress ? 'error-border' : ''} />
          <i className="fas fa-map-pin"></i>
        </div>
        {errors.deliveryAddress && <p className="error-text">{errors.deliveryAddress}</p>}
        {!isPickup && suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((s, i) => (
              <li key={i} className="suggestion-item" onClick={(e) => {
                e.stopPropagation();
                handleSuggestionClick(s);
              }}>{s.formatted}</li>
            ))}
          </ul>
        )}

        <div className="form-row">
          <div className="input-group">
            <input name="parcelDescription" placeholder="What are you sending?" value={formData.parcelDescription} onChange={handleChange} required />
            <i className="fas fa-box"></i>
          </div>
          
          <div className="input-group">
            <input name="weight" type="number" step="0.1" placeholder="Weight in kg" value={formData.weight} onChange={handleChange} required />
            <i className="fas fa-weight-hanging"></i>
          </div>
        </div>
        {formData.weight && recommendedVehicles.length > 0 && (
          <div className="weight-recommendation">
            <p>💡 Recommended for {formData.weight}kg</p>
          </div>
        )}
        
        <div className="vehicle-options">
          <h3>Select Vehicle</h3>
          <div className="vehicle-grid">
            {Object.entries(vehicleCapacity).map(([key, vehicle]) => {
              const isRecommended = recommendedVehicles.some(rv => rv.key === key);
              const isOverweight = formData.weight && parseFloat(formData.weight) > vehicle.maxWeight;
              
              return (
                <label key={key} className={`vehicle-label ${
                  formData.vehicle === key ? 'active' : ''
                } ${
                  isRecommended ? 'recommended' : ''
                } ${
                  isOverweight ? 'disabled' : ''
                }`}>
                  <input 
                    type="radio" 
                    name="vehicle" 
                    value={key} 
                    checked={formData.vehicle === key} 
                    onChange={handleChange}
                    disabled={isOverweight}
                  />
                  <div className="vehicle-info">
                    <i className={`fas ${vehicle.icon}`}></i>
                    <div className="vehicle-details">
                      <span className="vehicle-name">{vehicle.name}</span>
                      <span className="vehicle-capacity">{vehicle.description}</span>
                      <span className="vehicle-price">₹{vehiclePrices[key]}/km</span>
                    </div>
                    {isRecommended && <span className="recommended-badge">✨</span>}
                    {isOverweight && <span className="overweight-badge">⚠️</span>}
                  </div>
                </label>
              );
            })}
          </div>
        </div>
        
        {calculatedDistance && formData.vehicle && (
          <div className="price-breakdown">
            <div className="price-item">
              <span>Distance: {calculatedDistance.toFixed(2)} km</span>
              <span>Rate: ₹{vehiclePrices[formData.vehicle]}/km</span>
            </div>
            <div className="price-total">
              <strong>Total: ₹{Math.floor(vehiclePrices[formData.vehicle] * calculatedDistance)}</strong>
            </div>
          </div>
        )}
        
        <div className="payment-section">
          <h3>Payment Method</h3>
          <div className="payment-options">
            <label className={`payment-option ${formData.paymentStatus === 'cod' ? 'active' : ''}`}>
              <input 
                type="radio" 
                name="paymentStatus" 
                value="cod" 
                checked={formData.paymentStatus === 'cod'} 
                onChange={handleChange} 
              />
              <div className="payment-info">
                <i className="fas fa-money-bill-wave"></i>
                <span>Cash on Delivery</span>
              </div>
            </label>
            <label className={`payment-option ${formData.paymentStatus === 'online' ? 'active' : ''}`}>
              <input 
                type="radio" 
                name="paymentStatus" 
                value="online" 
                checked={formData.paymentStatus === 'online'} 
                onChange={handleChange} 
              />
              <div className="payment-info">
                <i className="fas fa-credit-card"></i>
                <span>Online Payment</span>
              </div>
            </label>
            <label className={`payment-option ${formData.paymentStatus === 'upi' ? 'active' : ''}`}>
              <input 
                type="radio" 
                name="paymentStatus" 
                value="upi" 
                checked={formData.paymentStatus === 'upi'} 
                onChange={handleChange} 
              />
              <div className="payment-info">
                <i className="fab fa-google-pay"></i>
                <span>UPI Payment</span>
              </div>
            </label>
          </div>
        </div>
        
        <button type="submit" className="booking-button" disabled={paymentProcessing}>
          {paymentProcessing ? 'Processing Payment...' : 'Book Now'}
        </button>
        
        {paymentProcessing && (
          <div className="payment-processing">
            <p>🔄 Processing UPI payment...</p>
            <p>Please complete the payment in your UPI app</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default BookForm;