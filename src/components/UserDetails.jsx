// UserDetails.js
import React from 'react';

export function UserDetails({ username, avatarUrl }){
  
  const photo = {
    "height": '8%',
    "width": '8%',
    "border-radius": '20px',
  }

  return (
    <div>
      <p>{username}</p>
      <img src={avatarUrl} alt="Avatar do usuário" style={photo}/>
    </div>
  );
};

export default UserDetails;
