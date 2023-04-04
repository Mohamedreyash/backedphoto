const express=require('express');
const app=express();
const dotenv=require('dotenv')
const routes=require('./backedphoto/Cloud/routes/routes')
var cors=require('cors');
app.use(cors());
const DataBase=require('./backedphoto/Cloud/dataBase/mongo')
const bodyParser=require('body-parser');
app.use(bodyParser.json());
dotenv.config()
app.use(express.json())
app.use('/',routes);
app.listen(process.env.PORT,async()=>{
    await DataBase();
    console.log("Connect port");
})