import React, { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { auth, db } from "../firebase/Firebase-config";
import "./Chat.css";

function Chat(props) {

  const { room } = props;
  const [newMessage, setNewMessage] = useState("");
  const messageReference = collection(db, "messages");
  const [messagesArray, setMessagesArray] = useState([]);

  useEffect(() => {
    const queryMessages = query(messageReference, where("room", "==", room), orderBy("createdAt"));
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messagesArray = []
      snapshot.forEach((doc)=>{
        messagesArray.push({...doc.data(), id:doc.id})
      })
      setMessagesArray(messagesArray);
    })
    return () => unsubscribe();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;

    await addDoc(messageReference, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    })
    setNewMessage("");
  };


  return (
    <div className="chat">
      
      <div className="header">
        <h1>Welcome To { room}</h1>
      </div>

      <div className="messages">
        {messagesArray.map(message => (
          <div className="message">
            <span>{message.user}</span>
            {message.text}
          </div>
        ))}
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your message"
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button type="submit">Send</button>
      </form>
      
    </div>
  );
}

export default Chat;
