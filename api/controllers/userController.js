import Users from "../model/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { usersValidate } from "../validations/validation.js";

dotenv.config();

const secretKey = process.env.SECRET;

const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json(user);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createUser = async (req, res) => {
    const { name, lastname, username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const { error } = usersValidate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    try {
        const user = new Users({ name, lastname, username, email, password: hashedPassword });
        const usuarioGuardado = await user.save();
        res.json({ message: `Usuario ${usuarioGuardado.username} creado`, usuarioGuardado});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const updateUser = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updateUser) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json({ message: `Usuario ${updateUser.username} editado`});
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const deleteUser = await Users.findByIdAndDelete(req.params.id);
        if (!deleteUser) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json({ message: `Usuario ${deleteUser.username} eliminado`});
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, secretKey, { expiresIn: "1h" });
        res.status(200).json({ token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser, loginUser };

