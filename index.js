require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const location = require('./routes/location');
const register = require('./routes/register');
const plant = require('./routes/plant');

app.use(express.urlencoded({extended : false}));

app.get('/',(req,res)=>{
    res.send({
        message : 'Hello world'
    })
});

app.use('/location',location);
app.use('/register',register);
app.use('/plant',plant);

app.listen(PORT,(err)=>{
    if (err) {
        throw err
    }
    console.log(`Server running on http://localhost:${PORT}`);
});