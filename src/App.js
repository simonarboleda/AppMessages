import React, { useState, useRef } from 'react';
import './styles.css';
import { Auth } from './components/Auth';
import Cookies from 'universal-cookie';
import { Chat } from './components/Chat';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';


const cookies = new Cookies();


function App() {
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'));
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove('auth-token');
    setIsAuth(false);
    setRoom(null);
  };

  if (!isAuth) {
    return (
      <div className='containerAuthApp'>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  };

  return (
    <div className='mainRoomContainer'>
      {room ? (
        <Chat room={room} />
      ) : (
        <div className='formRoom'>
          <label>ingresa el nombre de la sala</label>
          <input ref={roomInputRef} />
          <button onClick={() => setRoom(roomInputRef.current.value)}> Ingresar </button>
        </div>
      )}

      <div className='sign-out'>
        <button onClick={signUserOut}>Cerrar Sesion</button>
      </div>
    </div>
  );



}

export default App;
