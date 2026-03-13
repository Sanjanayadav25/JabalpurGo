import React from "react";
import { Routes, Route } from "react-router-dom";

import Hero from "./Components/Hero";
import Places from "./Components/Places";
import Category from "./Components/Category";
import PlaceDetails from "./Components/PlaceDetails";
import Stairs from "./Stairs";

function App() {
  return (
    <>
      <Stairs />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/places" element={<Places />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/place/:title" element={<PlaceDetails />} />
      </Routes>
    </>
  );
}

export default App;
