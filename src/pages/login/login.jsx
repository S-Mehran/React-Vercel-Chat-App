import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import useAxios from '../../hooks/useAxios';
import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const { loading, error: apiError, fetchData } = useAxios();

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Validation errors
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} True if valid
   */
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Validate form data
   * @returns {object} Object with validation errors
   */
  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 1) {
      newErrors.password = 'Please enter your password';
    }

    return newErrors;
  };

  /**
   * Handle input change
   * @param {Event} e - Input change event
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  /**
   * Handle remember me toggle
   * @param {Event} e - Checkbox change event
   */
  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);

    // Store email in localStorage if checked
    if (e.target.checked) {
      localStorage.setItem('rememberedEmail', formData.email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
  };

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    // Validate form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Make API request
    try {
      const response = await fetchData({
        url: '/auth/login',
        method: 'POST',
        data: {
          email: formData.email.trim(),
          password: formData.password,
        },
      });

      // Handle successful login
      if (response) {
        setSuccessMessage('Login successful! Redirecting...');

        // Store token and user data in localStorage
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));

        // Clear form
        setFormData({
          email: '',
          password: '',
        });
        setErrors({});

        // Redirect to dashboard/chat after 1.5 seconds
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (err) {
      // Error is handled by useAxios hook
      console.error('Login error:', err);
    }
  };

  /**
   * Handle forgot password
   */
  const handleForgotPassword = () => {
    // TODO: Implement forgot password functionality
    alert('Forgot password feature coming soon!');
  };

  /**
   * Handle reset form
   */
  const handleReset = () => {
    setFormData({
      email: '',
      password: '',
    });
    setErrors({});
    setSuccessMessage('');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your chat account</p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="alert alert--success">
            <span className="alert__icon">✓</span>
            {successMessage}
          </div>
        )}

        {/* API Error Message */}
        {apiError && (
          <div className="alert alert--error">
            <span className="alert__icon">✕</span>
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`form-input ${errors.email ? 'form-input--error' : ''}`}
              placeholder="you@example.com"
              disabled={loading}
              autoComplete="email"
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <div className="form-label-row">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <button
                type="button"
                className="form-forgot-link"
                onClick={handleForgotPassword}
              >
                Forgot?
              </button>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`form-input ${
                errors.password ? 'form-input--error' : ''
              }`}
              placeholder="••••••••"
              disabled={loading}
              autoComplete="current-password"
            />
            {errors.password && (
              <span className="form-error">{errors.password}</span>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="form-checkbox">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={handleRememberMe}
              disabled={loading}
            />
            <label htmlFor="rememberMe" className="form-checkbox-label">
              Remember me
            </label>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
              isLoading={loading}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="large"
              fullWidth
              onClick={handleReset}
              disabled={loading}
            >
              Clear
            </Button>
          </div>
        </form>

        {/* Login Footer */}
        <div className="login-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="login-link">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
