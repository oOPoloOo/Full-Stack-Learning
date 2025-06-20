import { Router } from 'express';

import * as PostsController from '../controllers/postsController.js';

const router = Router();

// returns all posts
router.get('', PostsController.returnAllPosts);

// return specific posts by id
router.get('/:id', PostsController.returnPostById);

export default router;