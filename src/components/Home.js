import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

function Home(props) {
    const navigate = useNavigate()
    const user = useOutletContext()
    const logOut =()=>{
        sessionStorage.removeItem('loginId')
        navigate('/login')
    }
    return (
        <div className=''>
            <div className='container-fluid mt-5'>
                <div className='row w-100'>
                    <div className='col-md-6'>
                        <div className='row d-flex justify-content-end'>
                            <div className='col-md-8 col-sm-10 border bg-white rounded-lg mb-3'>
                                <img src={require('../assets/instagram.jpg')} alt='NewPicture' width="70px" />
                                <p className='text-muted'>instagram</p>
                            </div>

                            <div className='col-md-8 col-sm-10 border bg-white rounded-lg'>
                                <p className='text-muted'>No posts yet</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6 d-none d-md-block'>
                        <div className='row d-flex justify-content-start'>
                            <div className='col-md-8'>
                                <div className='row'>
                                    <div className='d-flex col-lg-8'>
                                        {
                                            user.image_url !== ''
                                            ?
                                            <img src={user.image_url} alt="profilePic" width="100px" height="100px" className='rounded-circle'/>
                                            :
                                            <img src={require("../assets/avatar.jpg")} alt="profilePic" width="100px" height="100px" className='rounded-circle'/>
                                        }
                                        <div className='px-3 py-4'>
                                            <span className='font-weight-bold text-lowercase'>{user.userName}</span><br/>
                                            <span className='text-muted'>{user.fullName}</span>
                                        </div>
                                    </div>
                                    <div className='col-lg-4'>
                                    <p className='float-right text-primary font-weight-bold' style={{cursor: 'pointer'}} onClick={logOut} >Logout</p>
                                    </div>
                                </div>
                                <p className='text-muted font-weight-bold py-3 px-1'>Suggestions for you</p>
                                <p className='text-muted' style={{fontSize: '10px'}}>About . Help . Press . API . Jobs . Privacy . Terms . Locations . Language . English</p>
                                <p className='text-muted h6 py-1' style={{fontSize: '10px'}}>© 2022 INSTAGRAM FROM META</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;