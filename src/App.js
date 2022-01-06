import React from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/home';
import Posts from './pages/posts'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="posts/:id/:name" element={<Posts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
