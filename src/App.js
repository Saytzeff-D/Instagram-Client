import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Login from './components/Login'
import Register from './components/Register';

function App() {
  return (
    <div>
       <Routes>
         <Route path="/" element={<Navigate replace to="/login" />} />
         <Route path='/login' element={<Login/>} />
         <Route path='/register' element={<Register/>} />
         <Route path='/dashboard' element={<Dashboard/>} >
           <Route path='/dashboard/' element={<Home />} />
         </Route>
       </Routes>
    </div>
  )
}

export default App;
