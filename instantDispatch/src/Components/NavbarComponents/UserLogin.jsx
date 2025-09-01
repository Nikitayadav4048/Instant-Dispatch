// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './RiderForm.css';

// const UserLogin = () => {
//   const navigate = useNavigate();
//   const [isSignup, setIsSignup] = useState(false);
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     role: 'customer'
//   });
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupMessage, setPopupMessage] = useState('');
//   const [popupTitle, setPopupTitle] = useState('');

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const endpoint = isSignup ? '/signup' : '/login';
//     const payload = isSignup ? formData : { email: formData.email, password: formData.password };
    
//     try {
//       const response = await fetch(`http://localhost:4001/api/users${endpoint}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//       });

//       const data = await response.json();

//       if (response.ok) {
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('user', JSON.stringify(data.user));
        
//         // Redirect based on role
//         if (data.user.role === 'rider') {
//           navigate('/rider-form');
//         } else {
//           navigate('/book');
//         }
//         return;
//       } else {
//         setPopupTitle(isSignup ? 'Registration Failed' : 'Login Failed');
//         setPopupMessage(data.message || 'Something went wrong');
//       }
//     } catch (error) {
//       setPopupTitle(isSignup ? 'Registration Failed' : 'Login Failed');
//       setPopupMessage('Unable to connect to server');
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
//           <h2>{isSignup ? 'User Registration' : 'User Login'}</h2>
          
//           {isSignup && (
//             <div className="form-group flex flex-col gap-1">
//               <label>Username</label>
//               <input
//                 type="text"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 placeholder="Enter your username"
//                 className="p-2 rounded-md"
//                 required
//               />
//             </div>
//           )}

//           <div className="form-group flex flex-col gap-1">
//             <label>Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//               className="p-2 rounded-md"
//               required
//             />
//           </div>

//           <div className="form-group flex flex-col gap-1">
//             <label>Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter your password"
//               className="p-2 rounded-md"
//               required
//             />
//           </div>

//           {isSignup && (
//             <div className="form-group flex flex-col gap-1">
//               <label>Role</label>
//               <select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 className="p-2 rounded-md"
//                 required
//               >
//                 <option value="customer">Customer</option>
//                 <option value="rider">Rider</option>
//               </select>
//             </div>
//           )}

//           <div className="form-group flex justify-center">
//             <button type="submit" className="px-14 py-2 submit-btn rounded-md mt-5">
//               {isSignup ? 'Sign Up' : 'Login'}
//             </button>
//           </div>

//           <div className="form-group flex justify-center">
//             <button 
//               type="button" 
//               onClick={() => setIsSignup(!isSignup)}
//               className="text-blue-500 underline mt-3"
//             >
//               {isSignup ? 'Already have an account? Login' : 'Need an account? Sign Up'}
//             </button>
//           </div>
//         </div>
//       </form>

//       {showPopup && (
//         <div className="popup-overlay top-popup" onClick={closePopup}>
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

// export default UserLogin;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RiderForm.css';

const UserLogin = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'customer'
  });
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupTitle, setPopupTitle] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isSignup ? '/signup' : '/login';
    const payload = isSignup ? formData : { email: formData.email, password: formData.password, role: formData.role };

    try {
      const response = await fetch(`http://localhost:4001/api/users${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirect based on action and role
        if (isSignup && data.user.role === 'rider') {
          // New rider signup goes to rider-form first
          navigate('/rider-form');
        } else if (data.user.role === 'rider') {
          // Existing rider login goes to dashboard
          navigate('/rider-dashboard');
        } else {
          // Customer goes to booking page
          navigate('/book');
        }
        return;
      } else {
        setPopupTitle(isSignup ? 'Registration Failed' : 'Login Failed');
        setPopupMessage(data.message || 'Something went wrong');
      }
    } catch (error) {
      setPopupTitle(isSignup ? 'Registration Failed' : 'Login Failed');
      setPopupMessage('Unable to connect to server');
    }

    setShowPopup(true);
  };

  const closePopup = () => setShowPopup(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border border-orange-100 relative">
        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent mb-6">
          {isSignup ? 'Create an Account' : 'Welcome Back'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isSignup && (
            <div>
              <label className="block text-gray-700 font-medium mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 border-orange-200"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 border-orange-200"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 border-orange-200"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">{isSignup ? 'Sign up as' : 'Login as'}</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 border-orange-200"
              required
            >
              <option value="customer">Customer</option>
              <option value="rider">Rider</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold rounded-lg shadow-md hover:from-orange-600 hover:to-orange-500 transform hover:scale-[1.02] transition-all duration-300"
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <p
          className="text-center text-orange-600 mt-4 cursor-pointer hover:underline"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? 'Already have an account? Login' : 'Need an account? Sign Up'}
        </p>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center border border-orange-100">
            <h3 className="text-lg font-bold text-gray-800 mb-2">{popupTitle}</h3>
            <p className="text-gray-600 mb-4">{popupMessage}</p>
            <button
              onClick={closePopup}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transform hover:scale-[1.05] transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserLogin;
