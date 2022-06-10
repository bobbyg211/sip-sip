import React, { useState } from "react";
import { Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../images/cocktail-logo.svg";

export default function Home() {
  const [clean, setClean] = useState(false);
  const [dirty, setDirty] = useState(false);

  return (
    <Container className="home">
      <img
        className={`logo ${clean && "clean"} ${dirty && "dirty"}`}
        src={logo}
        alt="Cocktail"
      ></img>
      <h1 className="title">SipSip</h1>
      <div className="modes">
        <Button
          onMouseEnter={() => setClean(true)}
          onMouseLeave={() => setClean(false)}
          className="clean"
          color="primary"
          variant="contained"
          component={Link}
          to="/game"
          state={{ mode: false }}
        >
          Clean
        </Button>
        <Button
          onMouseEnter={() => setDirty(true)}
          onMouseLeave={() => setDirty(false)}
          className="dirty"
          color="secondary"
          variant="contained"
          component={Link}
          to="/game"
          state={{ mode: true }}
        >
          Dirty
        </Button>
      </div>
    </Container>
  );
}
