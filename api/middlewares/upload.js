import multer from 'multer';
import path from 'path';
import fs from 'fs';

const ensureFolder = (folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
};

const driverFolder = 'uploads/drivers';
ensureFolder(driverFolder);

const storageDrivers = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, driverFolder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${file.originalname}`;
    cb(null, name);
  },
});

const uploadDriverImage = multer({ storage: storageDrivers });

const teamFolder = 'uploads/teams';
ensureFolder(teamFolder);

const storageTeams = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, teamFolder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${file.originalname}`;
    cb(null, name);
  },
});

const uploadTeamImage = multer({ storage: storageTeams });

export { uploadDriverImage, uploadTeamImage };
