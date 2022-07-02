import React from "react";
import { Routes, Route } from "react-router";
import Music from "./components/Music";
import Game from "./screens/Game";
import Home from "./screens/Home";
import Error404 from "./system/Error404";

const Router = () => {
  return (
    <div id="main">
      {/* <Music /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
};

export default Router;
