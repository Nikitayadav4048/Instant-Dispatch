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

  // Auto-fill email from logged-in user
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.email) {
      setFormData(prev => ({ ...prev, email: user.email }));
    }
  }, []);

  const [suggestions, setSuggestions] = useState([]);
  const [isPickup, setIsPickup] = useState(true);
  const [errors, setErrors] = useState({ pickupAddress: '', deliveryAddress: '' });
  const [liveDistance, setLiveDistance] = useState(null);
  const [calculatedDistance, setCalculatedDistance] = useState(null);
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
    
    // Calculate distance if both addresses are selected
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

  const handlePayment = async (bookingData, totalPrice) => {
    const options = {
      key: 'rzp_test_1DP5mmOlF5G5ag', // Test key
      amount: totalPrice * 100, // Amount in paise
      currency: 'INR',
      display_currency: 'INR',
      display_amount: totalPrice * 100,
      name: 'Instant Dispatch',
      description: 'Delivery Service Payment',
      config: {
        display: {
          language: 'en'
        }
      },
      handler: async function (response) {
        console.log('Payment successful:', response);
        await completeBooking({ ...bookingData, paymentId: response.razorpay_payment_id, paymentStatus: 'paid' }, totalPrice);
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.contact
      },
      theme: {
        color: '#F8AD42'
      },
      modal: {
        ondismiss: function() {
          console.log('Payment cancelled');
        }
      }
    };

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      // Fallback to mock payment if Razorpay not loaded
      alert('Processing payment... (Demo mode)');
      setTimeout(async () => {
        const mockPaymentId = 'pay_' + Date.now();
        await completeBooking({ ...bookingData, paymentId: mockPaymentId, paymentStatus: 'paid' }, totalPrice);
      }, 2000);
    }
  };

  const completeBooking = async (bookingData, totalPrice) => {
    try {
      console.log('📤 Sending booking data:', bookingData);
      const res = await axios.post('http://localhost:5002/api/bookings', bookingData);
      console.log('✅ Booking successful:', res.data);

      // Generate parcel ID
      const parcelId = `PID${Date.now().toString().slice(-6)}`;
      
      // Add detailed notification to Redux
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
      
      console.log('🔔 Notification added to Redux store');



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
    } catch (err) {
      console.error('❌ Booking failed:', err);
      console.error('❌ Error response:', err.response?.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate vehicle selection
    if (!formData.vehicle) {
      alert('Please select a vehicle type');
      return;
    }
    
    const pickupCoords = await validateAddress(formData.pickupAddress, 'pickupAddress');
    const deliveryCoords = await validateAddress(formData.deliveryAddress, 'deliveryAddress');
    if (!pickupCoords || !deliveryCoords) return;

    const distance = haversine(pickupCoords.lon, pickupCoords.lat, deliveryCoords.lon, deliveryCoords.lat);
    setLiveDistance(distance);
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
    };

    // Check payment method
    if (formData.paymentStatus === 'online') {
      // Load Razorpay script if not loaded
      if (!window.Razorpay) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => handlePayment(bookingData, totalPrice);
        document.body.appendChild(script);
      } else {
        handlePayment(bookingData, totalPrice);
      }
    } else {
      // COD or UPI - complete booking directly
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
      <h1 className="booking-heading">Book a Rider</h1>

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
              setLiveDistance(null);
              setFinalDistance(null);
              setFinalPrice(null);
            }}>Close</button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="booking-form">
        <input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
        <input name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} required />
        
        <input name="pickupAddress" placeholder="Pickup Address" value={formData.pickupAddress} onChange={handleChange} required className={errors.pickupAddress ? 'error-border' : ''} />
        {errors.pickupAddress && <p className="error-text">{errors.pickupAddress}</p>}
        {isPickup && suggestions.length > 0 && (
          <ul className="suggestions-list-pickup">
            {suggestions.map((s, i) => (
              <li key={i} className="suggestion-item" onClick={(e) => {
                e.stopPropagation();
                handleSuggestionClick(s);
              }}>{s.formatted}</li>
            ))}
          </ul>
        )}

        
        <input name="deliveryAddress" placeholder="Delivery Address" value={formData.deliveryAddress} onChange={handleChange} required className={errors.deliveryAddress ? 'error-border' : ''} />
        {errors.deliveryAddress && <p className="error-text">{errors.deliveryAddress}</p>}
        {!isPickup && suggestions.length > 0 && (
          <ul className="suggestions-list-delivery">
            {suggestions.map((s, i) => (
              <li key={i} className="suggestion-item" onClick={(e) => {
                e.stopPropagation();
                handleSuggestionClick(s);
              }}>{s.formatted}</li>
            ))}
          </ul>
        )}

        
        <input name="parcelDescription" placeholder="Parcel Description" value={formData.parcelDescription} onChange={handleChange} required />
        <input name="weight" type="number" placeholder="Weight in kg" value={formData.weight} onChange={handleChange} required />
        
        <div className="vehicle-options">
          {[
            { value: 'bike', label: 'Bike', icon: 'fa-bicycle' },
            { value: 'scooter', label: 'Scooter', icon: 'fa-motorcycle' },
            { value: 'miniTruck', label: 'Mini Truck', icon: 'fa-truck' }
          ].map(({ value, label, icon }) => (
            <label key={value} className={`vehicle-label ${formData.vehicle === value ? 'active' : ''}`}>
              <input type="radio" name="vehicle" value={value} checked={formData.vehicle === value} onChange={handleChange} />
              <i className={`fas ${icon}`}></i>
              <span>{label}</span>
            </label>
          ))}
        </div>
        
        {calculatedDistance && formData.vehicle && (
          <div className="distance-display">
            <p><strong>Estimated Price:</strong> ₹{Math.floor(vehiclePrices[formData.vehicle] * calculatedDistance)}</p>
          </div>
        )}
        
        <div className="payment-section">
          <label className="section-label">Payment Method</label>
          <select name="paymentStatus" value={formData.paymentStatus} onChange={handleChange} className="payment-dropdown" required>
            <option value="cod">Cash on Delivery</option>
            <option value="online">Online Payment</option>
            <option value="upi">UPI Payment</option>
          </select>
        </div>
        
        <button type="submit" className="booking-button">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookForm;