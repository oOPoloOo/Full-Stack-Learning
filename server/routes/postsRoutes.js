import { Router } from 'express';
import * as PostsController from '../controllers/postsController.js';
import { checkJWT } from '../middleware/webToken.js';
import { isPostCreator } from '../controllers/dbController.js';
const router = Router();

// returns all posts
router.get('', PostsController.returnAllPosts);

// return specific posts by id
router.get('/:id', PostsController.returnPostById);

// create new posts
router.post('/',checkJWT, PostsController.createNewPost);

// delete posts by id
router.delete('/:id',checkJWT, isPostCreator, PostsController.deletePostById);

// TODO: Finish
// edit posts 
// router.patch('/:id',checkJWT, isPostCreator, PostsController.updatePostById);
export default router;