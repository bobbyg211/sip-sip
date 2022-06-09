import React from "react";
import { Routes, Route } from "react-router";
import Home from "./screens/Home";
import Error404 from "./system/Error404";

const Router = () => {
  return (
    <div id="main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
};

export default Router;
