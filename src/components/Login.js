import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    // const url = 'http://localhost:7000/login'
    const url = 'https://node-server-instagram.herokuapp.com/login'
    const [disable, setDisable] = useState(true)
    const [spinStyle, setSpinStyle] = useState('')
    const [loginInfo, setLoginInfo] = useState({loginData: '', pword: ''})
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleInput =(key, value)=>{
        setLoginInfo({...loginInfo, [key]: value})
        if (loginInfo.loginData !== '' && loginInfo.pword !== '') {
            setDisable(false)
            setSpinStyle('')
        } else {
            setDisable(true)
        }
    }

    const loginUser =()=>{
        setSpinStyle('spinner-grow spinner-grow-sm')
        setDisable(true)
        if (/^([a-z0-9]+)([@])([a-z]+)([.])([a-z]{1,3})(([.])([a-z]{1,2}))?$/g.test(loginInfo.loginData)) {
            let info = {email: loginInfo.loginData, pword: loginInfo.pword}
            axios.post(url, info).then((res)=>{
                if (res.data.msg === 'Success') {
                    console.log('User Login')
                    setSpinStyle('')
                    setDisable(false)
                } else {
                    setError(res.data.msg)
                    setSpinStyle('')
                    setDisable(false)
                }
            })
        } else if(/^(([+])([0-9]{1,3}))?([\d]{1,11})$/g.test(loginInfo.loginData)) {
            let info = {mobileNumber: loginInfo.loginData, pword: loginInfo.pword}
            axios.post(url, info).then((res)=>{
                if (res.data.msg === 'Success') {
                    console.log('User Login')
                    setSpinStyle('')
                    setDisable(false)
                } else {
                    setError(res.data.msg)
                    setSpinStyle('')
                    setDisable(false)
                }
            })
        } else{
            let info = {userName: loginInfo.loginData, pword: loginInfo.pword}
            axios.post(url, info).then((res)=>{
                if (res.data.msg === 'Success') {
                    navigate('/dashboard')
                    setSpinStyle('')
                    setDisable(false)
                } else {
                    setError(res.data.msg)
                    setSpinStyle('')
                    setDisable(false)
                }
            })
        }
    }
    return (
        <div>
            <div className='d-flex justify-content-center'>
            <div className="col-sm-8 col-md-4 col-lg-3 mt-5 bg-white border" style={{fontFamily: 'Gabriola'}}>
                <p className="text-center h1 font-weight-bold pt-5">Instagram</p>
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
                    <input onChange={(e)=>handleInput(e.target.name, e.target.value)} type="text" className='form-control m-1' name='loginData' value={loginInfo.loginData} placeholder="Phone number, username or email" />
                    <input onChange={(e)=>handleInput(e.target.name, e.target.value)} type="text" className='form-control m-1' name='pword' value={loginInfo.pword} placeholder="Password" />
                    <button className='btn btn-primary  btn-block mx-1 my-3 font-weight-bold' onClick={loginUser} disabled={disable}><span>Log In</span> <span className={spinStyle}></span></button>
                    <hr/>
                    <p className='text-center'><a href='www.facebook.com' className='text-center'>Forgot Password?</a></p>
                </div>
            </div>
            </div>
            <div className='d-flex justify-content-center'>
            <div className='col-sm-8 col-md-4 col-lg-3 mt-2 bg-white border' style={{fontFamily: 'Gabriola'}}>
                <p className='text-center pt-3'>Don't have an account? <a href='/register' className='font-weight-bold'>Sign up</a> </p>
            </div>
            </div>
        </div>
    );
}

export default Login;   