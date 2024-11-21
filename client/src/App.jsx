import './App.css'
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { Documentation, Home, Teams, Drivers } from './pages'
import { NavBar, Footer } from './components'

function App() {

  return (
    <>
    <NavBar/>
   <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/documentacion" element={<Documentation/>} />
    <Route path="/equipos" element={<Teams/>} />
    <Route path="/corredores" element={<Drivers/>} />
   </Routes>
   <Footer/>
    </>
  )
}

export default App
