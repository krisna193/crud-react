import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import { Link } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()

  useEffect(() => {
    getUsers();
  }, [])

  const onDelete = (u) => {
    if (!window.confirm("anda yakin ingin menghapus user ini?")){

      return
    }
    axiosClient.delete(`/users/${u.id}`)
    .then(() => {
      setNotification("User berhasil Dihapus")
      getUsers()
    })

  }

 
  const getUsers = () => {
    setLoading(true)
    axiosClient.get('/users')
    .then(({data}) => {
      setLoading(false)      
      setUsers(data.data);
    })
    .catch(() => {
      setLoading(false)
    })
  }

  
  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>Users</h1>
        <Link to="/users/new" className='btn-add'>Tambah Data</Link>
      </div>
      <div className='card animated fadeInDown'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Tanggal Buat</th>             
              <th>Action</th>
            </tr>
          </thead>
          { loading && <tbody>
            <tr>
              <td colSpan="5" className="text-center">
                  loading...
              </td>
            </tr>
          </tbody>
          }
            {!loading &&
            <tbody>
            {users.map(u => (
               <tr>
               <td>{u.id}</td>
               <td>{u.name}</td>
               <td>{u.email}</td>
               <td>{u.created_at}</td>               
               <td>
                 <Link to={'/users/'+u.id} className='btn-edit'>Edit</Link>
                 &nbsp;
                 <button onClick={ev => onDelete(u)} className='btn-delete'>Delete</button>
               </td>
             </tr>
            ))}
          </tbody>
          }
        </table>
      </div>
    </div>
  );
}
