import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [errors, setErrors] = useState(null)
  const {setUser, setToken} = useStateContext()

  const onSubmit = (ev) => {
   
    ev.preventDefault()
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value
    }
    console.log(payload);
    axiosClient.post ('/signup', payload)
    .then(({data}) => {
      setUser(data.user)
      setToken(data.token)
    })
    .catch(err => {
      console.log(err);
      const response = err.response;
      if (response && response.status === 422){        
        setErrors(response.data.errors);
      }
    })
  }

  return (
    <div className='login-signup-form animated fadeInDown'>
      <div className='form'>
        <h1 className='title'>
          Daftar
        </h1>
        {errors && <div className='alert'>
          {Object.keys(errors).map(key => (
            <p key={key}>{errors[key][0]}</p>
          ))}
        </div>
        }
        <form onSubmit={onSubmit}>
          <input ref={nameRef} placeholder='Nama'/>
          <input ref={emailRef} type="email" placeholder='email'/>
          <input ref={passwordRef} type="password" placeholder='password'/>
          <input ref={passwordConfirmationRef} type="password" placeholder='password konfirmasi'/>
          <button className='btn btn-block'>Login</button>
          <p className='message'>
            Sudah Punya Akun? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
