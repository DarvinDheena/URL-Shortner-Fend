import axios from 'axios';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FormGroup } from 'react-bootstrap';
import config from '../config';
import { useNavigate } from 'react-router-dom';

function PasswordReset({ loginFormData , setLoginFormData , setUser , setToken }) {
    const [ code , setCode ] = useState('');
    const [password,setPassword] = useState('');
    let userName ;
    const navigate = useNavigate();
    const handleSendMail = async (event) => {
        event.preventDefault();
        userName = loginFormData.userName ;
        try{
            await axios.get(`${ config.API_URL}/users/forgot/${ userName}`)
                .then((response) => {
                    window.alert(response.data.message);
                    document.getElementById('code').removeAttribute('style');
                })
        } catch (error) {
            window.alert(error.response.data.message);
        }

    }
     const handleVerifyString = async (event) => {
        event.preventDefault();
        userName = loginFormData.userName ;
        console.log(userName);
        try {
            await axios.get(`${ config.API_URL }/users/forgot/verify/${ code }`)
            .then((response) => {
                window.alert(response.data);
                document.getElementById('newPassword').removeAttribute('style');
            })
        } catch (error) {
            window.alert(error.response.data.message);
        }
     }

     const handleUpdatePassword = async (event) => {
            event.preventDefault();
            userName = loginFormData.userName ;
            try {
                await axios.patch(`${ config.API_URL }/users/forgot/verify/${ userName }`,{"password" : password })
                    .then((response) => {
                        window.alert(response.data.message);
                        navigate('/login')
                    })
            } catch (error) {
                window.alert(error);
            }
     }
     const display = {
        display:'none'
    }
  return (
    <div className='mt-5 w-25 m-auto bg-white p-3 shadow rounded-4'>
     
        <Form>
            <Form.Group className="mb-3" >
                <Form.Label>Email / UserName</Form.Label>
                <Form.Control 
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
            <Button className='mb-3'
                variant="success" 
                onClick={ handleSendMail }
                >Send Email </Button>
            <FormGroup id='code' style={ display }>
                <Form.Label>Enter Code recieve in your email</Form.Label>
                <Form.Control 
                     type='text'
                     value={ code }
                     onChange={ (e) => setCode( e.target.value )}
                />
                <Button className='mt-3 mb-3'
                    variant="success" 
                    onClick={ handleVerifyString }
                    >Verify Code</Button>
            </FormGroup>
            
             <FormGroup id='newPassword' style={ display }>
                <Form.Label>Enter New Password</Form.Label>
                <Form.Control 
                     type='password' 
                     placeholder=' enter new password here'
                     value={ password }
                     onChange={ (e) => setPassword( e.target.value )}
                />
                <Button 
                    className='mt-3'
                    variant="success" 
                    onClick={ handleUpdatePassword }
                    >Update Password</Button>
            </FormGroup>
            
            
        </Form>
    </div>
  )
}

export default PasswordReset;