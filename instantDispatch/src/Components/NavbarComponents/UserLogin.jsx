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
    const payload = isSignup ? formData : { email: formData.email, password: formData.password };
    
    try {
      const response = await fetch(`http://localhost:4001/api/users${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect based on role
        if (data.user.role === 'rider') {
          navigate('/rider-form');
        } else {
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

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <form className="form-container flex flex-col items-center" onSubmit={handleSubmit}>
        <div className="contain py-14 flex flex-col items-center gap-3 mt-10 shadow-lg">
          <h2>{isSignup ? 'User Registration' : 'User Login'}</h2>
          
          {isSignup && (
            <div className="form-group flex flex-col gap-1">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="p-2 rounded-md"
                required
              />
            </div>
          )}

          <div className="form-group flex flex-col gap-1">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="p-2 rounded-md"
              required
            />
          </div>

          <div className="form-group flex flex-col gap-1">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="p-2 rounded-md"
              required
            />
          </div>

          {isSignup && (
            <div className="form-group flex flex-col gap-1">
              <label>Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="p-2 rounded-md"
                required
              >
                <option value="customer">Customer</option>
                <option value="rider">Rider</option>
              </select>
            </div>
          )}

          <div className="form-group flex justify-center">
            <button type="submit" className="px-14 py-2 submit-btn rounded-md mt-5">
              {isSignup ? 'Sign Up' : 'Login'}
            </button>
          </div>

          <div className="form-group flex justify-center">
            <button 
              type="button" 
              onClick={() => setIsSignup(!isSignup)}
              className="text-blue-500 underline mt-3"
            >
              {isSignup ? 'Already have an account? Login' : 'Need an account? Sign Up'}
            </button>
          </div>
        </div>
      </form>

      {showPopup && (
        <div className="popup-overlay top-popup" onClick={closePopup}>
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

export default UserLogin;