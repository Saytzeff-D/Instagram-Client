import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Register(props) {
    const url = `${props.serverUrl}register`
    const [disable, setDisable] = useState(true)
    const [error, setError] = useState('')
    const [spinStyle, setSpinStyle] = useState('')
    const [passwordType, setPasswordType] = useState('password')
    const [userInfo, setUserInfo] = useState({mobileNumber: '', email: '', fullName: '', userName: '', pword: '', bio: '', image_url: ''})
    const naviagate = useNavigate()
    const registerUser = ()=>{
        setSpinStyle('spinner-grow spinner-grow-sm')
        setDisable(true)
        axios.post(url, userInfo).then((res)=>{
            if (res.data.msg === 'Success') {
                naviagate('/login')
                setSpinStyle('')
                setDisable(false)
            } else {
                setError(res.data.msg)
                setSpinStyle('')
                setDisable(false)
            }
        }).catch((err)=>{
            setError(err.message)
            setSpinStyle('')
            setDisable(false)
        })
    }

    const handleInput =(key, value)=>{
        setUserInfo({...userInfo, [key]: value})
        if (userInfo.mobileNumber !== '' && userInfo.email !== '' && userInfo.fullName !== '' && userInfo.userName !== '' && userInfo.pword !== '') {
            setDisable(false)
            setSpinStyle('')
        } else {
            setDisable(true)
        }
    }
    const togglePassword =()=>{
        if(passwordType==="password")
        {
         setPasswordType("text")
         return;
        }
        setPasswordType("password")
      }
    const closeAlert = ()=>{
        setError('')
    }
    return (
        <div>
            <div className='d-flex justify-content-center'>
            <div className="col-md-4 col-lg-3 col-sm-8 mt-4 bg-white border" style={{fontFamily: 'Gabriola'}}>
                <p className="text-center h1 font-weight-bold pt-5">Instagram</p>
                <p className='container text-center text-secondary py-1 h5 w-75'>Sign up to see photos and videos from your friends</p>
                <div className="mt-2 mx-4" >
                {
                error !== '' 
                ? 
                <div className='alert alert-danger alert-dismissible'>
                <button type="button" className="close" data-dismiss="alert" onClick={closeAlert}>&times;</button>
                    {error}
                </div> 
                : 
                <p></p>
                }
                    <input onChange={(e)=>handleInput(e.target.name, e.target.value)} type="text" className='form-control m-1' name='mobileNumber' value={userInfo.mobileNumber} placeholder="Mobile Number" />

                    <input onChange={(e)=>handleInput(e.target.name, e.target.value)} type="text" className='form-control m-1' name='email' value={userInfo.email} placeholder="E-mail" />

                    <input onChange={(e)=>handleInput(e.target.name, e.target.value)} type="text" className='form-control m-1' name='fullName' value={userInfo.fullName} placeholder="Full Name" />

                    <input onChange={(e)=>handleInput(e.target.name, e.target.value)} type="text" className='form-control m-1' name='userName' value={userInfo.userName} placeholder="Username" />

                    <div className='input-group m-1'>
                        <input onChange={(e)=>handleInput(e.target.name, e.target.value)} type={passwordType} className='form-control' name='pword' value={userInfo.pword} placeholder="Password" />
                        <div className='input-group-append'>
                            <button onClick={togglePassword} className='btn btn-dark'>{passwordType === 'password' ? <b>Show</b> : <b>Hide</b>}</button>
                        </div>
                    </div>

                    <button className='btn btn-primary  btn-block mx-1 my-3 font-weight-bold'  onClick={registerUser} disabled={disable}><span>Sign Up</span> <span className={spinStyle}></span> </button>
                    <hr/>
                    <p className='text-center'>By signing up, you agree to our Terms , Data Policy and Cookies Policy.</p>
                </div>
            </div>
            </div>
            <div className='d-flex justify-content-center'>
            <div className='col-md-4 col-lg-3 col-sm-8 mt-2 bg-white border' style={{fontFamily: 'Gabriola'}}>
                <p className='text-center pt-3'>Have an account? <a href='/login' className='font-weight-bold'>Log In</a> </p>
            </div>
            </div>
        </div>
    )
}

export default Register;  