import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import QuestionsClient from './shared/components/QuestionsClient';
import Admin from './shared/components/Admin';
import FlashRoundClient from './shared/components/FlashRoundClient';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/:id" element={<QuestionsClient />}></Route>
        <Route path='/' element={<Admin />}></Route>
        <Route path='/admin' element={<Admin />}></Route>
        <Route path='/flash/:id' element={<FlashRoundClient />}></Route>
      </Routes>
      <ToastContainer autoClose={5000} />
    </div>
  );
}

export default App;
