import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { TeamList } from './TeamList';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const { auth } = useContext(AuthContext);

  const fetchTeams = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/equipos', {
        headers: { 'token': auth }
      });
      setTeams(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTeams(); 
  }, [auth]); 

  return (
    <div>
      {}
      {teams.length > 0 ? (
        <TeamList teams={teams} />
      ) : (
        <p>Cargando equipos...</p> 
      )}
    </div>
  );
};

export {Teams};
