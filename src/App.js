import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Login from './components/Login'
import Register from './components/Register';

function App() {
  // const server = 'http://localhost:7000/'
  const server = 'https://node-server-instagram.herokuapp.com/'
  return (
    <div>
       <Routes>
         <Route path="/" element={<Navigate replace to="/login" />} />
         <Route path='/login' element={<Login serverUrl={server}/>} />
         <Route path='/register' element={<Register serverUrl={server}/>} />
         <Route path='/dashboard' element={<Dashboard serverUrl={server}/>} >
           <Route path='/dashboard/' element={<Home />} />
         </Route>
       </Routes>
    </div>
  )
}

export default App;
