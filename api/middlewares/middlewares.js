import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET;

const auth = (req, res, next) => {
    const getToken = req.headers.authorization;
    if (getToken) {
        const token  = getToken.split(" ")[1];
        jwt.verify(token, secretKey, (err, paylod)=> {
            if(err){
                return res.status(403).json({message: "Token inválido"});
            }else{
                req.user = {id: paylod.id, username: paylod.username, role: paylod.role};
                next();
            }
        })
    } 
};

function verificarRol(rolesPermitidos){
    return function(req, res, next){

        if(rolesPermitidos.includes(req.user.role)){
            next();
        }else{
            res.status(403).json({mensaje: "Acceso denegado"})
        }
    }
}

export {auth, verificarRol}; 