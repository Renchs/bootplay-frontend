import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './pages/Login'
import Signup from './pages/Signup';
import Home from './pages/Home';
import Header from './components/header';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';
import MyCollection from './pages/MyCollection';
import Background from './components/background';
import { PrivateRoutes } from './utils/PrivateRoutes';
import NotFound from './pages/NotFound';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster position='top-right' toastOptions={{duration: 2000}}/>
    <AuthProvider>
      <BrowserRouter>
        <Background>
          <Header />
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path='' element={<PrivateRoutes />}>
              <Route path="/dashboard" index element={<Dashboard />} />
              <Route path="/meus-discos" element={<MyCollection />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Background>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
)
