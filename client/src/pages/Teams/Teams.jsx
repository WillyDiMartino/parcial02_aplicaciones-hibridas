import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { TeamList } from './TeamList';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // Estado para el orden
  const { auth } = useContext(AuthContext);

  const fetchTeams = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/equipos', {
        headers: { 'token': auth },
      });
      setTeams(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSortedTeams = async (order) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/equipos/sort/constructorPoints?order=${order}`, {
        headers: { 'token': auth },
      });
      setTeams(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, [auth]);

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSortChange = (order) => {
    setSortOrder(order); // Actualizar estado del orden
    fetchSortedTeams(order); // Llamar al backend para obtener equipos ordenados
  };

  return (
    <div>
      {/* Buscador */}
      <div className="input-group my-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar equipo"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-outline-secondary" type="button">
          <i className="bi bi-search"></i>
        </button>
      </div>

      {/* Botones para ordenar */}
      <div className="d-flex justify-content-end mb-3">
        <button
          className={`btn btn-${sortOrder === 'asc' ? 'primary' : 'outline-primary'} me-2`}
          onClick={() => handleSortChange('asc')}
        >
          Ordenar Ascendente
        </button>
        <button
          className={`btn btn-${sortOrder === 'desc' ? 'primary' : 'outline-primary'}`}
          onClick={() => handleSortChange('desc')}
        >
          Ordenar Descendente
        </button>
      </div>

      {/* Lista de equipos */}
      {filteredTeams.length > 0 ? (
        <TeamList teams={filteredTeams} />
      ) : (
        <h2 className="text-center my-5">Cargando</h2>
      )}
    </div>
  );
};

export { Teams };
