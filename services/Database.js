const pool = require('./Connection');

const GET_LOCATIONS = process.env.GET_LOCATIONS;
const GET_REGISTERS = process.env.GET_REGISTERS;
const GET_LOCATIONID_BY_VALUE = process.env.GET_LOCATIONID_BY_VALUE
const CREATE_REGISTER = process.env.CREATE_REGISTER
const CREATE_PLANT = process.env.CREATE_PLANT
const GET_DATES_REGISTER = "SELECT fechaCreacion FROM registro GROUP BY fechaCreacion ORDER BY fechaCreacion DESC;"
const GET_REGISTER_BY_FECHA_CREACION = "SELECT idRegistro, ubicacion FROM registro WHERE fechaCreacion = ?"
const GET_VALUES_PLANT_BY_ID_REGISTER = "SELECT tipo AS Nombre, SUM(valor) AS Total, MIN(valor) AS Minimo, MAX(valor) AS Maximo, AVG(valor) AS Promedio FROM planta WHERE idRegistro = ? GROUP BY tipo;"
const GET_VALUES_GENERAL_REGISTER = "SELECT  COUNT(*) AS Nro_plantas, SUM(planta.valor) AS Total, AVG(planta.valor) AS promedio FROM planta, registro WHERE registro.idRegistro = planta.idRegistro AND registro.fechaCreacion = ?;"
const RegisterModel = {
    getRegisters : async ()=>{
        try{
            const response = await pool.query(GET_REGISTERS).then((res)=>res[0]);
            return{
                err : false,
                message  : response
            }
        }catch(err){
            return {
                err : true,
                message : null
            }
        }
    },
    createRegister : async (data)=>{
        try{
            const {evaluador, nroPlantas, fechaCreacion, ubicacion} = data
            const id = await pool.execute(CREATE_REGISTER, [evaluador, nroPlantas, ubicacion,fechaCreacion]).then((res)=>res[0].insertId);
            return {
                err : false,
                message : id
            }
        }catch(err){
            return {
                err : true,
                message : err
            }
        }
    },
    getDatesRegister : async()=>{
        try{
            const dates = await pool.query(GET_DATES_REGISTER).then((res)=>res[0])
            let json_dates = dates.map((val)=>{
                const d = new Date(val['fechaCreacion'])
                return d.toDateString()
            })
            return {
                err : false,
                message : json_dates
            }
        }catch(err){
            console.log(err);
            return {
                err:true,
                message : null
            }
        }
    },
    getRegisterByFecha : async(fechaCreacion)=>{
        try{
            const response = await pool.query(GET_REGISTER_BY_FECHA_CREACION,[fechaCreacion]).then((val)=>val[0]);
            return {
                err : false,
                message : response
            }
        }catch(err){
            return {
                err : true,
                message : null
            }
        }
    }
}
const LocationModel ={
    getLocations : async ()=>{
        try{
            const response = await pool.query(GET_LOCATIONS).then((res)=>res[0])
            return {
                err : false,
                message : response
            }
        }catch(err){
            return {
                err : true,
                message : null
            }
        }
    },
    getLocationId : async(value)=>{
        try{
            const response = await pool.query(GET_LOCATIONID_BY_VALUE,[value]).then(res=>res[0][0])
            return {
                err :false,
                message : response
            }
        }catch(err){
            return {
                err : true,
                message : err
            }
        }
    }
}
const PlantModel = {
    createPlant : async (idRegister, body)=>{
        try{
            const {idUbicacion, tipo, valor} = body;
            const response = await pool.execute(CREATE_PLANT,[idUbicacion,idRegister,tipo,valor]).then(res=>res[0].insertId);
            return{
                err : false,
                message : response
            }
        }catch(err){
            return{
                err : true,
                message : err
            }
        }
    },
    getValuesPlantByIdRegistro : async (idRegister)=>{
        try{
            const response = await pool.query(GET_VALUES_PLANT_BY_ID_REGISTER,[idRegister]).then((val)=>val[0])
            return {
                err : false,
                message : response
            }

        }catch(err){
            return{
                err : true,
                message : null
            }
        }
    },
    getValuesGeneralPlanta : async(fechaCreacion)=>{
        try{
            const response = await pool.query(GET_VALUES_GENERAL_REGISTER,[fechaCreacion]).then((val)=>val[0][0]);
            return{
                err : false,
                message : response
            }
        }catch(err){
            return{
                err:true,
                message : null
            }
        }
    }
}
module.exports = {RegisterModel, LocationModel, PlantModel}