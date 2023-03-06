import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './style.css'
import Employees from './pages/Employees';
import Home from './pages/Home';
import { Provider } from 'react-redux'
import { store } from './store';
import NavBar from './components/NavBar';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <BrowserRouter>
  
    <Provider store={store}>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="employees" element={<Employees/>}/>
      </Routes>
    </Provider>
  </BrowserRouter>
);

