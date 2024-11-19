import Driver from "../model/driverModel.js";
import Team from "../model/teamModel.js";
import { driverValidate } from "../validations/validation.js";

const getAllDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find().populate('team');
        res.status(200).json(drivers);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getDriverById = async (req, res) => {
    try {
        const driver = await Driver.findById(req.params.id).populate('team');
        if (!driver) {
            return res.status(404).json({ message: "Conductor no encontrado" });
        }
        res.status(200).json(driver);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createDriver = async (req, res) => {
    const { error } = driverValidate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    try {
        const driver = new Driver(req.body);
        const newDriver = await driver.save();
        res.status(201).json({ message: "Conductor creado", newDriver });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateDriver = async (req, res) => {
    try {
        const updatedDriver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDriver) {
            return res.status(404).json({ message: "Conductor no encontrado" });
        }
        res.status(200).json({ message: "Conductor editado" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteDriver = async (req, res) => {
    try {
        const deletedDriver = await Driver.findByIdAndDelete(req.params.id);
        if (!deletedDriver) {
            return res.status(404).json({ message: "Conductor no encontrado" });
        }
        res.status(200).json({ message: "Conductor eliminado" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const searchByName = async (req, res) => {
    const name = req.query.name;
    if (!name) {
        return res.status(400).json({ message: "El nombre es requerido para la búsqueda." });
    }
    try {
        const driver = await Driver.find({ name: new RegExp(name, 'i') }).populate('team'); 
        
        if (!driver || driver.length === 0) {
            return res.status(404).json({ message: "Conductor no encontrado" });
        }
        res.status(200).json(driver);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

const searchByLastName = async (req, res) => {
    const lastname = req.query.lastname;
    if (!lastname) {
        return res.status(400).json({ message: "El nombre es requerido para la búsqueda." });
    }
    try {
        const driver = await Driver.find({ lastname: new RegExp(lastname, 'i') }).populate('team'); 
        
        if (!driver || driver.length === 0) {
            return res.status(404).json({ message: "Conductor no encontrado" });
        }
        res.status(200).json(driver);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

    const sortByPoints = async (req, res) => {
        const { order } = req.query; 
        let sortOrder = 1;
    
        
        if (order === 'desc') {
            sortOrder = -1;
        } else if (order === 'asc') {
            sortOrder = 1;
        }
    
        try {
            const drivers = await Driver.find().sort({ points24: sortOrder }).populate('team');
    
            if (!drivers || drivers.length === 0) {
                return res.status(404).json({ message: "No se encontraron conductores." });
            }
            res.status(200).json(drivers);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    };

    
    const filterByRaceWins = async (req, res) => {
        try {
            const drivers = await Driver.find({ raceWins: { $gt: 0 } }).populate('team');
            if (!drivers || drivers.length === 0) {
                return res.status(404).json({ message: "No se encontraron conductores con una victoria." });
            }
            res.status(200).json(drivers);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    };

    const filterByWorldChampionship = async (req, res) => {
        try {
            const drivers = await Driver.find({  worldChampionships: { $gt: 0 } }).populate('team');
            if (!drivers || drivers.length === 0) {
                return res.status(404).json({ message: "No se encontraron conductores con un campeonato ganado." });
            }
            res.status(200).json(drivers);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    };

export { getAllDrivers, getDriverById, createDriver, updateDriver, deleteDriver, searchByName, searchByLastName, sortByPoints, filterByRaceWins, filterByWorldChampionship};
