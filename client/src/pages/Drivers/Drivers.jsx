import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import { DriverList } from './DriverList'


const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const { auth } = useContext(AuthContext)

  const fetchDrivers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/corredores', {
        headers: { 'token': auth }
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
      {}
      {drivers.length > 0 ? (
        <DriverList drivers={drivers} />
      ) : (
        <p>Cargando pilotos...</p> 
      )}
    </div>
  );
};

export {Drivers}