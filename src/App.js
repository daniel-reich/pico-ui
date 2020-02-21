import React from 'react';
import './App.css';
import Temperatures from './components/Temperatures';
import Profile from './components/Profile'
import Route from './components/Route';

function App() {
  return (
    <div className="App">

      <Route path="/temperatures" component={<Temperatures/>}/>
      <Route path="/profile" component={<Profile/>}/>
    </div>
  );
}

export default App;
