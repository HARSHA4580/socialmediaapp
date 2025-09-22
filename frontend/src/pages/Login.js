import React, { useState } from 'react';
import { API } from '../api';

function Login({ setUser, setPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await API.post('/auth/login', { email, password });
      setUser(res.data);
      setPage('home');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div style={{padding:'20px'}}>
      <h3>Login</h3>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br/>
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
