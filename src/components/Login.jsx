import React, { useState, useEffect } from 'react';
import '../scss/components/style.scss'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(null);

  // Handle redirection after successful login
  useEffect(() => {
    if (loginSuccess) {
      const timer = setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [loginSuccess]);

  const mockLoginAPI = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (formData.email === 'user@example.com' && formData.password === 'Password@123') {
          resolve({ success: true, token: 'mock-token' });
        } else {
          resolve({ success: false, message: 'Invalid email or password' });
        }
      }, 1000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(null);

    if (validate()) {
      setIsSubmitting(true);

      try {
        const response = await mockLoginAPI();

        if (response.success) {
          localStorage.setItem('authToken', response.token);
          setLoginSuccess(true);
        } else {
          setLoginError(response.message);
        }
      } catch (error) {
        setLoginError('Something went wrong. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const validate = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
      valid = false;
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
      valid = false;
    } else if (!/[^A-Za-z0-9]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one special character';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center min-vh-100">
      <div className="login-card card shadow-5">
        <div className="card-body p-5">


          {loginSuccess ? (
            <div className="text-center">
              <img
                src="https://i.gifer.com/origin/b4/b4d657e7ef262b88eb5f7ac021edda87.gif"
                alt="Loading..."
                className="loading-gif"
                style={{ width: '100px', height: '100px' }}
              />
              <p className="mt-3">Login successful! Redirecting...</p>
            </div>
          ) : (
            <>
              {loginError && (
                <div className="alert alert-danger animate__animated animate__fadeIn">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="text-center mb-4">
                  <h2 className="fw-bold text-primary">Welcome</h2>
                  {/* <p className="text-muted">Please enter your credentials</p> */}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control bg-white ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className={`form-control bg-white ${errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <div className="invalid-feedback">
                      {errors.password}
                    </div>
                  )}
                </div>

                <div className="d-grid mb-3">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Logging in...
                      </>
                    ) : 'Login'}
                  </button>
                </div>

                <div className="text-center">
                  <a href="#forgot-password" className="text-decoration-none">Forgot password?</a>
                </div>
                <div className="text-center mt-4">
                  <p className="text-muted">
                    Don't have an account? <a href="#signup" className="text-decoration-none fw-bold">Sign up</a>
                  </p>
                </div>
              </form>
            </>
          )}


        </div>
      </div>
    </div>
  );
};

export default Login;