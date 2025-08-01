import express from "express";
import { auth, verificarRol } from "../middlewares/middlewares.js";
import { uploadDriverImage } from "../middlewares/upload.js";

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
driverRouter.post("/upload/image", auth, verificarRol(["admin", "super-admin"]), uploadDriverImage.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No se subió ningún archivo" });
  }
  res.status(200).json({ filename: req.file.filename });
});


export default driverRouter;