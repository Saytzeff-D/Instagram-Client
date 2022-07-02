import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './components/Dashboard';
import EditProfile from './components/EditProfile';
import Home from './components/Home';
import Login from './components/Login'
import Profile from './components/Profile';
import Register from './components/Register';

function App() {
  // const server = 'http://localhost:7000/'
  const server = 'https://sql-server-instagram.herokuapp.com/'
  // const server = 'https://node-server-instagram.herokuapp.com/'
  return (
    <div>
       <Routes>
         <Route path="/" element={<Navigate replace to="/login" />} />
         <Route path='/login' element={<Login serverUrl={server}/>} />
         <Route path='/register' element={<Register serverUrl={server}/>} />
         <Route path='/dashboard' element={<Dashboard serverUrl={server}/>} >
           <Route path='/dashboard/' element={<Home url={server} />} />
           <Route path='/dashboard/editProfile' element={<EditProfile serverUrl={server} />} />
          <Route path='/dashboard/:name' element={<Profile url={server} />}></Route>
         </Route>
       </Routes>
    </div>
  )
}

export default App;
