import React from "react";
import "./App.css";
import { useLocation, useHistory } from "react-router-dom";
import socketIOClient from "socket.io-client";

function Chat() {
  const history = useHistory();

  /////////////////////FUNCIONALIDADES DO SOCKETIO///////////////////////////////////////
  const query = new URLSearchParams(useLocation().search);
  const nome = query.get("nome");
  const sala = query.get("sala");

  // Join chatroom
  const socket = socketIOClient("http://localhost:3335");
  socket.emit("joinRoom", nome, sala);

  // Message from server
  socket.on("message", (message) => {
    console.log(`mensagem enviada por ${message.username}`);
    console.log(message);
    outputMessage(message);
  });

  // Message submit
  function handleSubmit(event) {
    event.preventDefault();

    // Get message text
    const msg = event.target.elements.msg.value;

    // Emit message to server
    socket.emit("chatMessage", msg);

    // Clear input
    event.target.elements.msg.value = "";
    event.target.elements.msg.focus();
  }

  // Output message to DOM
  function outputMessage(message) {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
      ${message.text}
    </p>`;
    document.querySelector(".chat-messages").appendChild(div);
  }

  ///////////////////////////////////////////////////////////////////////

  async function handleClose() {
    socket.close();

    history.push("/");
  }

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>
          <i className="fas fa-smile"></i> ChatCord
        </h1>
        <button onClick={handleClose} className="btn">
          Leave Room
        </button>
      </header>
      <main className="chat-main">
        <div className="chat-sidebar">
          <h3>
            <i className="fas fa-comments"></i> Room Name:
          </h3>
          <h2 id={sala}>{sala}</h2>
          <h3>
            <i className="fas fa-users"></i> Users
          </h3>
          <ul id="users"></ul>
        </div>
        <div className="chat-messages"></div>
      </main>
      <div className="chat-form-container">
        <form onSubmit={handleSubmit} id="chat-form">
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            required
            autoComplete="off"
          />
          <button type="submit" className="btn">
            <i className="fas fa-paper-plane"></i> Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
