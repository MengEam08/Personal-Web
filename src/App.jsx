import React from 'react';
import './App.css';
import Home from './page/home/Home';
import NavbarComponent from './components/navbar/NavbarComponent';
const App = () => {
  return (
      <div className="font-suwannaphum">
        <NavbarComponent />
        <Home />
      </div>
  );
}

export default App;
