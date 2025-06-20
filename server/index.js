import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import usersRoutes from './routes/usersRoutes.js';
import postsRoutes from './routes/postsRoutes.js';
import commentsRoutes from './routes/commentsRoutes.js';
import sessionsRoutes from './routes/sessionsRoutes.js';

const PORT = process.env.PORT || 5501;

const app = express();

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// users
app.use('/users', usersRoutes);

// posts
app.use('/posts', postsRoutes);

// comments
app.use('/comments', commentsRoutes);

// sessions
app.use('/sessions', sessionsRoutes);