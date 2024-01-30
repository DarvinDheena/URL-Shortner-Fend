import axios from 'axios';
import React from 'react';
import PasswordReset from './PasswordReset';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import config from '../config';


function Login({ loginFormData , setLoginFormData , setUser , setToken }) {
    const navigate = useNavigate();
    const handleLogin = async  (event) => {
        event.preventDefault();
        const user = {
            userName : loginFormData.userName,
            password : loginFormData.password
        }
        try {
            await axios.post(`${ config.API_URL}/users/login`,user)
                .then((response) => {
                    setUser(response.data.user);
                    setToken(response.data.token);

                    // lets save the user details and token in localstorage
                    window.localStorage.setItem('user',JSON.stringify(response.data.user));
                    window.localStorage.setItem('token',response.data.token);
                    navigate('/createurl')

                })
        } catch (error) {
            window.alert(error.response.data.message);
        }

    }
    const handleForgotPassword = (event) => {
        event.preventDefault();
        navigate('/forgot')
    }
  return (
    
    <div className='container'>
        <div className=' row justify-content-center align-items-center vh-100' >
        <Form onSubmit={ handleLogin } className='col-3 bg-white p-4 shadow rounded-5 mb-5'>
             <Form.Group className="mb-2" >  
                <Form.Label>Email / UserName</Form.Label>
                <Form.Control 
                className='mt-2'
                    type="email" 
                    placeholder='Email'
                    required
                    value={ loginFormData.userName }
                    onChange={(e) =>  setLoginFormData( {
                        ...loginFormData,
                        userName : e.target.value 
                    } )}
                />
            </Form.Group>
            < Form.Group className="mb-3" >
                <Form.Label className='mb-0'>Password</Form.Label>
                <Form.Control 
                    className='mt-2'
                     type="password" 
                     placeholder='password'
                     required
                     value={ loginFormData.password }
                     onChange={(e) =>  setLoginFormData( {
                         ...loginFormData,
                         password : e.target.value 
                     } )}
                />
            </Form.Group>
            <div className=''>
                <Button variant="success" type='submit' className='px-3 w-100'>Login</Button>
                <Button variant="success" onClick={ handleForgotPassword } className='px-3 w-100 mt-2'>ForgotPassword</Button>
            </div>
        </Form>   
        </div>
      
    </div>
  )
}

export default Login;