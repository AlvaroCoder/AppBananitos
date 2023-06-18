const pool = require('./Connection');

const GET_LOCATIONS = process.env.GET_LOCATIONS;
const GET_REGISTERS = process.env.GET_REGISTERS;
const GET_LOCATIONID_BY_VALUE = process.env.GET_LOCATIONID_BY_VALUE
const CREATE_REGISTER = process.env.CREATE_REGISTER
const CREATE_PLANT = process.env.CREATE_PLANT
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
            const {evaluador, nroPlantas, fechaCreacion} = data
            const id = await pool.execute(CREATE_REGISTER, [evaluador, nroPlantas, fechaCreacion]).then((res)=>res[0].insertId);
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
    }
}
module.exports = {RegisterModel, LocationModel, PlantModel}