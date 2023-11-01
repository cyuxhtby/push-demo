import React, { useState, useEffect } from "react";
import { PushAPI } from '@pushprotocol/restapi';
import { createSocketConnection, EVENTS } from '@pushprotocol/socket';
import "./styles/Home.css";

function Chat({signer}) {
  const [user, setUser] = useState(null);
  const [pushSDKSocket, setPushSDKSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);

  const initializeChat = async () => {
    try {
      const resolvedSigner = await signer;
      if (!resolvedSigner) {
        throw new Error("Signer is not available");
      }
  
      console.log("Signer resolved");
  
      const user = await PushAPI.initialize(resolvedSigner, { env: 'staging' });
      setUser(user);
  
      console.log("User initialized:", user);
  
      const pushSDKSocket = createSocketConnection({
        user: user,
        type: 'chat',
        socketOptions: { autoConnect: true, reconnectionAttempts: 3 },
        env: 'staging',
      });
  
      if (!pushSDKSocket) {
        throw new Error("Socket connection could not be created");
      }
  
      console.log("Socket connection created:", pushSDKSocket);
  
      setPushSDKSocket(pushSDKSocket);
  
      pushSDKSocket.on(EVENTS.CHAT_RECEIVED_MESSAGE, (message) => {
        setMessages(prevMessages => [...prevMessages, message]);
      });
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error("Error initializing chat:", err);
    }
  };
  
  
  useEffect(() => {
    if (chatOpen && signer) {
      initializeChat();
    }
  }, [signer, chatOpen]);

  const sendMessage = async (toWalletAddress, content) => {
    if (user) {
      try {
        await user.chat.send(toWalletAddress, {
          content: content,
          type: 'Text',
        });
      } catch (err) {
        setError(`Error: ${err.message}`);
      }
    }
  };

  return (
    <div className="chat">
      <button style={{ margin: '0 auto', display: 'block', backgroundColor: 'purple', color: 'white', borderRadius: '8px', padding: '8px', fontSize: '14px', border: 'none', cursor: 'pointer', transition: 'background-color 0.3s', marginTop: '20px' }} onClick={() => setChatOpen(true)}>Open Chat</button>
      {error && <p>{error}</p>}
      {chatOpen && (
        <div className="chatWindow">
          {messages.map((message, index) => (
            <p key={index}>{message.content}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default Chat;
