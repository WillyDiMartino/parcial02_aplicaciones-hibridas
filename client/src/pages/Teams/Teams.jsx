import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { TeamList } from './TeamList';
import ClipLoader from 'react-spinners/ClipLoader';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useContext(AuthContext);

  const fetchTeams = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/equipos', {
        headers: { token: auth },
      });
      setTeams(res.data);
      setTimeout(() => setIsLoading(false), 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSortedTeams = async (order) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/equipos/sort/constructorPoints?order=${order}`, {
        headers: { token: auth },
      });
      setTeams(res.data);
      setTimeout(() => setIsLoading(false), 1000);
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
    setSortOrder(order);
    fetchSortedTeams(order);
  };

  return (
    <div>
      <div className="d-flex flex-column align-items-center my-4">
        {/* Buscador */}
        <div className="input-group search-bar">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar equipo"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-search" type="button">
            <i className="bi bi-search"></i>
          </button>
        </div>

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
      {isLoading ? (
        <div className="text-center my-5">
          <ClipLoader color="#e10600" size={50} />
        </div>
      ) : filteredTeams.length > 0 ? (
        <TeamList teams={filteredTeams} />
      ) : (
        <h2 className="text-center my-5">No se encontraron equipos.</h2>
      )}
    </div>
  );
};

export { Teams };
