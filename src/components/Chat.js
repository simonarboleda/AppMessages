import React, { useState, useEffect } from 'react';
import { addDoc, deleteDoc, doc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { auth, db } from '../firebase-config';

export const Chat = (props) => {
  const { room } = props
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([])

  const messagesRef = collection(db, 'messages');

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where('room', '==', room),
      orderBy('createdAt')
    );

    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);

    });

    return () => unsuscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === '') return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage('')
  };

  const handleDeleteMessage = async (messageId) => {

    const messageRef = doc(db, "messages", messageId);

    try {
      await deleteDoc(messageRef);

      const updatedMessages = messages.filter((message) => message.id !== messageId);
      setMessages(updatedMessages);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div className='mainChatContainer'>
      <div className='containerChat'>
        <h1>Bienvenido a {room.toUpperCase()}</h1>

        <div className='mainMessagesContainer'>
          {messages.map((message) => (
            <div className='messagesContainer' key={message.id}>
              <div className='messageContent'>
                <span className='usuario'>{message.user}</span>
                <p className='texto'>{message.text}</p>
              </div>
              <button onClick={() => handleDeleteMessage(message.id)}>Eliminar</button>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} >
          <input
            placeholder='Escribe tu mensaje...'
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
          <button type='submit'>Enviar</button>
        </form>
      </div>
    </div>
  );
};


