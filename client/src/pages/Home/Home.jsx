import React from 'react'

const Home = () => {
  return (
    <div className="welcome d-flex justify-content-end mt-5">
    <div className="d-flex flex-column justify-content-center align-items-end gap-3">
      <h2 className="fs-1">
        ¡Bienvenidos a la <strong> API de Fórmula 1</strong>!
      </h2>
      <p className="fs-5">
        Con toda la información <strong>de los corredores de la <em>parrilla 2025</em></strong> que
        necesitas. Descubrí más sobre nosotros en la sección de <strong>Nosotros</strong>, y cualquier duda
        dejarnos tu mensaje. Si querés saber como utilizar esta API, visita la sección de <strong>Documentación</strong>.
      </p>
    </div>
  </div>
  )
}

export {Home}