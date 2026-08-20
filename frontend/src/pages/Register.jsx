import { useState } from 'react';
import api from '../api/axios';

function Register({ goToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users/register', { name, email, password });
      setMessage('Registered successfully! Redirecting to login...');
      setTimeout(() => goToLogin(), 1000);
    } catch (err) {
      setMessage('Registration failed. Try a different email.');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="auth-subtitle">Join FindIt to post and find lost items</p>
        <form onSubmit={handleRegister}>
          <div className="field-group">
            <label className="field-label">Full Name</label>
            <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="field-group">
            <label className="field-label">Email Address</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="field-group">
            <label className="field-label">Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {message && <p className={message.includes('success') ? 'link' : 'error'}>{message}</p>}
          <button type="submit">Sign Up →</button>
        </form>
        <p className="link" onClick={goToLogin}>Already have an account? Log in</p>
      </div>
    </div>
  );
}

export default Register;