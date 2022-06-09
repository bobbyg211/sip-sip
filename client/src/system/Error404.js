import React from "react";
import { Container, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <Container maxWidth="sm" className="system-errors _404 center">
      <h1 className="title">ERROR 404</h1>
      <h2 className="subtitle">Oops! Page Not Found...</h2>
      <p className="desc">
        Looks like we've run into an issue. The page you are looking for isn't here right now. We're
        sorry that it ended up like this. The problem isn't you, it's me. Try heading back to the
        homepage and see if you can find another route to the page you were looking for.
      </p>
      <Button variant="contained" color="primary" component={Link} to="/">
        Return Home
      </Button>
    </Container>
  );
}
