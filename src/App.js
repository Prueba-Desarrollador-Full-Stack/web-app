import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/LoginPage/Login';
import Movies from './pages/MoviesPage/Movies';

export const AppContext = createContext();

function App() {
  const [token, setToken] = useState('');

  return (
    <AppContext.Provider value={{token, setToken}}>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/movies' element={<Movies />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
