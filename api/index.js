import express from 'express';
import userRoute from './routes/userRoute.js';
import driverRoute from './routes/driverRoute.js';
import teamRoute from './routes/teamRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { auth, verificarRol } from './middlewares/middlewares.js'; 

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Conexión exitosa a la base de datos"))
  .catch((error) => console.error("No se pudo conectar a la base de datos", error));

const app = express();

const port = 3000;

app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
app.use(express.static(path.join(path.dirname(__filename), 'public')));

app.get('/', (req, res) => {});

app.use('/documentacion', (req, res) => {
  res.sendFile(path.join(path.dirname(__filename), 'public', 'documentacion.html'));
});

app.use("/usuarios", userRoute);
app.use("/api/corredores", driverRoute);
app.use("/api/equipos", teamRoute);
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use(
  "/admin",
  auth, 
  verificarRol(['admin', 'super-admin']), 
  (req, res) => {
    res.status(200);
  }
);

app.listen(port, () => console.log(`http://localhost:${port}`));
