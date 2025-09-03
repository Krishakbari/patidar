import React from 'react';
import './index.css';
import { Route, Routes } from "react-router-dom";

import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';


const App = () => {


  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
