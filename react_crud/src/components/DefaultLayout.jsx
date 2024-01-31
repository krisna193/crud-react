import React, { useEffect } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import Dashboard from './../views/Dashboard';
import axiosClient from '../axios-client';

export default function DefaultLayout() {
  const {user, token, notification, setUser, setToken} = useStateContext()

  if(!token){
    return <Navigate to = "/login"/>
  }

  const onLogout = (ev) =>{
    ev.preventDefault()

    axiosClient.post('/logout')
    .then(() => {
      setUser({})
      setToken(null)
    }
    )
  }


  useEffect(()=>{
    axiosClient.get('/user')
    .then(({data}) => {
      setUser(data)
    })
  }, [])

  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
      </aside>
      <div className='content'>
      <header>
        <div>
        header
        </div>
        <div>
       {user.name}
       <a className='btn-logout' href='#' onClick={onLogout}>Logout</a>
        </div>
      </header>
      <main>
      <Outlet/>
      </main>
      
      {notification &&
      <div className='notification'>
        {notification}
      </div>
}
      </div>
    </div>
  );
}
