import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import './Login.css';

axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

async function loginUser(credentials) {
  const loginURL = 'http://localhost:3000/index.php/login?user='+credentials.user+'&password='+credentials.password;

  return axios.post(loginURL)
    .then(response => response.data);
}

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const {setToken} = useContext(AppContext);

  const [userNotValid, setUserNotValid] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser({
      user,
      password
    });
    if(response.token) {
      setToken(response.token);
      navigate('/movies');
    }
    else {
      setUserNotValid(true);
    }
  };

  return (
    <div className='centeredDiv'>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type='text' onChange={e => setUser(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type='password' onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type='submit'>Login</button>
        </div>
      </form>
      {userNotValid && 
        <p className='error-message'>
          The user does not exist in our system. Please try again.
        </p>}
    </div>
  );
};

export default Login;