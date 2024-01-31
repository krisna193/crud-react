import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from './../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

export default function FotoForm() {
  const {id} = useParams()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const {setNotification} = useStateContext()
  const [foto, setFoto] = useState( {
    id_foto: null,
    judul_foto: '',
    tanggal_unggah: 'date',
    lokasi_file: '',
    id_album: '',
    id_user: ''
  })

  if(id) {
    useEffect( () => {
      setLoading(true)
      axiosClient.get(`/foto/${id}`)
        .then(({data}) => {
          setLoading(false)             
          setFoto(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (foto.id) {
      axiosClient.put(`/foto/${foto.id}`, foto)
      .then(() => {
        setNotification("Foto berhasil Diedit")
        navigate('/foto')
      })
      .catch(err => {        
        const response = err.response;
        if (response && response.status === 422){        
          setErrors(response.data.errors);
        }
      })
    }else {
      axiosClient.post(`/foto`, foto)
      .then(() => {
        setNotification("Foto berhasil Dibuat")
        navigate('/foto')
      })
      .catch(err => {        
        const response = err.response;
        if (response && response.status === 422){        
          setErrors(response.data.errors);
        }
      })
    }
     
    
  }

  
  return (
    <>
      {foto.id && <h1>Edit Foto: {foto.judul_foto}</h1>}
      {!foto.id && <h1>New Foto</h1>} 
    <div className='card animated fadeInDown'>
    {loading && (
      <div className='text-center'>loading...</div>
    )}
     {errors &&
      <div className='alert'>
    {Object.keys(errors).map(key => (
      <p key={key}>{errors[key][0]}</p>
    ))}
  </div>
  }
  {!loading &&
  <form onSubmit={onSubmit}>
    <input value={foto.judul_foto} onChange={ev => setFoto({...foto, judul_foto: ev.target.value})} placeholder='judul' />
    <input type="date" value={foto.tanggal_unggah} onChange={ev => setFoto({...foto, tanggal_unggah: ev.target.value})} placeholder='tanggal' />
    <input type="text" value={foto.deskripsi_foto} onChange={ev => setFoto({...foto, deskripsi_foto: ev.target.value})} placeholder='deskripsi' />
    <input type="file" value={foto.lokasi_file} onChange={ev => setFoto({...foto, lokasi_file: ev.target.value})} placeholder='lokasi' />
    <input type="text" value={foto.id_album} onChange={ev => setFoto({...foto, id_album: ev.target.value})} placeholder='id user' />
    <input type="text" value={foto.id_user} onChange={ev => setFoto({...foto, id_user: ev.target.value})} placeholder='id album' />
    <button className='btn'>Simpan</button>
  </form>
  }
  </div>
    </>
  );
}
