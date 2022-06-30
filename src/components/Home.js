import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

function Home(props) {
    const {url} = props
    const navigate = useNavigate()
    const user = useOutletContext()
    const [postTray, setPostTray] = useState([])
    const [allUsers, setAllUsers] = useState([])

    useEffect(()=>{
        axios.get(`${url}fetchAllPost`).then((res)=>{
            console.log(res.data)
            setPostTray(res.data)
        })
        axios.get(`${url}listOfUsers`).then((res)=>{
            let filteredUser = res.data.filter((eachUser, )=>(eachUser.userId !== user.userId)) 
            setAllUsers(filteredUser)
            console.log(filteredUser)
    })

    }, [navigate, url, user.userId])
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

                                {
                                    postTray.length !== 0
                                    ?
                                    (
                                        postTray.map((post, index)=>(
                                            (<div key={index} className='col-md-8 col-sm-10 border bg-white rounded-lg mb-2'>
                                                <div className='d-flex'>
                                                    <div className='p-2'>
                                                    {
                                                        post.image_url !== ''
                                                        ?
                                                        <img src={post.image_url} alt="userPhoto" width="50px" className='rounded-circle'/>
                                                        :
                                                        <img src={require("../assets/avatar.jpg")} alt="userPhoto" width="50px" className='rounded-circle'/>
                                                    }
                                                    </div>
                                                    <div className='p-2'>
                                                        <span className='font-weight-bold text-lowercase'>{post.userName}</span><br/>
                                                        <span className='text-muted'>{post.bio}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    {
                                                        post.mediaType === 'video'
                                                        ?
                                                        <video src={post.mediaUrl} className='w-100' controls autoPlay />
                                                        :
                                                        <img src={post.mediaUrl} className='w-100' height='300px' alt='post' />
                                                    }
                                                </div>
                                                <div className='p-1'>
                                                    <i className='fa fa-heart-o fa-lg px-1'></i> <i className='fa fa-comment-o fa-lg px-2'></i>
                                                </div>
                                                <div className='px-1 py-2'>
                                                    <p><b className='text-lowercase'>{post.userName}</b> <span className='text-muted'>{post.caption}</span></p>
                                                    <p className='text-muted'>{post.created}</p>
                                                </div>
                                                <hr/>
                                                <div className='row w-100'>
                                                    <div className='col-11'>
                                                        <input className='form-control border-0' placeholder='Add a comment...' />
                                                    </div>
                                                    <div className='col-1 mt-2'>
                                                        <p className='text-primary'>Post</p>
                                                    </div>
                                                </div>
                                            </div>)
                                        ))
                                    )
                                    :
                                    <div className='col-md-8 col-sm-10 border bg-white rounded-lg'>
                                        <p className='text-muted'>No posts yet</p>
                                    </div>
                                }
                        </div>
                    </div>
                    <div className='col-md-6 d-none d-md-block'>
                        <div className='row d-flex justify-content-start'>
                            <div className='col-md-8'>
                                <div className='position-fixed'>
                                    <div className='row'>
                                        <div className='d-flex col-lg-8'>
                                            {
                                                user.image_url !== ''
                                                ?
                                                <img src={user.image_url} alt="profilePic" width="100px" height="100px" className='rounded-circle'/>
                                                :
                                                <img src={require("../assets/avatar.jpg")} alt="noprofilePic" width="100px" height="100px" className='rounded-circle'/>
                                            }
                                            <div className='px-3 py-4'>
                                                <span className='font-weight-bold text-lowercase'>{user.userName}</span><br/>
                                                <span className='text-muted'>{user.fullName}</span>
                                            </div>
                                        </div>
                                        <div className='col-lg-4'></div>
                                    </div>
                                    <p className='text-muted font-weight-bold py-3 px-1'>Suggestions for you</p>
                                    {
                                        allUsers.slice(0, 5).map((eachUser, i)=>(
                                            <div key={i} className='d-flex justify-content-between'>
                                                <div className='d-flex'>
                                                    <div>
                                                        {
                                                            eachUser.image_url !== ''
                                                            ?
                                                            <img src={eachUser.image_url} alt="profilePic" width="40px" height="40px" className='rounded-circle'/>
                                                            :
                                                            <img src={require("../assets/avatar.jpg")} alt="noprofilePic" width="40px" height="40px" className='rounded-circle'/>
                                                        }
                                                    </div>
                                                    <div>
                                                        <p className='font-weight-bold p-2 text-lowercase' style={{fontSize: '15px'}}>{eachUser.userName}</p>
                                                    </div>
                                                </div>
                                                <div className='font-weight-bold text-primary' style={{cursor: 'pointer'}}>
                                                    Follow
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <p className='text-muted' style={{fontSize: '10px'}}>About . Help . Press . API . Jobs . Privacy . Terms . Locations . Language . English</p>
                                    <p className='text-muted h6 py-1' style={{fontSize: '10px'}}>© 2022 INSTAGRAM FROM META</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;