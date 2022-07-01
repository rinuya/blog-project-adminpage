import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Main from "./components/Main";
import Post from "./components/Post";

function RouteSwitch() {

  return (
    <BrowserRouter>
    <div className="App">
      <Nav />
        <div className="content">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/:id" element={<Post />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default RouteSwitch;