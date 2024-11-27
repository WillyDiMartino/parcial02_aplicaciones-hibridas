// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { Modal, Button } from 'react-bootstrap';
// import { AuthContext } from '../../../context/AuthContext';
// import { EditDriverModal } from '../Modals/EditDriverModal';
// import { DeleteDriverModal } from '../Modals/DeleteDriverModal';
// import { Register } from '../../../components';

// const AdminDrivers = () => {
//   const [drivers, setDrivers] = useState([]);
//   const [show, setShow] = useState(false);
//   const [selectedDriver, setSelectedDriver] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const { auth } = useContext(AuthContext);

//   const handleCloseModal = () => setShow(false);

//   const handleToogleModal = (action) => {
//     if (action === 'register') {
//       setShow(true);
//     }
//   };

//   const fetchDrivers = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/corredores', {
//         headers: { token: auth },
//       });
//       setDrivers(response.data);
//     } catch (error) {
//       console.error('Error al obtener conductores:', error);
//     }
//   };

//   const handleEditDriver = async (updatedDriver) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:3000/corredores/${updatedDriver.id}`,
//         updatedDriver,
//         {
//           headers: {
//             token: auth,
//           },
//         }
//       );
//       if (response.status === 200) {
//         fetchDrivers();
//       } else {
//         console.error('Error al actualizar el conductor');
//       }
//     } catch (error) {
//       console.error('Error en la solicitud:', error);
//     }
//   };

//   const handleDeleteDriver = async () => {
//     if (!selectedDriver?._id) {
//       console.error("No se encontró el ID del conductor.");
//       return;
//     }

//     if (!auth) {
//       console.error("No se encontró el token de autenticación.");
//       return;
//     }

//     try {
//       const response = await axios.delete(
//         `http://localhost:3000/corredores/${selectedDriver._id}`,
//         {
//           headers: { token: auth },
//         }
//       );

//       if (response.status === 200) {
//         console.log(`Conductor ${selectedDriver.name} eliminado`);
//         fetchDrivers();
//         setShowDeleteModal(false);
//       }
//     } catch (error) {
//       console.error("Error al eliminar conductor:", error.response ? error.response.data : error);
//     }
//   };

//   useEffect(() => {
//     fetchDrivers();
//   }, []);

//   const handleOpenDeleteModal = (driver) => {
//     setSelectedDriver(driver);
//     setShowDeleteModal(true);
//   };

//   return (
//     <div className="container mt-4">
//       <h1 className="text-center mb-4">Gestión de Conductores</h1>

//       <Button variant="primary" className="mb-3" onClick={() => handleToogleModal('register')}>
//         Crear Conductor
//       </Button>

//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Nombre</th>
//             <th>Equipo</th>
//             <th>Acciones</th>
//           </tr>
//         </thead>
//         <tbody>
//           {drivers.map((driver, index) => (
//             <tr key={driver._id || index}>
//               <td>{driver._id}</td>
//               <td>{driver.name} {driver.lastname}</td>
//               <td>{driver.team.name}</td>
//               <td>
//                 <Button
//                   variant="warning"
//                   size="sm"
//                   className="me-2"
//                   onClick={() => {
//                     setSelectedDriver(driver);
//                     setShowEditModal(true);
//                   }}
//                 >
//                   Editar
//                 </Button>
//                 <Button
//                   variant="danger"
//                   size="sm"
//                   onClick={() => handleOpenDeleteModal(driver)}
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

//       <EditDriverModal
//         show={showEditModal}
//         onHide={() => setShowEditModal(false)}
//         driver={selectedDriver}
//         onSave={handleEditDriver}
//       />

//       <DeleteDriverModal
//         showDeleteModal={showDeleteModal}
//         setShowDeleteModal={setShowDeleteModal}
//         selectedDriver={selectedDriver}
//         handleDeleteDriver={handleDeleteDriver}
//       />
//     </div>
//   );
// };

// export { AdminDrivers };
