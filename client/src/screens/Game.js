import React from "react";
import { Card, CardContent, Container, IconButton, Button, CircularProgress } from "@mui/material";
import { Settings, ArrowRightAlt } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import useGetQuestion from "../hooks/useGetQuestion";
import logo from "../images/cocktail-logo.svg";

export default function Game() {
  const location = useLocation();
  const { mode } = location.state;
  const { isLoading, isFetching, refetch, data } = useGetQuestion(mode);

  return (
    <Container className={`game ${mode ? "dirty" : "clean"}`}>
      <div className="company">
        <img className="logo" src={logo} alt="Cocktail"></img>
        <h3 className="title">SipSip!</h3>
      </div>
      <IconButton component={Link} className="home-arrow" aria-label="home" to="/">
        <ArrowRightAlt />
      </IconButton>

      <IconButton className="settings" aria-label="settings">
        <Settings />
      </IconButton>

      <Card className="card">
        <CardContent className="content">
          {!isLoading && !isFetching ? (
            <h1 className="question">{data.content}</h1>
          ) : (
            <CircularProgress className="fetching" />
          )}
          <h2 className="sip">SipSip!</h2>
        </CardContent>
      </Card>
      <Button
        onClick={refetch}
        variant="contained"
        color={`${mode ? "secondary" : "primary"}`}
        className="next"
      >
        Next
      </Button>
    </Container>
  );
}
