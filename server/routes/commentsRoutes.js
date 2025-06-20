import { Router } from 'express';

import * as CommentsController from '../controllers/commentsController.js';


const router = Router();

// returns all comments
router.get('', CommentsController.returnAllComments);

// return specific comment by id
router.get('/:id', CommentsController.returnCommentById);

// create new comment
router.post('/', CommentsController.createNewComment);

// delete comment by id
router.delete('/:id', CommentsController.deleteCommentById);


export default router;