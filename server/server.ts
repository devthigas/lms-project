import { app } from "./app";
require('dotenv').config();


app.listen(process.env.PORT, () =>{
    console.log(`Servidor rodando na Porta ${process.env.PORT}`); 
});