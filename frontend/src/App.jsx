import React from "react";
import HomePage from "./pages/HomePage.jsx";
import {Routes, Route} from "react-router-dom";
import NotePage from "./pages/NotePage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path='/note/:id' element={<NotePage/>}/>
    </Routes>
  )
}

export default App;
