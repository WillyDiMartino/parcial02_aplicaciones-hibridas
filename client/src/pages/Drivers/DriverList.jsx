import React, { useState } from 'react';

const DriverList = ({ drivers }) => {
  const [openDriver, setOpenDriver] = useState(null);

  const toggleDriverInfo = (driverId) => {
    setOpenDriver(openDriver === driverId ? null : driverId);
  };

  return (
    <div className="container my-5">
      <div className="accordion" id="driverAccordion">
        {drivers.map((driver) => (
          <div key={driver._id} className="accordion-item">
            <h2 className="accordion-header" id={`heading${driver._id}`}>
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${driver._id}`}
                aria-expanded={openDriver === driver._id ? 'true' : 'false'}
                aria-controls={`collapse${driver._id}`}
                onClick={() => toggleDriverInfo(driver._id)}
              >
                {driver.number} - {driver.name} {driver.lastname}
              </button>
            </h2>
            <div
              id={`collapse${driver._id}`}
              className={`accordion-collapse collapse ${openDriver === driver._id ? 'show' : ''}`}
              aria-labelledby={`heading${driver._id}`}
              data-bs-parent="#driverAccordion"
            >
              <div className="accordion-body">
                <p><strong>Fecha de nacimiento:</strong> {driver.birthdate}</p>
                <p><strong>Nacionalidad:</strong> {driver.country}</p>
                <p><strong>Equipo:</strong> {driver.team.name || 'No tiene'}</p>
                <div>
                  <p><strong>Puntos:</strong> {driver.points24}</p>
                  <p><strong>Carreras ganadas:</strong> {driver.raceWins}</p>
                  <p><strong>Podios:</strong> {driver.podiums}</p>
                  <p><strong>Campeonatos mundiales:</strong> {driver.worldChampionships}</p>
                </div>
                <p><strong>Grandes premios:</strong> {driver.grandPrixEntered}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export {DriverList}
