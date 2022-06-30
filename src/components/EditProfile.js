import axios from 'axios';
import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import Footer from '../Footer';

function EditProfile(props) {
    const navigate = useNavigate()
    const [editBtnDisable, setEditBtnDisable] = useState(true)
    const user  = useOutletContext()
    const [editObj, setEditObj] = useState(user)
    const {serverUrl} = props
    const [photoUploadStatus, setPhotoUploadStatus] = useState(false)
    const [editStatus, setEditStatus] = useState(false)
    const pickPhoto =()=>{
        document.getElementById('photo').click()
    }
    const uploadPhoto =(e)=>{
        setPhotoUploadStatus(true)
        const photo = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(photo)
        reader.onload=()=>{
            let photoObject = {userId: editObj.userId, photo: reader.result, photoName: editObj.userName}
            // console.log(photoObject)
            axios.post(`${serverUrl}profilePhoto`, photoObject).then((res)=>{
                console.log(res)
                navigate(0)
            }).catch((err)=>{
                setPhotoUploadStatus(false)
                console.log(err)
                alert('Profile Photo Upload fail')
            })
        }
    }
    const handleInputChange = (e)=>{
        setEditBtnDisable(false)
        setEditObj({...editObj, [e.target.name]: e.target.value})
    }
    const handleSubmit = ()=>{
        setEditStatus(true)
        axios.post(`${serverUrl}editProfile`, editObj).then((res)=>{
            console.log(res.data)
            navigate(0)
        }).catch((err)=>{
            console.log(err.message)
            setEditStatus(false)
            alert(err.message)
        })
    }
    return (
        <div className='mt-5'>
            <div className='container w-75 mx-auto border bg-white'>
                <div className='d-flex px-2 py-2'>
                    <div>
                        {
                            photoUploadStatus
                            ?
                            <span className='spinner-border text-danger'></span>
                            :
                                user.image_url !== ''
                                ?
                                <img src={user.image_url} alt="profilePic" width="50px" height="50px" className='rounded-circle'/>
                                :
                                <img src={require("../assets/avatar.jpg")} alt="profilePic" width="50px" height="50px" className='rounded-circle'/>
                        }
                    </div>
                    <div className='mx-3'>
                        <span className='font-weight-bold'>{user.userName}</span><br/>
                        <input type="file" id="photo" className='d-none' onChange={uploadPhoto} />
                        <p onClick={pickPhoto} className='font-weight-bold text-primary' style={{cursor: 'pointer'}}>Change Profile Photo</p>
                    </div>
                </div>
                <div className='my-2 container-fluid'>
                    <div className='col-2'></div>
                    <div className='col-md-8'>
                        <div className='form-group'>
                            <div className='form-row'>
                                <label className='col-md-2 font-weight-bold'>Name</label>
                                <div className='col-md-10'>
                                    <input onChange={handleInputChange} className='form-control' name="fullName" value={editObj.fullName} />
                                    <br/>
                                    <p className='text-muted' style={{fontSize: '15px'}}>Help people discover your account by using the name you're known by: either your full name, nickname, or business name.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-2'></div>

                    <div className='col-2'></div>
                    <div className='col-md-8'>
                        <div className='form-group'>
                            <div className='form-row'>
                                <label className='col-md-2 font-weight-bold'>Username</label>
                                <div className='col-md-10'>
                                    <input onChange={handleInputChange} className='form-control' name="userName" value={editObj.userName} />
                                    <br/>
                                    <p className='text-muted' style={{fontSize: '15px'}}>In most cases, you'll be able to change your username back to {user.userName} for another 14 days. Learn More.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-2'></div>

                    <div className='col-2'></div>
                    <div className='col-md-8'>
                        <div className='form-group'>
                            <div className='form-row'>
                                <label className='col-md-2 font-weight-bold'>Website</label>
                                <div className='col-md-10'>
                                    <input className='form-control' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-2'></div>

                    <div className='col-2'></div>
                    <div className='col-md-8'>
                        <div className='form-group'>
                            <div className='form-row'>
                                <label className='col-md-2 font-weight-bold'>Bio</label>
                                <div className='col-md-10'>
                                    <textarea onChange={handleInputChange} className='form-control' name="bio" value={editObj.bio}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-2'></div>

                    <div className='col-2'></div>
                    <div className='col-md-8'>
                        <div className='form-group'>
                            <div className='form-row'>
                                <div className='col-md-2'></div>
                                <div className='col-md-10'>
                                    <p className='text-muted font-weight-bold h6'>Personal Information</p>
                                    <p className='text-muted' style={{fontSize: '15px'}}>Provide your personal information, even if the account is used for a business, a pet or something else. This won't be a part of your public profile.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-2'></div>

                    <div className='col-2'></div>
                    <div className='col-md-8'>
                        <div className='form-group'>
                            <div className='form-row'>
                                <label className='col-md-2 font-weight-bold'>E-mail</label>
                                <div className='col-md-10'>
                                    <input onChange={handleInputChange} className='form-control' name="email" value={editObj.email} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-2'></div>

                    <div className='col-2'></div>
                    <div className='col-md-8'>
                        <div className='form-group'>
                            <div className='form-row'>
                                <label className='col-md-2 font-weight-bold'>Phone Number</label>
                                <div className='col-md-10'>
                                    <input onChange={handleInputChange} className='form-control' name="mobileNumber" value={editObj.mobileNumber} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-2'></div>

                    <div className='col-2'></div>
                    <div className='col-md-8'>
                        <div className='form-group'>
                            <div className='form-row'>
                                <div className='col-md-2 font-weight-bold'></div>
                                <div className='col-md-10'>
                                    <button className='btn btn-primary' disabled={editBtnDisable} onClick={handleSubmit} >Submit</button>
                                    {
                                        editStatus
                                        ?
                                        <span className='spinner-border text-danger'></span>
                                        :
                                        ''
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-2'></div>


                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default EditProfile;