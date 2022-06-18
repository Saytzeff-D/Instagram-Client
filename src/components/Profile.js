import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../Footer';
import NotFound from '../NotFound';

function Profile(props) {
    const navigate = useNavigate()
    const {name} = useParams()
    const {url} = props
    const [profile, setProfile] = useState({})
    const [pageReady, setPageReady] = useState(false)

    useEffect(()=>{
            axios.post(`${url}fetchProfile`, {userName: name}).then((res)=>{
                console.log(res.data)
                setProfile(res.data)
                setPageReady(true)
            }).catch((err)=>{
                console.log(err)
                setProfile(null)
                setPageReady(true)
            })
    }, [name, url])
    return (
        <div className='mt-5 d-flex justify-content-center'>
            {
                pageReady
                ?
                profile == null
                ?
                <NotFound/>
                :
                <div className='col-sm-12 col-md-8'>
                <div className='d-flex'>
                    <div>
                        <img alt="profilePic" src={profile.image_url} className='rounded-circle img-fluid' width="130px" height="130px" />
                    </div>
                    <div className='px-5'>
                        <p style={{fontWeight: '300', fontSize: '2rem'}}>{profile.userName}</p>
                        <button className='btn border' onClick={()=>{navigate('/dashboard/editProfile')}} >Edit Profile</button>
                        <div className='d-none d-lg-block'>
                            <div><span className='px-3'><b>0</b> posts</span> <span className='px-3'><b>0</b> followers</span> <span className='px-3'><b>0</b> following</span></div>
                            <div className='pt-3'>
                                <span className='font-weight-bold'>{profile.fullName}</span> <br/>
                                <span>{profile.bio}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-block d-lg-none'>
                    <div className='py-3'>
                        <span className='font-weight-bold'>{profile.fullName}</span> <br/>
                        <span>{profile.bio}</span>
                    </div>
                    <div className='row border-top'>
                        <div className='col-4 text-center'>
                        <span className='pt-2'><b>0</b> posts</span>
                        </div>
                        <div className='col-4 text-center'>
                        <span className='pt-2'><b>0</b> followers</span>
                        </div>
                        <div className='col-4 text-center'>
                        <span className='pt-2'><b>0</b> following</span>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className='row'>
                    <div className='col-md-6'>
                        <img src={require('../assets/mediaUpsell.jpg')} alt="profile" className='w-100' />
                    </div>
                    <div className='col-md-6 py-5'>
                        <p className='text-center h5'>Start capturing and sharing your moments.</p>
                        <p className='text-center'>Get the app to share your first photo or video.</p>
                    </div>
                </div>
                <Footer/>
            </div>
            :
            <img src={require('../assets/loadPage.gif')} alt="pageReady" />
            }
        </div>
    );
}

export default Profile;