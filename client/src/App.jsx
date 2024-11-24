import './App.css'
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { Documentation, Home, Teams, Drivers, Admin } from './pages'
import { NavBar, Footer } from './components'
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
    <NavBar/>
   <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/documentacion" element={<Documentation/>} />
    <Route path="/equipos" element={<Teams/>} />
    <Route path="/corredores" element={<Drivers/>} />
    <Route path="/admin" element={user?.role === 'admin' || user?.role === 'super-admin' ? <Admin /> : <Home />} />
   </Routes>
   <Footer/>
    </>
  )
}

export default App
