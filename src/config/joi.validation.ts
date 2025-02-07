
import * as Joi from 'joi'; 

// validamos las variables de entorno.
export const JoiValidationSchema = Joi.object({ 
    MONGODB: Joi.required() ,
    PORT: Joi.number().default(3005), // si no conecta en el puerto que quiero, lo conecta en 3005 por defecto.
    DEFAULT_LIMIT: Joi.number().default(6),
})