import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import App from "./components/App";

function RouteSwitch() {

  return (
    <BrowserRouter>
      <App />    
    </BrowserRouter>
  );
}

export default RouteSwitch;