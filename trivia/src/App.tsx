import React from 'react';
import logo from './logo.svg';
import './App.css';
import Trivia from './components/Trivia';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
     <Trivia/>
    </div>
  );
}

export default App;
