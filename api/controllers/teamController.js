import Teams from "../model/teamModel.js";
import { teamValidate } from "../validations/validation.js";


const getAllTeams = async (req, res) => {
    try {
        const teams = await Teams.find().populate('driverOne').populate('driverTwo'); 
        res.status(200).json(teams);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getTeamById = async (req, res) => {
    try {
        const team = await Teams.findById(req.params.id).populate('driverOne').populate('driverTwo'); 
        if (!team) return res.status(404).json({ message: "Equipo no encontrado" });
        res.status(200).json(team);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createTeam = async (req, res) => {
    const { error } = teamValidate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    try {
        const team = new Teams(req.body);
        const savedTeam = await team.save(); 
        res.status(201).json({ message: "Equipo creado", savedTeam });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const updateTeam = async (req, res) => {
    try {
        const updatedTeam = await Teams.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTeam) return res.status(404).json({ message: "Equipo no encontrado" });
        res.status(200).json({ message: "Equipo editado" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteTeam = async (req, res) => {
    try {
        const deletedTeam = await Teams.findByIdAndDelete(req.params.id);
        if (!deletedTeam) return res.status(404).json({ message: "Equipo no encontrado" });
        res.status(200).json({ message: "Equipo eliminado" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const searchByTeamName = async (req, res) => {
    const teamName = req.query.teamname;
    if (!teamName) {
        return res.status(400).json({ message: "El nombre del equipo es requerido para la búsqueda." });
    }
    try {
        const team = await Teams.find({ name: new RegExp(teamName, 'i') }).populate('driverOne').populate('driverTwo'); 
        if (!team || team.length === 0) {
            return res.status(404).json({ message: "Equipo no encontrado" });
        }
        res.status(200).json(team);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

const sortByConstructorPoints = async (req, res) => {
    const { order } = req.query; 
    let sortOrder = 1; 

    if (order === 'desc') {
        sortOrder = -1; 
    } else if (order === 'asc') {
        sortOrder = 1; 
    }

    try {
        const teams = await Teams.find().sort({ constructorPoints: sortOrder }).populate('driverOne').populate('driverTwo');

        if (!teams || teams.length === 0) {
            return res.status(404).json({ message: "No se encontraron equipos." });
        }

        res.status(200).json(teams);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};


export { getAllTeams, getTeamById, createTeam, updateTeam, deleteTeam, searchByTeamName, sortByConstructorPoints};
