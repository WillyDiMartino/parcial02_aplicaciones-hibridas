import React from 'react';

const Documentation = () => {
  return (
    <div className="container my-5">
      <h2 className="mb-5">Documentación</h2>

      <h3>Introducción</h3>
      <p>La API de Formula 1 provee información sobre corredores y equipos.</p>

      <h3>Crea un Usuario</h3>
      <p>Para poder acceder a la API, se debe crear un usuario desde "Postman", utilizando el método POST, con el siguiente endpoint:</p>
      <pre className="code-block">http://localhost:3000/usuarios</pre>
      <p>El objeto que se debe enviar es el siguiente:</p>
      <pre className="code-block">{`{
  "name": "Nombre",
  "lastname": "Apellido",
  "username": "Usuario",
  "email": "Email",
  "password": "Contraseña"
}`}</pre>
      <p>Una vez creado el usuario, podrás iniciar sesión con el mismo:</p>
      <pre className="code-block">http://localhost:3000/usuarios/login</pre>
      <p>El objeto que se debe enviar es el siguiente:</p>
      <pre className="code-block">{`{
  "email": "Email",
  "password": "Contraseña"
}`}</pre>
      <p>Se brindará un token de autenticación que tendrás que utilizar para poder acceder a la información.</p>

      <h3 className="mt-4">Una vez iniciada la sesión</h3>
      <p>Las request por <strong>GET</strong> te darán la siguiente información:</p>
      <pre className="code-block">http://localhost:3000/api/corredores</pre>
      <pre className="code-block">http://localhost:3000/api/equipos</pre>

      <section id="pilots">
        <h4>Corredores</h4>
        <p>Para buscar corredores hay distintas maneras:</p>
        <pre className="code-block">http://localhost:3000/api/corredores/670abe467e4829df062a3965</pre>
        <pre className="code-block">http://localhost:3000/api/corredores/search/name?name=lando</pre>
        <pre className="code-block">http://localhost:3000/api/corredores/search/lastname?lastname=norris</pre>

        <p>Para ordenar corredores:</p>
        <pre className="code-block">http://localhost:3000/api/corredores/sort/points?order=asc</pre>
        <pre className="code-block">http://localhost:3000/api/corredores/sort/points?order=desc</pre>

        <p>Para filtrar corredores:</p>
        <pre className="code-block">http://localhost:3000/api/corredores/filter/wins</pre>
        <pre className="code-block">http://localhost:3000/api/corredores/filter/championship</pre>

        <h5>Cada objeto tendrá estos datos:</h5>
        <pre className="code-block">{`{
  "id": "Id único del piloto",
  "name": "Nombre del piloto",
  "lastname": "Apellido del piloto",
  "team": {
    "id": "id único del equipo",
    "name": "Nombre del equipo",
    "base": "País de origen del equipo",
    "teamChief": "Nombre del jefe de equipo",
    "powerUnit": "Marca del motor",
    "firstEntry": "Año de ingreso a la F1",
    "constructorPoints": "Puntos del equipo en la temporada",
    "constructorChampionships": "Campeonatos de constructores ganados",
    "driverOne": "Id del piloto 1",
    "driverTwo": "Id del piloto 2",
    "logoImg": "url de la imagen del logo del equipo"
  },
  "number": "Número del piloto",
  "birth": "Fecha de nacimiento del piloto",
  "country": "País de origen del piloto",
  "raceWins": "Carreras ganadas por el piloto",
  "podiums": "Podios obtenidos por el piloto",
  "points24": "Puntos obtenidos por el piloto en la temporada",
  "grandPrixEntered": "Grandes premios en los que participó el piloto",
  "worldChampionships": "Campeonatos mundiales ganados por el piloto",
  "driverImg": "url de la imagen del piloto"
}`}</pre>
      </section>

      <section id="teams">
        <h4>Equipos</h4>
        <p>Para filtrar los equipos:</p>
        <pre className="code-block">http://localhost:3000/api/equipo/670abca17e4829df062a3963</pre>
        <pre className="code-block">http://localhost:3000/api/corredores/search/name?name=mclaren</pre>

        <p>Para ordenar equipos:</p>
        <pre className="code-block">http://localhost:3000/api/equipos/sort/constructorPoints?order=asc</pre>
        <pre className="code-block">http://localhost:3000/api/equipos/sort/constructorPoints?order=desc</pre>

        <h5>Cada objeto tendrá estos datos:</h5>
        <pre className="code-block">{`{
  "id": "Id único del equipo",
  "name": "Nombre del equipo",
  "base": "País de origen del equipo",
  "teamChief": "Nombre del jefe de equipo",
  "powerUnit": "Marca del motor",
  "firstEntry": "Año de ingreso a la F1",
  "constructorPoints": "Puntos del equipo en la temporada",
  "constructorChampionships": "Campeonatos de constructores ganados",
  "driverOne": {
    "id": "Id del piloto 1",
    "name": "Nombre del piloto 1",
    "lastname": "Apellido del piloto 1",
    "team": "Nombre del equipo",
    "number": "Numero del piloto 1",
    "birth": "Fecha de nacimiento del piloto 1",
    "country": "País de origen del piloto 1",
    "raceWins": "Carreras ganadas por el piloto 1",
    "podiums": "Podios obtenidos por el piloto 1",
    "points24": "Puntos obtenidos por el piloto 1 en la temporada",
    "grandPrixEntered": "Grandes premios en los que participó el piloto 1",
    "worldChampionships": "Campeonatos mundiales ganados por el piloto 1",
    "driverImg": "url de la imagen del piloto 1"
  },
  "driverTwo": {
    "id": "Id del piloto 2",
    "name": "Nombre del piloto 2",
    "lastname": "Apellido del piloto 2",
    "team": "Nombre del equipo",
    "number": "Numero del piloto 2",
    "birth": "Fecha de nacimiento del piloto 2",
    "country": "País de origen del piloto 2",
    "raceWins": "Carreras ganadas por el piloto 2",
    "podiums": "Podios obtenidos por el piloto 2",
    "points24": "Puntos obtenidos por el piloto 2 en la temporada",
    "grandPrixEntered": "Grandes premios en los que participó el piloto 2",
    "worldChampionships": "Campeonatos mundiales ganados por el piloto 2",
    "driverImg": "url de la imagen del piloto 2"
  },
  "logoImg": "url de la imagen del logo del equipo"
}`}</pre>
      </section>

      <section id="administracion">
        <h3>Administración</h3>
        <p>Para poder administrar la API, se debe iniciar sesión con el usuario y contraseña correspondiente.</p>

        <h4 className="mt-4">Usuarios</h4>
        <p>Como administrador podrás obtener el listado de usuarios, como también crear, editar y borrar.</p>
        <h5>Para obtener el listado de usuarios:</h5>
        <pre className="code-block">http://localhost:3000/usuarios</pre>
        <p>También se puede buscar el usuario por su id:</p>
        <pre className="code-block">http://localhost:3000/usuarios/:id</pre>

        <h5>Para editar dichos usuarios:</h5>
        <pre className="code-block">http://localhost:3000/usuarios/:id</pre>
        <p>El objeto que se debe enviar es el siguiente:</p>
        <pre className="code-block">{`{
  "name": "Nombre",
  "lastname": "Apellido",
  "username": "Usuario",
  "email": "Email",
  "password": "Contraseña",
  "role": "Rol" ("admin" - "super-admin")
}`}</pre>

        <h5>Para borrar un usuario:</h5>
        <pre className="code-block">http://localhost:3000/usuarios/:id</pre>

        <h4 className="mt-4">Corredores</h4>
        <h5>Para crear un corredor:</h5>
        <pre className="code-block">http://localhost:3000/api/corredores</pre>
        <p>El objeto que se debe enviar es el siguiente:</p>
        <pre className="code-block">{`{
  "id": "Id único del piloto",
  "name": "Nombre del piloto",
  "lastname": "Apellido del piloto",
  "team": "Id del equipo al que pertenece",
  "number": "Número del piloto",
  "birth": "Fecha de nacimiento del piloto",
  "country": "País de origen del piloto",
  "raceWins": "Carreras ganadas por el piloto",
  "podiums": "Podios obtenidos por el piloto",
  "points24": "Puntos obtenidos por el piloto en la temporada",
  "grandPrixEntered": "Grandes premios en los que participó el piloto",
  "worldChampionships": "Campeonatos mundiales ganados por el piloto",
  "driverImg": "url de la imagen del piloto"
}`}</pre>
      </section>
    </div>
  );
};

export { Documentation };
