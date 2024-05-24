import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../Utils/utils';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from reloading the page
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, { username: email, password: password });
      localStorage.setItem('token', response.data.token); // Store the token in local storage
      window.location = '/'; // Redirect to home page or wherever you want
    } catch (error) {
      console.error('Login failed:', error.response.data.error);
      alert('Invalid login credentials');
    }
  }; 

  return (
    <section className="vh-100" style={{ backgroundColor: '#9A616D' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: '1rem' }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img src="/dhitilogo.png" alt="login form" className="img-fluid" style={{ borderRadius: '1rem 0 0 1rem' }} />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">

                    <form onSubmit={handleSubmit}>

                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                        <span className="h1 fw-bold mb-0">Welcome Dhiti Admin</span>
                      </div>

                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Login into your account</h5>

                      <div className="form-outline mb-4">
                        <input type="email" id="form2Example17" className="form-control form-control-lg"
                               value={email} onChange={e => setEmail(e.target.value)} />
                        <label className="form-label" htmlFor="form2Example17">Email address</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input type="password" id="form2Example27" className="form-control form-control-lg"
                               value={password} onChange={e => setPassword(e.target.value)} />
                        <label className="form-label" htmlFor="form2Example27">Password</label>
                      </div>

                      <div className="pt-1 mb-4">
                        <button className="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                      </div>

                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
