import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import authService from './appwrite/auth.js';
import { header, footer } from './components';
import './App.css';

import { login, logout } from './store/authslice.js';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(login({ userData: user }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error('Error fetching current user:', error);
        dispatch(logout());
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) {
    return null;
  }

  return (
    <div className="">
      <h1>Hello World! from gagan</h1>

      <div className="">
        <header />

        <main>
          <Outlet />
        </main>

        <footer />
      </div>
    </div>
  );
}

export default App;