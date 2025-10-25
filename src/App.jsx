// src/App.jsx

import React from 'react';
import { Container } from 'react-bootstrap';

function App() {
  return (
    // This is the simplest possible component. If this fails, the error is in main.jsx or a global dependency.
    <Container className="p-5">
      <h1>Deployment Test Success!</h1>
      <p>This is a temporary test page.</p>
    </Container>
  );
}

export default App;