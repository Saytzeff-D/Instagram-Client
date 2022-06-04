import React from 'react';
import { Outlet } from 'react-router-dom';

function Dashboard(props) {
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
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Dashboard;