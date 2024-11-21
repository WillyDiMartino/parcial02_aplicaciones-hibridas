import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'


const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const {auth} = useContext(AuthContext)

  const fetchDrivers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/corredores', {
        headers: {'token': auth}
      })
      console.log(res.data)
      setDrivers(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
fetchDrivers()
  }, [])

  return (
    <div>
      <ul className='d-flex flex-wrap justify-content-center justify-content-md-start container card-driver my-5'>
        {drivers.map(driver => (
          <li key={driver._id}>
          <div>
            <h5>{driver.number}</h5>
            <p>{driver.name} {driver.lastname}</p>
            <p>Fecha de nacimiento: {driver.birthdate}</p>
            <p>Nacionalidad: {driver.country}</p>
            <p>Equipo: {driver.team.name || 'No tiene'}</p>
            <div>
              <p>Puntos: {driver.points24}</p>
              <p>Carreras ganadas: {driver.raceWins}</p>
              <p>Podios: {driver.podiums}</p>
              <p>Campeonatos mundiales: {driver.worldChampionship}</p>
            </div>
            <p>Cantidad de grandes premios:{driver.grandPrixEntered}</p>
            </div>
            </li>
        ))
      }
      </ul>
    </div>
  )
}

export { Drivers }