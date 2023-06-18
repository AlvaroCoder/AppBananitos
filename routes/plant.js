const routes = require('express').Router();
const {RegisterModel, PlantModel, LocationModel} = require('../services/Database');
routes.post('/',async (req,res)=>{
    try{
        const body = req.body || {};
        const data = body['{body'].slice(0,body['{body'].length-1)
        const json_data = JSON.parse(data);
        const keys_data = Object.keys(json_data);
        const nro_plantas = Object.values(json_data).map((val)=>val.slice(1,val.length-1).split(/,/).length).reduce((prev, a)=>prev+a,0)
        const date = new Date()
        const data_register = {
            evaluador : 'Pierina',
            nroPlantas : nro_plantas,
            fechaCreacion : (date.getFullYear()+'-'+(date.getUTCMonth()+1).toString().padStart(2, "0")+'-'+date.getUTCDate().toString().padStart(2, "0"))
        }
        const idRegister = (await RegisterModel.createRegister(data_register)).message;

        keys_data.map(async(val)=>{
            let loc = val.split('_')[0];
            let tipo = val.split('_')[1];
            let idUbicacion = (await LocationModel.getLocationId(loc)).message['idUbicacion']
            let str_values = json_data[val]
            let values = str_values.slice(1,str_values.length-1).split(',')
            values.forEach(async (item)=>{
                let valor = Number(item.trim())
                let data2send = {
                    idUbicacion,
                    tipo,
                    valor
                }
                const res =  await PlantModel.createPlant(idRegister,data2send);
                console.log(res);
            });
        });

        res.send({
            err : false,
            message : 'Data upload succesfully!'
        })
    }catch(err){
        console.log(err);
        res.send({
            err : true,
            message : 'Something occur !'
        })
    }
})

module.exports = routes