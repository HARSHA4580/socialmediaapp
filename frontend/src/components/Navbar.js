import React from 'react';

function Navbar({ setPage, user, setUser }) {

  const handleLogout = () => {
    setUser(null);
    setPage('login');
  };

  return (
    <nav style={{ padding: '10px', background: 'lightblue', display: 'flex', justifyContent: 'space-between' }}>
      <h2 style={{ cursor: 'pointer' }} onClick={() => setPage('home')}>Social Media App</h2>
      <div>
        {!user ? (
          <>
            <button onClick={() => setPage('login')}>Login</button>
            <button onClick={() => setPage('register')}>Register</button>
          </>
        ) : (
          <>
            <span>Welcome, {user.username}</span>
            <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
