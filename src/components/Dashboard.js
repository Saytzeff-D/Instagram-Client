import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function Dashboard(props) {
    // const url = 'http://localhost:7000/userData'
    const url = 'https://node-server-instagram.herokuapp.com/userData'
    const [user, setUser] = useState({})
    
    const navigate = useNavigate()

    const logOut =()=>{
        sessionStorage.removeItem('loginId')
        navigate('/login')
    }
    useEffect(()=>{
        if(sessionStorage.getItem('loginId') == null){
            navigate('/login')
        }else{
            const uniqueId = {_id: sessionStorage.getItem('loginId')}
            axios.post(url, uniqueId).then((res)=>{
                setUser(res.data)
            })
        }
    })
    return (
        <div>
            <div className="navigation">
                <div className="logo">
                    <a className="font-weight-bold h1" href="/dashboard">
                    Instagram
                    </a>
                </div>
                <div className='navigation-search-container'>
                    <i className="fa fa-search"></i>
                    <input className="search-field" type="text" placeholder="Search"/>
                    <div className="search-container">
                    <div className="search-container-box">
                        <div className="search-results">

                        </div>
                    </div>
                    </div>
                </div>
                <div className="navigation-icons">
                    <a href="/" className="navigation-link">
                    <i className="fa fa-compass"></i>
                    </a>
                    <a className="navigation-link notifica" href='/'>
                    <i className="fa fa-heart">
                        <div className="notification-bubble-wrapper">
                        <div className="notification-bubble">
                            <span className="notifications-count">99</span>
                        </div>
                        </div>
                    </i>
                    </a>
                    <a href="/" className="navigation-link">
                    <i className="fa fa-user-circle"></i>
                    </a>
                    <a href="/" id="signout" className="navigation-link">
                    <i className="fa fa-sign-out-alt"></i>
                    </a>
                    <p className='d-block d-md-none text-primary font-weight-bold' style={{cursor: 'pointer'}} onClick={logOut} >Logout</p>
                </div>
            </div>
            <br/> <br/>
            <Outlet context={user} />
        </div>
    )
}

export default Dashboard;