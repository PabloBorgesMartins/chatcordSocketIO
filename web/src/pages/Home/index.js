import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
/*import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://localhost:3333");*/

const Home = () => {
  const [sala, setSala] = useState("JavaScript");
  const [nome, setNome] = useState("");

  function handleSelectSala(event) {
    const uf = event.target.value;
    setSala(uf);
  }

  function handleInputChange(event) {
    const name = event.target.value;
    setNome(name);
  }

  return (
    <div className="join-container">
      <header className="join-header">
        <h1>
          <i className="fas fa-smile"></i> ChatCord
        </h1>
      </header>
      <main className="join-main">
        <form>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter username..."
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="room">Room</label>
            <select onChange={handleSelectSala} name="room" id="room">
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="PHP">PHP</option>
              <option value="C#">C#</option>
              <option value="Ruby">Ruby</option>
              <option value="Java">Java</option>
            </select>
          </div>
          <Link
            to={{
              pathname: "/Chat",
              search: `?sala=${sala}&nome=${nome}`,
            }}
          >
            Entrar no chat
          </Link>
        </form>
      </main>
    </div>
  );
};

export default Home;
