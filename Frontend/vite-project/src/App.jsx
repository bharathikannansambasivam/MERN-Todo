import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import CreateTodo from "./components/CreateTodo";
import EditTodo from "./components/EditTodo";
import Deletetodo from "./components/Deletetodo";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CreateTodo />} />
        <Route path="/todo/edit/:id" element={<EditTodo />} />
        <Route path="/todo/delete/:id" element={<Deletetodo />} />
      </Routes>
    </>
  );
}

export default App;
