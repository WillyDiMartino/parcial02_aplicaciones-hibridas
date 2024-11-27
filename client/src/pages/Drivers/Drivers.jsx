import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { DriverList } from './DriverList';
import ClipLoader from 'react-spinners/ClipLoader';

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useContext(AuthContext);

  const fetchDrivers = async (searchQuery = '', sort = '') => {
    try {
      let endpoint = 'http://localhost:3000/api/corredores';
      
      if (searchQuery) {
        endpoint += `/search?name=${searchQuery}`;
      }
      
      if (sort) {
        endpoint += `/sort/points?order=${sort}`;
      }

      const res = await axios.get(endpoint, {
        headers: { token: auth },
      });
      setDrivers(res.data);
      setTimeout(() => setIsLoading(false), 1000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, [auth]);

  const handleSortChange = (order) => {
    setSortOrder(order);
    fetchDrivers(search, order);
  };

  const filteredDrivers = drivers.filter((driver) =>
    `${driver.name} ${driver.lastname}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Buscador y Botones */}
      <div className="d-flex flex-column align-items-center my-4">
        {/* Buscador */}
        <div className="input-group search-bar">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar corredor"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-search" type="button">
            <i className="bi bi-search"></i>
          </button>
        </div>

        {/* Botones para ordenar */}
        <div className="d-flex justify-content-center mt-3 sort-buttons">
          <button
            className={`btn btn-f1 ${sortOrder === 'asc' ? 'btn-active' : ''} me-2`}
            onClick={() => handleSortChange('asc')}
          >
            Ordenar Ascendente
          </button>
          <button
            className={`btn btn-f1 ${sortOrder === 'desc' ? 'btn-active' : ''}`}
            onClick={() => handleSortChange('desc')}
          >
            Ordenar Descendente
          </button>
        </div>
      </div>

      {/* Contenido */}
      {isLoading ? (
        <div className="text-center my-5">
          <ClipLoader color="#e10600" size={50} />
        </div>
      ) : filteredDrivers.length > 0 ? (
        <DriverList drivers={filteredDrivers} />
      ) : (
        <h2 className="text-center my-5">No se encontraron corredores.</h2>
      )}
    </div>
  );
};

export { Drivers };
