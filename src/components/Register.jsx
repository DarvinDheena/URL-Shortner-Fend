import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import config from '../config';
import { useNavigate } from 'react-router-dom';

function Register({ registerFormData , setRegisterFormData }) {
    const navigate = useNavigate();
    const handleRegister = async  (event) =>{
        event.preventDefault();
        const newUser = {
            firstName : registerFormData.firstName,
            lastName : registerFormData.lastName,
            userName : registerFormData.userName,
            password : registerFormData.password 
        }
        try {
          await axios.post(`${ config.API_URL }/users/register`,newUser)
          .then ((response) => {
            window.alert(response.data.message);
            navigate('/login')
          })
             
        } catch (error) {
            window.alert(error.response.data.message);
        }
    }
    return (
    <div className='mt-5 w-25 m-auto bg-white p-3 shadow rounded-4'>
        <h1 className='mb-4 fs-2'> Registeration form</h1>
        <Form onSubmit={ handleRegister}>
            <Form.Group className="mb-3" >
                <Form.Label>FirstName</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder='FirstName'
                    required
                    value={ registerFormData.firstName }
                    onChange={(e) =>  setRegisterFormData( {
                        ...registerFormData,
                        firstName : e.target.value 
                    })}
                />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>LastName</Form.Label>
                <Form.Control 
                     type="text" 
                     placeholder='LastName'
                     required
                     value={ registerFormData.lastName }
                     onChange={(e) =>  setRegisterFormData( {
                         ...registerFormData,
                         lastName : e.target.value 
                     } )}
                />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Email / UserName</Form.Label>
                <Form.Control 
                     type="email" 
                     placeholder='Email'
                     required
                     value={ registerFormData.userName }
                     onChange={(e) =>  setRegisterFormData( {
                         ...registerFormData,
                         userName : e.target.value 
                     } )}
                />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Password</Form.Label>
                <Form.Control 
                     type="password" 
                     placeholder='password'
                     required
                     value={ registerFormData.password }
                     onChange={(e) =>  setRegisterFormData( {
                         ...registerFormData,
                         password : e.target.value 
                     } )}
                />
            </Form.Group>
            <Button 
                variant="success" 
                size="lg" 
                type='submit'
                >Register / Signup</Button>
        </Form>
        
    </div>
  )
}

export default Register;