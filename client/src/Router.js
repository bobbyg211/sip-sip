import React from "react";
import { Routes, Route } from "react-router";
import Global from "./screens/Global";
import Error404 from "./system/Error404";

const Router = () => {
  return (
    <div id="main">
      <Routes>
        <Route path="/" element={<Global />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
};

export default Router;
