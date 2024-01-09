import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri: string = process.env.DB_URI || '';

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log(`MongoDB connected with server: ${mongoose.connection.host}`);
    } catch (error) {
        console.error(error);
        setTimeout(connectDB, 5000);
    };
};

export default connectDB;
