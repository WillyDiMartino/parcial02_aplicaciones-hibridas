import express from "express";
import { auth, verificarRol } from "../middlewares/middlewares.js";

import { getAllDrivers, getDriverById, createDriver, updateDriver, deleteDriver, searchByName, searchByLastName, sortByPoints, filterByRaceWins, filterByWorldChampionship} from "../controllers/driverController.js";

const driverRouter = express.Router();

driverRouter.get("/", auth, getAllDrivers);
driverRouter.get("/:id", auth,  getDriverById);
driverRouter.post("/", auth,verificarRol(["admin", "super-admin"]),  createDriver);
driverRouter.put("/:id", auth,verificarRol(["admin", "super-admin"]),  updateDriver);
driverRouter.delete("/:id", auth,verificarRol(["admin", "super-admin"]),  deleteDriver);
driverRouter.get("/search/name", auth,  searchByName);
driverRouter.get("/search/lastname", auth,  searchByLastName);
driverRouter.get("/sort/points", auth,  sortByPoints);
driverRouter.get("/filter/wins", auth,  filterByRaceWins);
driverRouter.get("/filter/championship", auth,  filterByWorldChampionship);



export default driverRouter;