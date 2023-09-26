import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Game from './screens/Game';
import Admin from './screens/Admin';
import FlashRoundClient from './screens/FlashRound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/:id" element={<Game />}></Route>
        <Route path="/" element={<Admin />}></Route>
        <Route path="/flash/:id" element={<FlashRoundClient />}></Route>
      </Routes>
      <ToastContainer autoClose={5000} />
    </div>
  );
}

export default App;
