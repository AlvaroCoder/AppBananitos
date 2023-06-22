const routes = require('express').Router();
const { RegisterModel, PlantModel } = require('../services/Database');
routes.get("/dates",async(req,res)=>{
    const response = await RegisterModel.getDatesRegister();
    res.send(response);
});
routes.get("/",async(req,res)=>{
    const header = req.headers;
    const fechaCreacion = header['fechacreacion']
    const response_registers = await RegisterModel.getRegisterByFecha(fechaCreacion);
    console.log(fechaCreacion);
    const registers = response_registers.message
    let values = registers.map(async(val)=>{
        const idRegistro = val['idRegistro'];
        const values = (await PlantModel.getValuesPlantByIdRegistro(idRegistro)).message;
        let object = {
            ubicacion : val['ubicacion'],
            valores_tipo : values
        }
        return object
    });
    let valores_generales =(await PlantModel.getValuesGeneralPlanta(fechaCreacion)).message
    Promise.all(values).then((data)=>{
        res.send({
            err : false,
            valores : data,
            valores_generales
        })
    })
    
    
});
routes.post("/",async(req,res)=>{
    const body = req.body;
    const object = Object.keys(body)[0];
    const json_body = JSON.parse(object);
    const idRegister = await RegisterModel.createRegister(json_body)
    res.send({
        err : false,
        message : idRegister
    })
});
module.exports = routes;

