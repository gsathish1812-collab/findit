import { useState } from 'react';
import api from '../api/axios';

function Login({ onLoginSuccess, goToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/login', { email, password });
      localStorage.setItem('token', response.data);
      onLoginSuccess();
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Sign in to your FindIt account</p>
        <form onSubmit={handleLogin}>
          <div className="field-group">
            <label className="field-label">Email Address</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="field-group">
            <label className="field-label">Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Log In →</button>
        </form>
        <p className="link" onClick={goToRegister}>Don't have an account? Sign up</p>
      </div>
    </div>
  );
}

export default Login;