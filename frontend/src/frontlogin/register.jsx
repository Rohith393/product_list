import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [message, setmessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlefunc = async () => {
    if (!username || !password) {
      setmessage("Please fill out both fields");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        username: username,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("Server response:", response); // Log response for debugging

      // Check for success status
      if (response.status === 200) {  // HTTP 200 indicates success
        alert('Registration successful');
        navigate('/login'); // Redirect to login
        setusername('');  // Clear username field
        setpassword('');  // Clear password field
      } else {
        setmessage("Unexpected response format");
      }
      
    } catch (error) {
      console.log('Error during registration:', error); // Log the error for debugging
      if (error.response) {
        setmessage("Error: " + error.response.data.message);
      } else {
        setmessage("Error: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h3 className='headingcomp'>Create New Account</h3>
      <div className="gapcomp">
        <input 
          className="inputstyles"
          name="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => { setusername(e.target.value) }}
        />
        <input 
          className="inputstyles"
          name="password"
          type="password" 
          placeholder="Password"
          value={password}
          onChange={(e) => { setpassword(e.target.value) }}
        />
        <button 
          onClick={handlefunc} 
          className="buttoncompo" 
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        {message && <p style={{ color: "white" }}>{message}</p>}
      </div>
    </div>
  );
};

export default Registration;
