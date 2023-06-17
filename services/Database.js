const pool = require('./Connection');

const GET_LOCATIONS = process.env.GET_LOCATIONS;
const GET_REGISTERS = process.env.GET_REGISTERS;
const RegisterModel = {
    getRegisters : async ()=>{
        try{
            const response = await pool.query(GET_REGISTERS).then((res)=>res[0]);
            return{
                err : false,
                data  : response
            }
        }catch(err){
            return {
                err : true,
                data : null
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
                data : response
            }
        }catch(err){
            return {
                err : true,
                data : null
            }
        }
    }
}
module.exports = {RegisterModel, LocationModel}