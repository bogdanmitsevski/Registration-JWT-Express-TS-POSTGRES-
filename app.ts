require('dotenv').config();
import express from 'express';

const app = express();
app.use(express.json());
const sequelize = require('./db');
const port = process.env.PORT || 3005;
app.use('/auth', require('./routes/userRouter'));


const start = async () =>{
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(port, ()=>{
            console.log('Server is working');
        })
    }

    catch(e) {
        console.log(e);
    }
}

start();