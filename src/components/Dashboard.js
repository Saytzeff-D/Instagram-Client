import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import CreatePost from './CreatePost';

function Dashboard(props) {
    const url = `${props.serverUrl}userData`
    const myRef = useRef()
    const [user, setUser] = useState({})    
    const navigate = useNavigate()
    const [pageReady, setPageReady] = useState(false)

    const logOut =()=>{
        sessionStorage.removeItem('loginId')
        navigate('/login')
    }
    useEffect(()=>{
        console.log(user._id)
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
    }, [url, navigate])
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
                    <Link className="navigation-link" to='/dashboard'>
                    <i className="fa fa-home"></i>
                    </Link>
                    <Link className="navigation-link" to='/dashboard'>
                    <i className="fa fa-plus" data-toggle="modal" data-target="#createPost"></i>
                    </Link>
                    <Link to="/explore" className="navigation-link">
                    <i className="fa fa-compass"></i>
                    </Link>
                    <div className="navigation-link dropdown">
                        {
                            pageReady
                            ?
                                user.image_url !== ''
                                ?
                                <i className='fa'><img src={user.image_url} alt="profilePic" width="25px" height="25px" className='rounded-circle' /></i>
                                :
                                <i className='fa'><img src={require("../assets/avatar.jpg")} alt="profilePic" width="25px" height="25px" className='rounded-circle dropdown-toggle' data-toggle="dropdown" /></i>
                            :
                            ''
                        }
                        <div className='dropdown-content'>
                            <Link className='dropdown-item' to={`/dashboard/${user.userName}`}>My Profile</Link>
                            <Link className='dropdown-item' to="/dashboard/editProfile">Edit Profile</Link>
                            <div className='dropdown-divider'></div>
                            <a onClick={logOut} style={{cursor: 'pointer'}}>Logout</a>
                        </div>
                    </div>
                </div>
            </div>
            <br/> <br/>
            {
                pageReady 
                ?
                <div>
                    <div className='modal fade' id="createPost" data-backdrop="static">
                        <div className='modal-dialog modal-dialog-centered'>
                            <div className='modal-content'>
                                <div className='modal-header'>
                                    <h6 className='modal-title'>Create Post</h6>
                                    <button type="button" className="close" data-dismiss="modal" onClick={()=>myRef.current.discardPost()} >&times;</button>
                                </div>
                                <div className='modal-body'>
                                    <CreatePost url={props.serverUrl} ref={myRef} userId={user._id} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Outlet context={user} />
                </div>
                :
                <div className='d-flex justify-content-center'>
                    <img src={require('../assets/loadPage.gif')} className="" style={{backgroundColor: 'red'}} alt="pageGIF"/>
                </div>
            }
        </div>
    )
}

export default Dashboard;