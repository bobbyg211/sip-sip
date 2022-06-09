import { Container } from "@mui/material";
import React from "react";
import logo from "../images/cocktail-logo.svg";

export default function Home() {
  return (
    <Container className="home">
      <img className="logo" src={logo} alt="Cocktail"></img>
      <h1 className="title">SipSip</h1>
    </Container>
  );
}
