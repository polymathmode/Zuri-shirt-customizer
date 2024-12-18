
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

// Serve frontend
 
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, './build')));
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './build/index.html'));
//   });
// }


if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '../../apps/client/dist');
  app.use(express.static(buildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 9090;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


export default app
