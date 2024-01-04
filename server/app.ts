require('dotenv').config();
import express, { Request, Response, NextFunction } from 'express';
export const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';

app.use(express.json({limit: "50mb"}));
app.use(cookieParser());

app.use(cors({
    origin: process.env.ORIGIN,
}));


// testing route 

app.get('/test', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        sucess: true,
        message: "server is up and running"
    });
}); 

app.get('*', (req: Request, res: Response, next: NextFunction) => {
   const error = new Error(` Route ${req.originalUrl} not found`) as any ;
   error.statusCode = 404;
   next(error);
   
});

