import React from 'react';
import Home from "./pages/HomePage"
import PageForGameDescription from "./pages/PageForGameDescription"
// @ts-ignore //Routes have error, but still work. Ignore this.
import { Route, Routes } from 'react-router-dom' 
import './App.css';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/games" element={<PageForGameDescription />}/>
      </Routes>
    </>

  );
}

export default App;
