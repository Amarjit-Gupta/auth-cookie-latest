import mongoose from 'mongoose';

const connectDb = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.DB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); 
    }
};

export default connectDb;