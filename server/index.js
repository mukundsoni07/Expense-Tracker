import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import transactionRoutes from './routes/transactionRoute.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: '*',
    })
)

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI


app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/transactions', transactionRoutes);

mongoose.connect(MONGO_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("Error connecting to database", err));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));