const routes = require('express').Router();
const { RegisterModel } = require('../services/Database');
routes.get("/",async (req,res)=>{
    const data = await RegisterModel.getRegisters();
    res.send(data)
});
module.exports = routes;

