import express from 'express';
import cors from 'cors';
import noteRoutes from "./routes/noteRoutes.js";
import db from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the server!');
})

app.use("/api/notes", noteRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
