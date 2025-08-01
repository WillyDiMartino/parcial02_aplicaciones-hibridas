import React from 'react';

const TeamList = ({ teams }) => {
  return (
    <div className="container my-5">
      <div className="row g-4 justify-content-center">
        {teams.map((team) => (
          <div key={team._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card shadow-sm border-0 h-100 text-center p-3">

              {}
              {team.logoImg && (
                <img
                  src={`http://localhost:3000/uploads/teams/${team.logoImg}`}
                  alt={team.name}
                  className="img-fluid mx-auto mb-2"
                  style={{ maxHeight: '100px', objectFit: 'contain' }}
                />
              )}

              {}
              <h5 className="fw-bold text-dark mb-2">{team.name}</h5>

              {}
              <div className="text-muted small mb-2">
                <div><strong>Base:</strong> {team.base}</div>
                <div><strong>Jefe:</strong> {team.teamChief}</div>
                <div><strong>Motor:</strong> {team.powerUnit}</div>
              </div>

              {}
              <div className="d-flex justify-content-around text-primary small mb-2">
                <div>
                  <strong>{team.constructorPoints}</strong><br />Puntos
                </div>
                <div>
                  <strong>{team.constructorChampionships}</strong><br />Títulos
                </div>
              </div>

              {}
              <div className="small text-muted">
                <strong>Corredores:</strong>
                <div>{team.driverOne?.lastname || 'Sin piloto'}</div>
                <div>{team.driverTwo?.lastname || 'Sin piloto'}</div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { TeamList };
