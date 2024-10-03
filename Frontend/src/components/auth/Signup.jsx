import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../css/flash.css"

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [flashMessage, setFlashMessage] = useState(''); // Flash message state
  const [flashType, setFlashType] = useState(''); // Flash type for success or error
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      // Call your backend signup API
      const response = await axios.post(import.meta.env.VITE_SERVER_URL+'/api/users/signup', {
        username,
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);

      // If signup is successful
      setFlashMessage('Signup Successful! Redirecting to login...');
      setFlashType('success');
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate('/');
      }, 2000); // 2 second delay before redirecting
    } catch (error) {
      // If signup fails
      setFlashMessage('Signup Failed: ' + (error.response?.data?.message || 'Something went wrong.'));
      setFlashType('error');
    }
  };

  // Automatically clear the flash message after 3 seconds
  useEffect(() => {
    if (flashMessage) {
      const timer = setTimeout(() => {
        setFlashMessage('');
      }, 3000);
      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [flashMessage]);

  return (
    <div className="container">
      <div className="form-box">
        <div className="header-form">
          <h4 className="text-primary text-center">
            <i className="fa fa-user-circle" style={{ fontSize: '110px' }}></i>
          </h4>
        </div>
        
        <div className="body-form">
          {/* Flash Message */}
          {flashMessage && (
            <div className={`flash-message ${flashType}`}>
              {flashMessage}
            </div>
          )}
          
          <form>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-user"></i>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-envelope"></i>
                </span>
              </div>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
              </div>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-block"
              onClick={handleSignup}
            >
              SIGNUP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
