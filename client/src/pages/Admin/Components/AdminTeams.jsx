// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { Modal, Button } from 'react-bootstrap';
// import { AuthContext } from '../../../context/AuthContext';
// import { EditTeamModal } from '../Modals/EditTeamModal';
// import { DeleteTeamModal } from '../Modals/DeleteTeamModal';
// import { Register } from '../../../components';

// const AdminTeams = () => {
//   const [teams, setTeams] = useState([]);
//   const [show, setShow] = useState(false);
//   const [selectedTeam, setSelectedTeam] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const { auth } = useContext(AuthContext);

//   const handleCloseModal = () => setShow(false);

//   const handleToogleModal = (action) => {
//     if (action === 'register') {
//       setShow(true);
//     }
//   };

//   const fetchTeams = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/equipos', {
//         headers: { token: auth },
//       });
//       setTeams(response.data);
//     } catch (error) {
//       console.error('Error al obtener equipos:', error);
//     }
//   };

//   const handleEditTeam = async (updatedTeam) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:3000/equipos/${updatedTeam.id}`,
//         updatedTeam,
//         {
//           headers: {
//             token: auth,
//           },
//         }
//       );
//       if (response.status === 200) {
//         fetchTeams();
//       } else {
//         console.error('Error al actualizar el equipo');
//       }
//     } catch (error) {
//       console.error('Error en la solicitud:', error);
//     }
//   };

//   const handleDeleteTeam = async () => {
//     if (!selectedTeam?._id) {
//       console.error("No se encontró el ID del equipo.");
//       return;
//     }

//     if (!auth) {
//       console.error("No se encontró el token de autenticación.");
//       return;
//     }

//     try {
//       const response = await axios.delete(
//         `http://localhost:3000/equipos/${selectedTeam._id}`,
//         {
//           headers: { token: auth },
//         }
//       );

//       if (response.status === 200) {
//         console.log(`Equipo ${selectedTeam.name} eliminado`);
//         fetchTeams();
//         setShowDeleteModal(false);
//       }
//     } catch (error) {
//       console.error("Error al eliminar equipo:", error.response ? error.response.data : error);
//     }
//   };

//   useEffect(() => {
//     fetchTeams();
//   }, []);

//   const handleOpenDeleteModal = (team) => {
//     setSelectedTeam(team);
//     setShowDeleteModal(true);
//   };

//   return (
//     <div className="container mt-4">
//       <h1 className="text-center mb-4">Gestión de Equipos</h1>

//       <Button variant="primary" className="mb-3" onClick={() => handleToogleModal('register')}>
//         Crear Equipo
//       </Button>

//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Nombre</th>
//             <th>Primera Entrada</th>
//             <th>Acciones</th>
//           </tr>
//         </thead>
//         <tbody>
//           {teams.map((team, index) => (
//             <tr key={team._id || index}>
//               <td>{team._id}</td>
//               <td>{team.name}</td>
//               <td>{team.firstEntry}</td>
//               <td>
//                 <Button
//                   variant="warning"
//                   size="sm"
//                   className="me-2"
//                   onClick={() => {
//                     setSelectedTeam(team);
//                     setShowEditModal(true);
//                   }}
//                 >
//                   Editar
//                 </Button>
//                 <Button
//                   variant="danger"
//                   size="sm"
//                   onClick={() => handleOpenDeleteModal(team)}
//                 >
//                   Borrar
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <Modal show={show} onHide={handleCloseModal}>
//         <Register handleCloseModal={handleCloseModal} />
//       </Modal>

//       <EditTeamModal
//         show={showEditModal}
//         onHide={() => setShowEditModal(false)}
//         team={selectedTeam}
//         onSave={handleEditTeam}
//       />

//       <DeleteTeamModal
//         showDeleteModal={showDeleteModal}
//         setShowDeleteModal={setShowDeleteModal}
//         selectedTeam={selectedTeam}
//         handleDeleteTeam={handleDeleteTeam}
//       />
//     </div>
//   );
// };

// export { AdminTeams };
