require('dotenv').config();
const express = require('express')
const cors = require('cors')
const router = require('./routes/index');
const errorHandler = require('./handlers/ExceptionHandling')
const PORT = process.env.PORT || 4765;
const app =  express();

app.use(cors({
    origin:'*',
    methods: ['GET','POST','DELETE']
}));
app.use(express.json());
app.use('/api',router);

app.use(errorHandler);

const start = async ()=>{
    try{

        app.listen(PORT,()=>console.log(`Server Trello started on port ${PORT}`));
    }catch(e){
        console.log(e);
    }
}
start();
