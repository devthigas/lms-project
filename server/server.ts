import { app } from "./app";
import connectDB from "./utils/db";
require('dotenv').config();


app.listen(process.env.PORT, () =>{
    console.log(`Servidor rodando na Porta ${process.env.PORT}`); 
    connectDB();  
});
