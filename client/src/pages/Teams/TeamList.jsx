import React, { useState } from 'react';

const TeamList = ({ teams }) => {
  const [openTeam, setOpenTeam] = useState(null);

  const toggleTeamInfo = (teamId) => {
    setOpenTeam(openTeam === teamId ? null : teamId); 
  };

  return (
    <div className="container my-5">
      <div className="accordion" id="teamAccordion">
        {teams.map((team) => (
          <div key={team._id} className="accordion-item">
            <h2 className="accordion-header" id={`heading${team._id}`}>
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${team._id}`}
                aria-expanded={openTeam === team._id ? 'true' : 'false'}
                aria-controls={`collapse${team._id}`}
                onClick={() => toggleTeamInfo(team._id)}
              >
                {team.name}
              </button>
            </h2>
            <div
              id={`collapse${team._id}`}
              className={`accordion-collapse collapse ${openTeam === team._id ? 'show' : ''}`}
              aria-labelledby={`heading${team._id}`}
              data-bs-parent="#teamAccordion"
            >
              <div className="accordion-body">
                <p><strong>Base:</strong> {team.base}</p>
                <p><strong>Jefe de Equipo:</strong> {team.teamChief}</p>
                <p><strong>Unidad de potencia:</strong> {team.powerUnit}</p>
                <p><strong>Año de ingreso:</strong> {team.firstEntry}</p>
                <p><strong>Puntos:</strong> {team.constructorPoints}</p>
                <p><strong>Campeonatos mundiales:</strong> {team.constructorChampionships}</p>
                <div>
                  <strong>Corredores:</strong>
                  <p>{team.driverOne?.name + ' ' + team.driverOne?.lastname || 'No tiene'}</p>
                  <p>{team.driverTwo?.name + ' ' + team.driverTwo?.lastname || 'No tiene'}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export {TeamList}