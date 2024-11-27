import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { DriverList } from './DriverList';
import ClipLoader from 'react-spinners/ClipLoader';

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState(''); // Estado para el orden de puntos
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useContext(AuthContext);

  // Función para obtener corredores desde el backend
  const fetchDrivers = async (searchQuery = '', sort = '') => {
    try {
      let endpoint = 'http://localhost:3000/api/corredores';
      
      // Agregar el query de búsqueda al endpoint si hay un texto de búsqueda
      if (searchQuery) {
        endpoint += `/search?name=${searchQuery}`;
      }
      
      // Agregar el parámetro de orden si se especifica
      if (sort) {
        endpoint += `/sort/points?order=${sort}`;
      }

      const res = await axios.get(endpoint, {
        headers: { token: auth },
      });
      console.log(res.data);
      setDrivers(res.data);
      setTimeout(() => setIsLoading(false), 1000);
    } catch (error) {
      console.log(error);
    }
  };

  // Efecto inicial para cargar los datos
  useEffect(() => {
    fetchDrivers();
  }, []);

  // Función para manejar el cambio de orden de puntos
  const handleSortChange = (order) => {
    setSortOrder(order); // Actualiza el orden de los puntos
    fetchDrivers(search, order); // Obtiene los datos ordenados
  };

  // Filtra los corredores según el texto ingresado en el buscador
  const filteredDrivers = drivers.filter((driver) =>
    `${driver.name} ${driver.lastname}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Buscador */}
      <div className="input-group my-3">
        <input
          type="search"
          className="form-control"
          placeholder="Buscar"
          aria-label="Buscar"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-outline-secondary" type="button">
          <i className="bi bi-search"></i>
        </button>
      </div>

      {/* Ordenar por puntos */}
      <div className="d-flex justify-content-center mb-3">
        <button
          className={`btn btn-secondary mx-2 ${sortOrder === 'asc' ? 'active' : ''}`}
          onClick={() => handleSortChange('asc')}
        >
          Ordenar Ascendente
        </button>
        <button
          className={`btn btn-secondary mx-2 ${sortOrder === 'desc' ? 'active' : ''}`}
          onClick={() => handleSortChange('desc')}
        >
          Ordenar Descendente
        </button>
      </div>

      {}
       {isLoading ? (
        <div className="text-center my-5">
          <ClipLoader color="" size={50} />
        </div>
      ) : filteredDrivers.length > 0 ? (
        <DriverList drivers={filteredDrivers} />
      ) : (
        <h2 className="text-center my-5">No se encontraron equipos.</h2>
      )}
    </div>
  );
};

export { Drivers };
