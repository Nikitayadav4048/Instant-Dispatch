import  { useState } from 'react';
import './Form.css';

const Form = () => {
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

  const vehiclePrices = {
    scooter: 50,
    bike: 75,
    miniTruck: 150,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      price: name === 'vehicle' ? vehiclePrices[value] : formData.price,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data to the backend or perform any actions needed
    console.log('Booking Details:', formData);
  };

  return (
    <div className="booking-form-container mt-36">
      <h1 className="booking-heading ">Book a Rider</h1>
      <form onSubmit={handleSubmit} className="booking-form flex flex-col">
        <p className='mb-2 text-2xl'>Personal Details</p>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          placeholder="Your Name" 
          required 
          autoComplete='off'
        />

        <input 
          type="text" 
          name="contact" 
          value={formData.contact} 
          onChange={handleChange} 
          placeholder="Contact Information" 
          required 
           autoComplete='off'
        />

        <input 
          type="text" 
          name="pickupAddress" 
          value={formData.pickupAddress} 
          onChange={handleChange} 
          placeholder="Pickup Address" 
          required 
           autoComplete='off'
        />

        <input 
          type="text" 
          name="deliveryAddress" 
          value={formData.deliveryAddress} 
          onChange={handleChange} 
          placeholder="Delivery Address" 
          required 
           autoComplete='off'
        />

        <p className='mb-2 text-2xl'>Parcel Details</p>
        <input 
          type="text" 
          name="parcelDescription" 
          value={formData.parcelDescription} 
          onChange={handleChange} 
          placeholder="Parcel Description" 
          required 
           autoComplete='off'
        />

        <input 
          type="text" 
          name="weight" 
          value={formData.weight} 
          onChange={handleChange} 
          placeholder="Weight" 
          required 
           autoComplete='off'
        />
       
       

        <p className='mb-2 text-2xl'>Vehicle Selection</p>
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

        <p className='mb-2 text-2xl'>Booking Details</p>
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
          <h3>Total Price: ${formData.price}</h3>
        </div>
        <button type="submit" className="booking-button text-dark ">Confirm Booking</button>
      </form>
    </div>
  );
};

export default Form;
