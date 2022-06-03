import React from 'react';

function Login(props) {
    return (
        <div>
            <div className="container w-25 mt-5 bg-white border" style={{fontFamily: 'Gabriola'}}>
                <p className="text-center h1 font-weight-bold pt-5">Instagram</p>
                <div className="mt-2 mx-4" >
                    <input type="text" className='form-control m-1' placeholder="Phone number, username or email" />
                    <input type="text" className='form-control m-1' placeholder="Password" />
                    <button className='btn btn-primary  btn-block mx-1 my-3 font-weight-bold'>Log In</button>
                    <hr/>
                    <p className='text-center'><a href='www.facebook.com' className='text-center'>Forgot Password?</a></p>
                </div>
            </div>
            <div className='container w-25 mt-3 bg-white border' style={{fontFamily: 'Gabriola'}}>
                <p className='text-center pt-3'>Don't have an account? <a href='/register' className='font-weight-bold'>Sign up</a> </p>
            </div>
        </div>
    );
}

export default Login;   