import { Router } from 'express';

import * as PostsController from '../controllers/postsController.js';

const router = Router();

// returns all posts
router.get('', PostsController.returnAllPosts);

// return specific posts by id
router.get('/:id', PostsController.returnPostById);

// create new posts
router.post('/', PostsController.createNewPost);

// delete posts by id
router.delete('/:id', PostsController.deletePostById);

export default router;