require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const location = require('./routes/location');
const register = require('./routes/register');

app.get('/',(req,res)=>{
    res.send({
        message : 'Hello world'
    })
});

app.use('/location',location);
app.use('/register',register);

app.listen(PORT,(err)=>{
    if (err) {
        throw err
    }
    console.log(`Server running on http://localhost:${PORT}`);
});