import React, { useState } from 'react';
import { API } from '../api';

function Register({ setUser, setPage }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if(!username || !email || !password) return alert("Fill all fields");
    try {
      const res = await API.post('/auth/register', { username, email, password });
      setUser(res.data);
      setPage('home');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div style={{padding:'20px'}}>
      <h3>Register</h3>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} /><br/>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br/>
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
