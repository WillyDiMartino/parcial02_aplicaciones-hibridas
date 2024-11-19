import './App.css'
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { Documentation, Home } from './pages'
import { NavBar, Footer } from './components'

function App() {

  return (
    <>
    <NavBar/>
   <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/documentacion" element={<Documentation/>} />
   </Routes>
   <Footer/>
    </>
  )
}

export default App
