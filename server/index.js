import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import usersRoutes from './routes/usersRoutes.js';

const PORT = process.env.PORT || 5501;

const app = express();

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// users
app.use('/users', usersRoutes);