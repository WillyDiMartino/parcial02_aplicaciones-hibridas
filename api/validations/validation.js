import Joi from 'joi';

export const usersValidate = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        lastname: Joi.string().min(3).max(30).required(),
        username: Joi.string().min(3).max(20).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required(),
        role: Joi.string().valid('admin', 'user', 'super-admin')
    });
    return schema.validate(data);
};

export const driverValidate = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        lastname: Joi.string().min(3).max(30).required(),
        team: Joi.string().min(3).max(100).allow(null, ''),
        number: Joi.number().required(),
        birth: Joi.date().required(),
        country: Joi.string().min(3).max(30).required(),
        raceWins: Joi.number().required(),
        podiums: Joi.number().required(),
        points24: Joi.number().required(),
        grandPrixEntered: Joi.number().required(),
        worldChampionships: Joi.number().required(),
        driverImg: Joi.string().required()
    });
    return schema.validate(data);
};

export const teamValidate = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        base: Joi.string().min(3).max(50).required(),
        teamChief: Joi.string().min(3).max(100).required(),
        powerUnit: Joi.string().min(3).max(100).required(),
        firstEntry: Joi.number().required(),
        constructorPoints: Joi.number().required(),
        constructorChampionships: Joi.number().required(),
        driverOne: Joi.string().min(3).max(100).allow(null, ''),
        driverTwo: Joi.string().min(3).max(100).allow(null, ''),
        logoImg: Joi.string().required()
    })
    return schema.validate(data);
};