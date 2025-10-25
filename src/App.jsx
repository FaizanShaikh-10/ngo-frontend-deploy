// src/App.jsx (Minimal for deployment test)

import React from 'react';

function App() {
  return (
    <div style={{ padding: '50px', textAlign: 'center', backgroundColor: '#f0f0f0' }}>
      <h1>Deployment Test Success!</h1>
      <p>The core application is running without crashing.</p>
      <p>We can now re-enable routing and features.</p>
      <a href="/login" style={{ textDecoration: 'none', color: 'blue' }}>Go to Login Path</a>
    </div>
  );
}

export default App;