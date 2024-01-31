import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import { Link } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

export default function Fotos() {
  const [foto, setFotos] = useState([]);
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()

  useEffect(() => {
    getFotos();
  }, [])

  const onDelete = (u) => {
    if (!window.confirm("anda yakin ingin menghapus user ini?")){

      return
    }
    axiosClient.delete(`/foto/${u.id}`)
    .then(() => {
      setNotification("User berhasil Dihapus")
      getFotos()
    })

  }

 
  const getFotos = () => {
    setLoading(true)
    axiosClient.get('/foto')
    .then(({data}) => {
      setLoading(false)      
      setFoto(data.data);
    })
    .catch(() => {
      setLoading(false)
    })
  }

  
  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>Foto</h1>
        <Link to="/foto/new" className='btn-add'>Tambah Data</Link>
      </div>
      <div className='card animated fadeInDown'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Judul foto</th>
              <th>Tanggal Unggah</th>
              <th>Deskripsi Foto</th>             
              <th>Lokasi File</th>             
              <th>ID Album</th>             
              <th>ID User</th>             
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
            {foto.map(u => (
               <tr>
               <td>{u.id}</td>
               <td>{u.judul_foto}</td>
               <td>{u.tanggal_unggah}</td>
               <td>{u.deskripsi_foto}</td>               
               <td>{u.lokasi_file}</td>               
               <td>{u.id_album}</td>               
               <td>{u.id_user}</td>                                        
               <td>
                 <Link to={'/foto/'+u.id} className='btn-edit'>Edit</Link>
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
