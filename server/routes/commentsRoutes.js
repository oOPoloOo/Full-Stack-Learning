import { Router } from 'express';

import * as CommentsController from '../controllers/commentsController.js';


const router = Router();

// returns all comments
router.get('', CommentsController.returnAllComments);

// return specific comment by id
router.get('/:id', CommentsController.returnCommentById);

export default router;