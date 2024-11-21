import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

const Teams = () => {
  const [teams, setTeams] = useState([])
  const { auth } = useContext(AuthContext)

  const fetchTeams = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/equipos', {
        headers: { 'token': auth }
      })
      console.log(res)
      setTeams(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTeams()
  }, [])

  return (
    <div>
      <ul className='d-flex flex-wrap justify-content-center justify-content-md-start container card-team my-5'>
        {teams.map(team => (
          <li key={team._id}>
            <div>
              <h5>{team.name}</h5>
              <p>Base: {team.base}</p>
              <p>Jefe de Equipo: {team.teamChief}</p>
              <p>Unidad de potencia: {team.powerUnit}</p>
              <p>Año de ingreso:{team.firstEntry}</p>
              <p>Puntos: { }</p>
              <p>Campeonatos mundiales: {team.constructorChampionships}</p>
                <span className=''>Corredores</span>
              <div className="d-flex justify-content-around">
                <p>{team.driverOne.name + ' ' + team.driverOne.lastname || 'No tiene'}</p>
                <p>{team.driverTwo.name + ' ' + team.driverTwo.lastname || 'No tiene'}</p>
              </div>
            </div>
          </li>
        ))
        }
      </ul></div>
  )
}

export { Teams }