import React from "react";
import { BrowserRouter, Route, Routes, HashRouter } from "react-router-dom";
import InitMap from "./pages/initMap";
import UsePrimitive from "./pages/usePrimitive";
import Page from "./pages/index";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/initMap" element={<InitMap />} />
        <Route path="/usePrimitive" element={<UsePrimitive />} />
      </Routes>
    </HashRouter>
  );
}
