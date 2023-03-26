import React, { useEffect, useRef } from "react";
import { Card, CardContent, IconButton, Button, CircularProgress } from "@mui/material";
import { Settings, ArrowRightAlt } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import useGetQuestion from "../hooks/useGetQuestion";
import logo from "../images/cocktail-logo.svg";

export default function Game(props) {
  const { gameState, sendData } = props;
  const { currIndex, questionsRef } = gameState;
  const currQuestion = questionsRef[currIndex].id;
  const { isLoading, isFetching, refetch, data } = useGetQuestion(currQuestion);
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      sendData("update");
    } else {
      didMount.current = true;
    }
  }, [data]);

  console.log(currIndex);

  return (
    <div className="game wrapper">
      <Link className="company" to="/">
        <img className="logo" src={logo} alt="Cocktail"></img>
        <h3 className="title">SipSip!</h3>
      </Link>
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
      <Button onClick={refetch} variant="contained" color="secondary" className="next">
        Next
      </Button>
    </div>
  );
}
