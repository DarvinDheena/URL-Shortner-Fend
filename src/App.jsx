import { useEffect, useState } from 'react'
import CreateURL from './components/CreateURL'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import { BrowserRouter as Router , Link, Route, Routes } from 'react-router-dom'
import './App.css'
import PasswordReset from './components/PasswordReset'


function App() {
  const [ registerFormData , setRegisterFormData] = useState({
    firstName : '',
    lastName : '',
    userName : '',
    password : ''
  })

  const [ loginFormData , setLoginFormData] = useState({
    userName : '',
    password : ''
  }) 

  const [user,setUser] = useState(null);
  const [token,setToken] = useState(null);

  useEffect(() => {
    const user = window.localStorage.getItem('user');
    const token = window.localStorage.getItem('token');

    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
    }
  }, []);
  

  return (
   <div className='flex-container'>
      <div>
        <h1>URL Shortner Application</h1>
      </div>
      <Router>
        <div>
          <Link to='/signup'>Signup</Link>
        </div>
        <div>
          <Link to='/login'> Login</Link>
        </div>
        <Routes>
          <Route path='/' element ={ <Dashboard /> }></Route>
          <Route 
            path='/signup' 
            element={ <Register 
                        registerFormData = { registerFormData }
                        setRegisterFormData={ setRegisterFormData }
                      /> }>
         </Route>
         <Route 
            path='/login' 
            element={ <Login 
                        loginFormData = { loginFormData }
                        setLoginFormData={ setLoginFormData }
                        setUser={ setUser }
                        setToken={ setToken }
                      /> }>
         </Route>
         <Route 
            path='/forgot' 
            element = { <PasswordReset 
                          loginFormData = { loginFormData }
                          setLoginFormData={ setLoginFormData }
                          setUser={ setUser }
                          setToken={ setToken }
                      /> }>
         </Route>
        </Routes>
      </Router>
   </div>
  )
}

export default App
