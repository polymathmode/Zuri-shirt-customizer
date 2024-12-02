
import express from 'express';
import path from "path"
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import designRoutes from './routes/designRoutes.js';
import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
// app.use(express.static('uploads'));
app.use('/uploads', express.static('uploads'));



// Routes
app.use('/api', designRoutes);

// Error handling
app.use(errorHandler);

export default app;


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});