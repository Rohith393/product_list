import { Routes, Route, Navigate,useLocation } from 'react-router-dom';
import './App.css';
import { Navbarcomponent } from './navbar/navbar';
import { Homecompo } from './components/home';
import { Showproducts } from './components/products';
import Login from './frontlogin/login';
import Registration from './frontlogin/register';
import ProtectedRoute from './protected'; 
import { UseAuth } from './AuthContext';
import { useEffect, useState } from 'react';
import SlideShow from './slideshow';
function App() {
  const { isAuthenticated } = UseAuth(); 
  const [showWelcome, setShowWelcome] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/register') {
      setShowWelcome(false); 
    } else {
      setShowWelcome(true); // Show the welcome message for other routes
    }},[location]);
  return (
    <div>
      <Navbarcomponent />
      {showWelcome ?<div> <h3 className='stylecomponenet'>WELCOME TO PRODUCT CART</h3> <SlideShow/></div>:null}
      <br></br>
      <Routes>
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <Homecompo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/add" />}
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <Registration /> : <Navigate to="/add" />}
        />
        <Route path="/products" element={
            <ProtectedRoute>
             <Showproducts />
            </ProtectedRoute>
          } />
      </Routes>
    </div>
  );
}

export default App;
