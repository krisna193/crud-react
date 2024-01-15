import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';

export default function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState(null)
  const {setUser, setToken} = useStateContext()

const onSubmit = (ev) => {
  ev.preventDefault()
  const payload = {    
    email: emailRef.current.value,
    password: passwordRef.current.value,   
  } 
  setErrors(null)
  axiosClient.post ('/login', payload)
  .then(({data}) => {
    setUser(data.user)
    setToken(data.token)
  })
  .catch(err => {  
    console.log(err);
    const response = err.response;
    if (response && response.status === 422){     
      if (response.data.errors) {   
      setErrors(response.data.errors)
    }else{
      setErrors({
        email: [response.data.message]
      })
    }
  }
  })
}

  return (
    <div className='login-signup-form animated fadeInDown'>
      <div className='form'>
        <h1 className='title'>
          Login Dulu Bang
        </h1>
        {errors && <div className='alert'>
          {Object.keys(errors).map(key => (
            <p key={key}>{errors[key][0]}</p>
          ))}
        </div>
        }
        <form onSubmit={onSubmit}>
          <input ref={emailRef} type="email" placeholder='email'/>
          <input ref={passwordRef} type="password" placeholder='password'/>
          <button className='btn btn-block'>Login</button>
          <p className='message'>
            Belum Punya Akun? <Link to="/signup">Daftar</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
