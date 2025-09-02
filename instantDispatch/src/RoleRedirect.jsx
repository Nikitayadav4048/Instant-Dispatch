import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const RoleRedirect = () => {
  console.log("RoleRedirect component initialized"); // Debugging log

  const { isAuthenticated, user } = useAuth0();
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Is authenticated:", isAuthenticated); // Debugging log
    console.log("User:", user); // Debugging log

    if (isAuthenticated) {
      fetch(`http://localhost:5000/api/users/${user.email}`)
        .then(response => response.json())
        
        .then(data => {

          setRole(data.role);
          console.log("Fetched role:", data.role); 
        })
        .catch(err => console.error("Error fetching user role:", err));
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (role === 'rider') {
      // Check if this is a new signup or existing login
      const isNewSignup = localStorage.getItem('isNewSignup');
      
      if (isNewSignup === 'true') {
        console.log("New signup - Redirecting to Rider Form");
        localStorage.removeItem('isNewSignup'); // Clean up flag
        navigate('/rider-form');
      } else {
        console.log("Existing login - Redirecting to Rider Dashboard");
        navigate('/rider-dashboard');
      }
    }
  }, [role, navigate]);

  return null; 
};
export default RoleRedirect;
