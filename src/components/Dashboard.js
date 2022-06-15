import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

function Dashboard(props) {
    const url = `${props.serverUrl}userData`
    const [user, setUser] = useState({})    
    const navigate = useNavigate()
    const [pageReady, setPageReady] = useState(false)

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
                setPageReady(true)
            }).catch((err)=>{
                sessionStorage.removeItem('loginId')
                navigate('/dashboard/')
            })
        }
    }, [])
    return (
        <div>
            <div className="navigation">
                <div className="logo">
                    <Link className="font-weight-bold h1" to="/dashboard">
                    Instagram
                    </Link>
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
                    <Link to="/" className="navigation-link">
                    <i className="fa fa-compass"></i>
                    </Link>
                    <Link className="navigation-link notifica" to='/'>
                    <i className="fa fa-heart">
                        <div className="notification-bubble-wrapper">
                        <div className="notification-bubble">
                            <span className="notifications-count">99</span>
                        </div>
                        </div>
                    </i>
                    </Link>
                    <div className="navigation-link dropdown">
                        {
                            pageReady
                            ?
                                user.image_url !== ''
                                ?
                                <i className='fa'><img src={user.image_url} alt="profilePic" width="25px" height="25px" className='rounded-circle' /></i>
                                :
                                <i className='fa'><img src={require("../assets/avatar.jpg")} alt="profilePic" width="25px" height="25px" className='rounded-circle'/></i>
                            :
                            ''
                        }
                        <div className='dropdown-content'>
                            <Link className='' to={`/${user.userName}`}>My Profile</Link>
                            <Link className='' to="/dashboard/editProfile">Edit Profile</Link>
                        </div>
                    </div>
                    <Link to="/" id="signout" className="navigation-link">
                    <i className="fa fa-sign-out-alt"></i>
                    </Link>
                    <p className='d-block d-md-none text-primary font-weight-bold' style={{cursor: 'pointer'}} onClick={logOut} >Logout</p>
                </div>
            </div>
            <br/> <br/>
            {
                pageReady 
                ?
                <Outlet context={user} />
                :
                <div className='d-flex justify-content-center'>
                    <img src={require('../assets/loadPage.gif')} className="" style={{backgroundColor: 'red'}} alt="pageGIF"/>
                </div>
            }
        </div>
    )
}

export default Dashboard;