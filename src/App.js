import logo from './logo.svg';
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header"
import Weather from './components/Weather'

function App() {
  return (
    <>
    <Header></Header>
    <Weather></Weather>
    </>
  );
}

export default App;
