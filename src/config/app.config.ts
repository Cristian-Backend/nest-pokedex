
// CONFIGURACIONES DE VARIABLES DE ENTORNO
export const EnvConfiguration = () => ({
    //Mapear variables de entorno
    environment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 3002,
    defaultLimit: +process.env.DEFAULT_LIMIT || 7,

})