import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('home');

  return (
    <div>
      <Navbar setPage={setPage} user={user} setUser={setUser} />
      {page === 'home' && <Home user={user} />}
      {page === 'login' && <Login setUser={setUser} setPage={setPage} />}
      {page === 'register' && <Register setUser={setUser} setPage={setPage} />}
    </div>
  );
}

export default App;
