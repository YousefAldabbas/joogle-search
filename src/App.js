import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Result from "./pages/Result";
import Header from "./layouts/Layout";

function App() {
  return (
    <Routes>
      <Route path="" element={<Header />}>
        <Route path="" index element={<Home />} />
        <Route path="/search" element={<Result />} />
      </Route>
    </Routes>
  );
}

export default App;
