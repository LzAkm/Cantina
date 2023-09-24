import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigationbar from './Component/Navbar.jsx';
import AppRouter from './router/Routes.jsx';
import { Provider } from 'react-redux';
import store from './store/store.jsx'; 

function App() {
  return (
    <Provider store={store}> 
      <Router>
        <div className="App">
          <Navigationbar />
          <AppRouter />
        </div>
      </Router>
    </Provider>
  );
}

export default App;