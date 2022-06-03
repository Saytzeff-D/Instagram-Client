import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Register(props) {
    const url = 'http://localhost:7000/register'
    const [disable, setDisable] = useState(true)
    const [error, setError] = useState('')
    const [spinStyle, setSpinStyle] = useState('')
    const [userInfo, setUserInfo] = useState({mobileNumber: '', email: '', fullName: '', userName: '', pword: ''})
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
        })
    }

    const handleInput =(key, value)=>{
        setUserInfo({...userInfo, [key]: value})
        if (userInfo.mobileNumber !== '' && userInfo.email !== '' && userInfo.fullName !== '' && userInfo.userName !== '' && userInfo.pword !== '') {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }
    return (
        <div>
            <div className="container w-25 mt-4 bg-white border" style={{fontFamily: 'Gabriola'}}>
                <p className="text-center h1 font-weight-bold pt-5">Instagram</p>
                <p className='container text-center text-secondary py-1 h5 w-75'>Sign up to see photos and videos from your friends</p>
                <div className="mt-2 mx-4" >
                {
                error !== '' 
                ? 
                <div className='alert alert-danger alert-dismissible'>
                <button type="button" className="close" data-dismiss="alert">&times;</button>
                    {error}
                </div> 
                : 
                <p></p>
                }
                    <input onChange={(e)=>handleInput(e.target.name, e.target.value)} type="text" className='form-control m-1' name='mobileNumber' value={userInfo.mobileNumber} placeholder="Mobile Number" />

                    <input onChange={(e)=>handleInput(e.target.name, e.target.value)} type="text" className='form-control m-1' name='email' value={userInfo.email} placeholder="E-mail" />

                    <input onChange={(e)=>handleInput(e.target.name, e.target.value)} type="text" className='form-control m-1' name='fullName' value={userInfo.fullName} placeholder="Full Name" />

                    <input onChange={(e)=>handleInput(e.target.name, e.target.value)} type="text" className='form-control m-1' name='userName' value={userInfo.userName} placeholder="Username" />

                    <input onChange={(e)=>handleInput(e.target.name, e.target.value)} type="password" className='form-control m-1' name='pword' value={userInfo.pword} placeholder="Password" />

                    <button className='btn btn-primary  btn-block mx-1 my-3 font-weight-bold'  onClick={registerUser} disabled={disable}><span>Sign Up</span> <span className={spinStyle}></span> </button>
                    <hr/>
                    <p className='text-center'>By signing up, you agree to our Terms , Data Policy and Cookies Policy.</p>
                </div>
            </div>
            <div className='container w-25 mt-2 bg-white border' style={{fontFamily: 'Gabriola'}}>
                <p className='text-center pt-3'>Have an account? <a href='/login' className='font-weight-bold'>Log In</a> </p>
            </div>
        </div>
    )
}

export default Register;  