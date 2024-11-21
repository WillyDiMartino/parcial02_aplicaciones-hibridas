import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.SECRET;

const auth = (req, res, next) => {
  let token = req.get("token");
  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ mensaje: "Token expirado, vuelva a iniciar sesion" });
      }
      console.log(error);
      return res.status(401).json({ mensaje: error });
    }
    req.user = decoded.user;
    next();
  });
};

function verificarRol(rolesPermitidos) {
  return function (req, res, next) {
    if (rolesPermitidos.includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({ mensaje: "Acceso denegado" });
    }
  };
}

export { auth, verificarRol };
