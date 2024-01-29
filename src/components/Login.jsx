import axios from 'axios';
import React from 'react';
import PasswordReset from './PasswordReset';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function Login({ loginFormData , setLoginFormData , setUser , setToken }) {
    const handleLogin = async  (event) => {
        event.preventDefault();
        const user = {
            userName : loginFormData.userName,
            password : loginFormData.password
        }
        try {
            await axios.post('http://localhost:6001/users/login',user)
                .then((response) => {
                    setUser(response.data.user);
                    setToken(response.data.token);

                    // lets save the user details and token in localstorage
                    window.localStorage.setItem('user',JSON.stringify(response.data.user));
                    window.localStorage.setItem('token',response.data.token);
                    console.log(response.data.user);
                })
        } catch (error) {
            console.log(error);
        }

    }

    const handleForgotPassword = async (event) => {
        event.preventDefault();
        try {
            const userName = loginFormData.userName ;
            console.log(userName)
            await axios.get(`http://localhost:6001/users/forgot/${userName}`)
            .then((response)=>{
                window.alert(response.data.message)
                
            })
        } catch (error) {
            console.log(response.error.data.message);
        }
    }
  return (
    <div>
        <Form onSubmit={ handleLogin }>
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
            < Form.Group className="mb-3" >
                <Form.Label>Password</Form.Label>
                <Form.Control 
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
            <Button 
                variant="success" 
                type='submit'
                >Login</Button>
        </Form>   
    </div>
  )
}

export default Login;