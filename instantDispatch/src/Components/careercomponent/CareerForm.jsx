// // CareerForm.js
// import './CareerForm.css';
// import { useState } from 'react';
// import axios from 'axios';

// const CareerForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     age: '',
//     experience: '',
//     education: '',
//     vehicle: '',
//     license: false
//   });

//   const handleChange = e => {
//     const { name, value, checked, type } = e.target;
//     const val = type === 'checkbox' ? checked : value;
//     setFormData({
//       ...formData,
//       [name]: val
//     });
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       await axios.post('/submit', formData);
//     } catch (error) {
//       console.error('There was an error submitting the form:', error);
//     }
//   };

//   return (
//     <div className="career-form-container">
//       <form onSubmit={handleSubmit} className="career-form bg-white p-8 rounded-lg shadow-md my-36">
//         <div className='flex justify-center py-5'>
//           <h2>Register For Job</h2>
//         </div>
//         <div className="form-group mb-6">
//           <label htmlFor="name" className="block text-gray-700 font-bold mb-2 text-lg">Name:</label>
//           <input type="text" id="name" name="name" required className="form-input w-full p-3 border border-gray-300 rounded-lg" placeholder='Enter you name' onChange={handleChange} />
//         </div>
//         <div className="form-group mb-6">
//           <label htmlFor="age" className="block text-gray-700 font-bold mb-2 text-lg">Age:</label>
//           <input type="number" id="age" name="age" required className="form-input w-full p-3 border border-gray-300 rounded-lg" placeholder='Enter you age' onChange={handleChange} />
//         </div>
//         <div className="form-group mb-6">
//           <label htmlFor="experience" className="block text-gray-700 font-bold mb-2 text-lg">Experience:</label>
//           <input type="text" id="experience" name="experience" required className="form-input w-full p-3 border border-gray-300 rounded-lg" placeholder='Enter you experience' onChange={handleChange} />
//         </div>
//         <div className="form-group mb-6">
//           <label htmlFor="education" className="block text-gray-700 font-bold mb-2 text-lg">Education:</label>
//           <input type="text" id="education" name="education" required className="form-input w-full p-3 border border-gray-300 rounded-lg" placeholder='Enter your education' onChange={handleChange} />
//         </div>
//         <div className="form-group mb-6">
//           <label htmlFor="vehicle" className="block text-gray-700 font-bold mb-2 text-lg">Vehicle:</label>
//           <select id="vehicle" name="vehicle" required className="form-select w-full p-3 border border-gray-300 rounded-lg " onChange={handleChange}>
//             <option value="cycle">Cycle</option>
//             <option value="bike">Bike</option>
//             <option value="minitruck">Mini Truck</option>
//           </select>
//         </div>
//         <div className="form-group mb-6">
//           <label className="block text-gray-700 font-bold mb-2 text-lg">Do you have a license?</label>
//           <input type="checkbox" id="license" name="license" className="form-checkbox h-5 w-5 text-blue-600" onClick={handleChange}/>
//           <label htmlFor="license" className="ml-2 text-gray-700">Yes</label>
//         </div>
//         <button type="submit" className="submit-btn text-black p-3 rounded-lg transition duration-300 w-full mt-4">Submit Application</button>
//       </form>
//     </div>
//   );
// }

// export default CareerForm;



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

  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = e => {
    const { name, value, checked, type } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/career', formData);
      setPopupMessage(res.data.message);
      setFormData({
        name: '',
        age: '',
        experience: '',
        education: '',
        vehicle: '',
        license: false
      });
    } catch (error) {
      console.error('Submission error:', error);
      setPopupMessage('Failed to submit application');
    }
    setShowPopup(true);
  };

  const closePopup = () => setShowPopup(false);

  return (
    <div className="career-form-container">
      <form onSubmit={handleSubmit} className="career-form bg-white p-8 rounded-lg shadow-md my-36">
        <div className='flex justify-center py-5'>
          <h2>Register For Job</h2>
        </div>

        {['name', 'age', 'experience', 'education'].map(field => (
          <div key={field} className="form-group mb-6">
            <label htmlFor={field} className="block text-gray-700 font-bold mb-2 text-lg">
              {field.charAt(0).toUpperCase() + field.slice(1)}:
            </label>
            <input
              type={field === 'age' ? 'number' : 'text'}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className="form-input w-full p-3 border border-gray-300 rounded-lg"
              placeholder={`Enter your ${field}`}
            />
          </div>
        ))}

        <div className="form-group mb-6">
          <label htmlFor="vehicle" className="block text-gray-700 font-bold mb-2 text-lg">Vehicle:</label>
          <select
            id="vehicle"
            name="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
            required
            className="form-select w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="">Select vehicle</option>
            <option value="cycle">Cycle</option>
            <option value="bike">Bike</option>
            <option value="minitruck">Mini Truck</option>
          </select>
        </div>

        <div className="form-group mb-6 flex items-center">
          <input
            type="checkbox"
            id="license"
            name="license"
            checked={formData.license}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <label htmlFor="license" className="ml-2 text-gray-700">Do you have a license?</label>
        </div>

        <button type="submit" className="submit-btn text-black p-3 rounded-lg transition duration-300 w-full mt-4">
          Submit Application
        </button>
      </form>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" onClick={closePopup}>
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full text-center" onClick={e => e.stopPropagation()}>
            <p className="mb-4 text-gray-800">{popupMessage}</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerForm;
