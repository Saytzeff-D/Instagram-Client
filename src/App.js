import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login'
import Register from './components/Register';

function App() {
  return (
    <div>
       <Routes>
         <Route path="/" element={<Navigate replace to="/login" />} />
         <Route path='/login' element={<Login/>} />
         <Route path='/register' element={<Register/>} />
       </Routes>
    </div>
  )
}

export default App;
