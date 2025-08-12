// CareerForm.js
import './CareerForm.css';
import { useState } from 'react';
import axios from 'axios';

const CareerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    experience: '',
    education: '',
    vehicle: '',
    license: false
  });

  const handleChange = e => {
    const { name, value, checked, type } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: val
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/submit', formData);
    } catch (error) {
      console.error('There was an error submitting the form:', error);
    }
  };

  return (
    <div className="career-form-container">
      <form onSubmit={handleSubmit} className="career-form bg-white p-8 rounded-lg shadow-md my-36">
        <div className='flex justify-center py-5'>
          <h2>Register For Job</h2>
        </div>
        <div className="form-group mb-6">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2 text-lg">Name:</label>
          <input type="text" id="name" name="name" required className="form-input w-full p-3 border border-gray-300 rounded-lg" placeholder='Enter you name' onChange={handleChange} />
        </div>
        <div className="form-group mb-6">
          <label htmlFor="age" className="block text-gray-700 font-bold mb-2 text-lg">Age:</label>
          <input type="number" id="age" name="age" required className="form-input w-full p-3 border border-gray-300 rounded-lg" placeholder='Enter you age' onChange={handleChange} />
        </div>
        <div className="form-group mb-6">
          <label htmlFor="experience" className="block text-gray-700 font-bold mb-2 text-lg">Experience:</label>
          <input type="text" id="experience" name="experience" required className="form-input w-full p-3 border border-gray-300 rounded-lg" placeholder='Enter you experience' onChange={handleChange} />
        </div>
        <div className="form-group mb-6">
          <label htmlFor="education" className="block text-gray-700 font-bold mb-2 text-lg">Education:</label>
          <input type="text" id="education" name="education" required className="form-input w-full p-3 border border-gray-300 rounded-lg" placeholder='Enter your education' onChange={handleChange} />
        </div>
        <div className="form-group mb-6">
          <label htmlFor="vehicle" className="block text-gray-700 font-bold mb-2 text-lg">Vehicle:</label>
          <select id="vehicle" name="vehicle" required className="form-select w-full p-3 border border-gray-300 rounded-lg " onChange={handleChange}>
            <option value="cycle">Cycle</option>
            <option value="bike">Bike</option>
            <option value="minitruck">Mini Truck</option>
          </select>
        </div>
        <div className="form-group mb-6">
          <label className="block text-gray-700 font-bold mb-2 text-lg">Do you have a license?</label>
          <input type="checkbox" id="license" name="license" className="form-checkbox h-5 w-5 text-blue-600" onClick={handleChange}/>
          <label htmlFor="license" className="ml-2 text-gray-700">Yes</label>
        </div>
        <button type="submit" className="submit-btn text-black p-3 rounded-lg transition duration-300 w-full mt-4">Submit Application</button>
      </form>
    </div>
  );
}

export default CareerForm;
