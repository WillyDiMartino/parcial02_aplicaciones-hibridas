import express from "express";
import { auth, verificarRol } from "../middlewares/middlewares.js";

import { getAllTeams, getTeamById, createTeam, updateTeam, deleteTeam, searchByTeamName, sortByConstructorPoints } from "../controllers/teamController.js";

const teamRouter = express.Router();

teamRouter.get("/", auth,  getAllTeams);
teamRouter.get("/:id", auth,  getTeamById);
teamRouter.post("/", auth, verificarRol(["admin", "super-admin"]), createTeam);
teamRouter.put("/:id", auth, verificarRol(["admin", "super-admin"]), updateTeam);
teamRouter.delete("/:id", auth, verificarRol(["admin", "super-admin"]), deleteTeam);
teamRouter.get("/search/name", auth,  searchByTeamName);
teamRouter.get("/sort/constructorPoints", auth, sortByConstructorPoints);

export default teamRouter;