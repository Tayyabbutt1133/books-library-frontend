import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Createbook from "./Pages/Createbook";
import Deletebook from "./Pages/Deletebook";
import Editbook from "./Pages/Editbook";
import Showbook from "./Pages/Showbook";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/create" element={<Createbook />} />
        <Route path="/books/details/:id" element={<Showbook />} />
        <Route path="/books/edit/:id" element={<Editbook />} />
        <Route path="/books/delete/:id" element={<Deletebook />} />
     </Routes>
    </>
  );
}

export default App;
