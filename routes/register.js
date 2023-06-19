const routes = require('express').Router();
const { RegisterModel } = require('../services/Database');
routes.get("/",async (req,res)=>{
    const data = await RegisterModel.getRegisters();
    res.send(data)
});
routes.post("/",async(req,res)=>{
    const body = req.body;
    const object = Object.keys(body)[0];
    const json_body = JSON.parse(object);
    const idRegister = await RegisterModel.createRegister(json_body)
    res.send({
        err : false,
        message : 2
    })
});
module.exports = routes;

