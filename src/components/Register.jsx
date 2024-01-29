import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Register({ registerFormData , setRegisterFormData }) {
    const handleRegister = async  (event) =>{
        event.preventDefault();
        const newUser = {
            firstName : registerFormData.firstName,
            lastName : registerFormData.lastName,
            userName : registerFormData.userName,
            password : registerFormData.password 
        }
        try {
          await axios.post('http://localhost:6001/users/register',newUser)
          .then ((response) => {
            console.log(response.data);
          })
             
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
    return (
    <div>
        <h1> Registeration form</h1>
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