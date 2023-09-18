import React from 'react';
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import Navigationbar from './Component/Navbar.jsx';
import AppRouter from './router/Routes.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigationbar />
        <AppRouter />
      </div>
    </Router>
  );
}

export default App;
