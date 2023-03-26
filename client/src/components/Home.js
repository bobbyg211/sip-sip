import React from "react";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../images/cocktail-logo.svg";

export default function Home(props) {
  const { username, setUsername, gameId, setGameId, sendData } = props;

  return (
    <div className="home wrapper">
      <img className="logo" src={logo} alt="Cocktail"></img>
      <h1 className="title">SipSip!</h1>

      <div className="start-form">
        <TextField
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          id="username"
          className="field"
          label="Name"
          variant="filled"
          error={/[^a-z]/gi.test(username)}
          helperText={/[^a-z]/gi.test(username) ? "Letters only" : ""}
        />
        <TextField
          value={gameId}
          onChange={(e) => {
            setGameId(e.target.value.toUpperCase());
          }}
          id="game-id"
          className="field"
          label="Game ID"
          variant="filled"
          inputProps={{ maxLength: 4, pattern: "/[^a-z0-9]/gi" }}
          error={/[^a-z0-9]/gi.test(gameId)}
          helperText={/[^a-z0-9]/gi.test(gameId) ? "Alphanumeric characters only" : ""}
        />
      </div>
      <div className="modes">
        <Button
          onClick={() => sendData("create")}
          className="create"
          color="primary"
          variant="contained"
        >
          Create
        </Button>
        <Button
          onClick={() => sendData("join")}
          className="join"
          color="secondary"
          variant="contained"
        >
          Join
        </Button>
      </div>
    </div>
  );
}
