import React from 'react';

const DriverList = ({ drivers }) => {
  return (
    <div className="container my-5">
      <div className="row g-4 justify-content-center">
        {drivers.map((driver) => (
          <div key={driver._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card shadow-sm border-0 position-relative p-3 text-center h-100">

              {}
              <div className="d-flex justify-content-between align-items-start">
                <div className="fw-bold fs-4 text-dark">{driver.number}</div>
                <div className="text-end">
                  <div className="fw-bold fs-5">{driver.points24}</div>
                  <div className="small text-muted">PTS</div>
                </div>
              </div>

              {}
              <div className="mt-2">
                <div className="text-uppercase fw-bold text-warning small">{driver.name}</div>
                <div className="fs-5 text-dark">{driver.lastname}</div>
              </div>

              {}
              <div className="text-muted small">{driver.country}</div>

              {}
              <div className="text-primary mb-2 small">
                {driver.team?.name || 'Sin equipo'}
              </div>

              {}
              {driver.driverImg && (
                <img
                  src={`http://localhost:3000/uploads/drivers/${driver.driverImg}`}
                  alt={`${driver.name} ${driver.lastname}`}
                  className="img-fluid my-2"
                  style={{
                    maxHeight: '180px',
                    objectFit: 'contain',
                    borderRadius: '10px',
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { DriverList };
