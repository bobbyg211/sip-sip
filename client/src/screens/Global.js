import React, { useState, useEffect } from "react";
import { Button, Container, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import useWebSocket from "../hooks/useWebSocket.js";
import logo from "../images/cocktail-logo.svg";
import Home from "../components/Home.js";
import Game from "../components/Game.js";

export default function Global() {
  const [clientId, setClientId] = useState(null);
  const [username, setUsername] = useState("");
  const [gameId, setGameId] = useState("");
  const [gameState, setGameState] = useState(null);

  // use our hook
  const ws = useWebSocket({
    socketUrl: "ws://localhost:5000/ws",
  });

  // send messages
  const sendData = (method) => {
    if (username !== "" && gameId !== "" && (method === "create" || method === "join")) {
      const message = { method: method, clientId: clientId, username: username, gameId: gameId };
      ws.send(message);
    }

    if (method === "update" && gameId !== "") {
      const message = { method: method, gameId: gameId };
      ws.send(message);
    }
  };

  const ssProps = {
    clientId,
    setClientId,
    username,
    setUsername,
    gameId,
    setGameId,
    gameState,
    setGameState,
    sendData,
  };

  // receive messages
  useEffect(() => {
    if (ws.data) {
      const { message } = ws.data;
      console.log(message);

      if (message?.sys) {
        console.log(message.sys);
      }

      if (message?.method === "connect") {
        setClientId(message.clientId);
        console.log(`Client ID set: ${message.clientId}`);
      }

      if (message?.method === "create") {
        setGameState(message.game);
      }

      if (message?.method === "join") {
        setGameState(message.game);
      }
    }
  }, [ws.data]);

  return (
    <Container className="global">
      <div className="connection">
        <div>
          Connection State: <strong>{ws.readyState ? "Open" : "Closed"}</strong>
        </div>
        <div>
          Client ID: <strong>{clientId}</strong>
        </div>
        <div>
          Players:
          <ul>
            {gameState?.players &&
              gameState?.players.map((player) => {
                return <li key={player.clientId}>{player.username}</li>;
              })}
          </ul>
        </div>
      </div>

      {!gameState && <Home {...ssProps} />}
      {gameState && <Game {...ssProps} />}
    </Container>
  );
}
