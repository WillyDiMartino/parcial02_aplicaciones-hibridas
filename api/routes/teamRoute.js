import express from "express";
import { auth, verificarRol } from "../middlewares/middlewares.js";
import { uploadTeamImage } from "../middlewares/upload.js";

import { getAllTeams, getTeamById, createTeam, updateTeam, deleteTeam, searchByTeamName, sortByConstructorPoints } from "../controllers/teamController.js";

const teamRouter = express.Router();

teamRouter.get("/", auth,  getAllTeams);
teamRouter.get("/:id", auth,  getTeamById);
teamRouter.post("/", auth, verificarRol(["admin", "super-admin"]), createTeam);
teamRouter.put("/:id", auth, verificarRol(["admin", "super-admin"]), updateTeam);
teamRouter.delete("/:id", auth, verificarRol(["admin", "super-admin"]), deleteTeam);
teamRouter.get("/search/name", auth,  searchByTeamName);
teamRouter.get("/sort/constructorPoints", auth, sortByConstructorPoints);
teamRouter.post(
  "/upload/image",
  auth,
  verificarRol(["admin", "super-admin"]),
  uploadTeamImage.single("image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No se subió ningún archivo" });
    }
    res.status(200).json({ filename: req.file.filename });
  }
);

export default teamRouter;