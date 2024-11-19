import React from 'react'
import logo from '../../assets/img/f1_logo.png'

const Footer = () => {
  return (
    <footer>

            <div class="d-flex justify-content-around align-items-center">
                <a href="/"><img src={logo} alt="logo formula 1"  width="120" height="30"/></a>
                <ul>
                    <span>Alumnos:</span>
                    <li>Guillermo Di Martino</li>
                    <li>Tomás Paravic</li>
                </ul>
                <ul>
                    <span>Profesora:</span>
                    <li>Camila Belén Márcos Galbán</li>
                </ul>
                <ul>
                    <span>Materia:</span>
                    <li>Aplicaciones Híbridas</li>
                    <span>Comisión:</span>
                    <li>DWN4AV</li>
                </ul>
            </div>

            <p>&copy; 2021 Formula 1 API - Di Martino - Paravic</p>

        </footer>
  )
}

export {Footer} 