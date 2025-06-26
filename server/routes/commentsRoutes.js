import { Router } from 'express';
import { isCommentsCreator } from '../controllers/dbController.js';
import { checkJWT } from '../middleware/webToken.js';
import * as CommentsController from '../controllers/commentsController.js';


const router = Router();

// returns all comments
router.get('', CommentsController.returnAllComments);

// return specific comments by id
router.get('/:id', CommentsController.returnCommentByPostId);

// create new comment
router.post('/',checkJWT, CommentsController.createNewComment);

// delete comment by id
router.delete('/:id', checkJWT, isCommentsCreator, CommentsController.deleteCommentById);

// TODO: Finish
// edit comment 
// router.patch('/:id',checkJWT, isCommentsCreator, CommentsController.updateCommentById);

export default router;