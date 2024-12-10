  import { useState } from "react";
  import axios from 'axios';
  import { UseAuth } from "../AuthContext";
  import { useNavigate } from "react-router-dom";

  const Login = () => {
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [message, setmessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { loginverif } = UseAuth();
    const navigate = useNavigate();

    const handlefunc = async () => {
      if (!username || !password) {
        setmessage("Please fill out both fields");
        return;
      }

      setLoading(true);
      try {
      
        const response = await axios.post('http://localhost:5000/api/users/login', {
          username,
          password,
        });

        if (response.status === 200) {        
          alert('Login successful');
          setusername(''); 
          setpassword('');  
          loginverif(); 
          navigate('/add'); 
        } else {
          setmessage("Unexpected response format");
        }
      } catch (error) {
        console.log('Error during login:', error); 
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
        <h3 className='headingcomp'>Login</h3>
        <div className="gapcomp">
          <input 
            className="inputstyles"
            name="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            disabled={loading}
          />
          <input 
            className="inputstyles"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            disabled={loading}
          />
          <button 
            onClick={handlefunc} 
            className="buttoncompo" 
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p style={{ color: "white" }} aria-live="polite">{message}</p>
        </div>
      </div>
    );
  };

  export default Login;
