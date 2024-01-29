import axios from 'axios';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FormGroup } from 'react-bootstrap';

function PasswordReset({ loginFormData , setLoginFormData , setUser , setToken }) {
    const [ code , setCode ] = useState('');
    const [password,setPassword] = useState('');
    let userName ;
    const handleSendMail = async (event) => {
        event.preventDefault();
        userName = loginFormData.userName ;
        try{
            await axios.get(`http://localhost:6001/users/forgot/${ userName}`)
                .then((response) => {
                    console.log(response.data.message);
                })
        } catch (error) {
            console.log(error.response.data.message);
        }

    }
     const handleVerifyString = async (event) => {
        event.preventDefault();
        userName = loginFormData.userName ;
        console.log(userName);
        try {
            await axios.get(`http://localhost:6001/users/forgot/verify/${ code }`)
            .then((response) => {
                console.log(response.data);
            })
        } catch (error) {
            console.log(error.response.data.message);
        }
     }

     const handleUpdatePassword = async (event) => {
            event.preventDefault();
            userName = loginFormData.userName ;
            try {
                await axios.patch(`http://localhost:6001/users/forgot/verify/${ userName }`,{"password" : password })
                    .then((response) => {
                        console.log(response.data.message);
                    })
            } catch (error) {
                console.log(error);
            }
     }

  return (
    <div>
     
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
            <Button 
                variant="success" 
                onClick={ handleSendMail }
                >Send Email </Button>
            <FormGroup>
                <Form.Label>Enter Code recieve in your email</Form.Label>
                <Form.Control 
                     type='text'
                     value={ code }
                     onChange={ (e) => setCode( e.target.value )}
                />
            </FormGroup>
            <Button 
                variant="success" 
                onClick={ handleVerifyString }
                >Verify Code</Button>
             <FormGroup>
                <Form.Label>Enter New Password</Form.Label>
                <Form.Control 
                     type='password' 
                     placeholder=' enter new password here'
                     value={ password }
                     onChange={ (e) => setPassword( e.target.value )}
                />
            </FormGroup>
            <Button 
                variant="success" 
                onClick={ handleUpdatePassword }
                >Verify Code</Button>
            
        </Form>
    </div>
  )
}

export default PasswordReset;