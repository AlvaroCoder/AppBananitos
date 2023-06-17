const routes = require('express').Router();
const { LocationModel } = require('../services/Database');

routes.get("/",async (req,res)=>{
    const data = await LocationModel.getLocations()
    res.send(data)
})

module.exports = routes;