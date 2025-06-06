// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  // Obtener el token del almacenamiento local
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:4000/profile', {
        headers: {
          Authorization: `Bearer ${token}`,  // Enviar el token en el encabezado
        },
      })
      .then(response => {
        setProfile(response.data);
      })
      .catch(err => {
        setError('No se pudo obtener el perfil.');
        console.error(err);
      });
    } else {
      setError('No hay token de autenticación.');
    }
  }, [token]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {profile ? (
        <div>
          <h1>Perfil de {profile.username}</h1>
          <p>ID: {profile.id}</p>
        </div>
      ) : (
        <p>Cargando perfil...</p>
      )}
    </div>
  );
};

export default Profile;