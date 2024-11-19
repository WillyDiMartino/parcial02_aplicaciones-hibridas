import express from 'express';
import {auth, verificarRol} from '../middlewares/middlewares.js';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, loginUser } from '../controllers/userController.js';
import dotenv from 'dotenv';

dotenv.config();

const userRouter = express.Router();

userRouter.get("/", auth, verificarRol(["admin", "super-admin"]), getAllUsers);
userRouter.get("/:id", auth, verificarRol(["admin", "super-admin"]), getUserById);
userRouter.post("/", createUser);
userRouter.put("/:id", auth, verificarRol(["admin", "super-admin"]), updateUser);
userRouter.delete("/:id", auth, verificarRol(["admin", "super-admin"]), deleteUser);
userRouter.post("/login", loginUser);

export default userRouter;

