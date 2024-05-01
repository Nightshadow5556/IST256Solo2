import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import blogRoutes from "./routes/blogRoutes.js";


const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/IST256Solo2')
    .then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting", err);
});

app.use('/users', userRoutes);
app.use('/blogs', blogRoutes);

app.listen(port, () => {
    console.log("Server is running");
})


