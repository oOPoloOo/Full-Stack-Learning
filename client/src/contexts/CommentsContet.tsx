import { createContext, useReducer, useEffect } from "react";

import type { ChildrenElementProp, Comment, CommentContextReducerActions, CommentContextType } from "../types";


const reducer = (state: Comment[], action: CommentContextReducerActions) => {
  switch(action.type){
    case 'setComment':
      return action.data;
    case 'addComment':
      return [...state, action.newComment];
    case 'removeComment':
      return state.filter(el => el._id !== action._id);
  }
}

const CommentContext = createContext<CommentContextType|undefined>(undefined);

const CommentProvider = ({ children }: ChildrenElementProp) => {

  const [comments, dispatch] = useReducer(reducer, []);

  type BackPostCommentsResponse = 
  { error: Error, message: string } |
  { acknowledged: boolean, comments: Comment[] }

  const fetchPostComments = async (postID: String): Promise<{ error: string } | { success: string }> => {
    const accessJWT = localStorage.getItem('accessJWT') || sessionStorage.getItem('accessJWT');
    try {     
      const BACK_RESPONSE: BackPostCommentsResponse = await fetch(`http://localhost:5500/comments/${postID}`, {
        method: "GET",
        headers: {
          "Content-Type":"application/json",
          Authorization: `Bearer ${accessJWT}`
        },  
      }).then(res => res.json())

      if("error" in BACK_RESPONSE){
        console.error(BACK_RESPONSE.error);
        return { error: BACK_RESPONSE.message };
      } else {
        dispatch({
          type: 'setComment',
          data: BACK_RESPONSE.comments
        });
        return { success: 'Successfully retrieved post comments.' };
      }
    } catch(err) {
      console.error(err);
      return { error: `Some kinda of error has accured` };
    }
  }

  type BackAddCommentResponse = 
    { error: Error, message: string } |
    { acknowledged: boolean, commentData: Comment;}

  const addcomment = async (newComment: Omit<Comment, '_id'>): Promise<{ error: string } | { success: string }> => {
    const accessJWT = localStorage.getItem('accessJWT') || sessionStorage.getItem('accessJWT');
    try {

      const BACK_RESPONSE: BackAddCommentResponse = await fetch(`http://localhost:5500/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessJWT}`
        },
        body: JSON.stringify(newComment)
      }).then(res => res.json());
          
      if("error" in BACK_RESPONSE){
        console.error(BACK_RESPONSE.error);
        return { error: BACK_RESPONSE.message };
      } else {
        dispatch({
          type: 'addComment',
          newComment: BACK_RESPONSE.commentData
        });
        return { success: 'Successfully added new comment.' };
      }
    } catch(err) {
      console.error(err);
      return { error: `Error has occurred` };
    }
  };

  const deletecomment = async (commentId: string): Promise<{ error: string } | { success: string }> => {
    const accessJWT = localStorage.getItem('accessJWT') || sessionStorage.getItem('accessJWT');

  try {
    const response = await fetch(`http://localhost:5500/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessJWT}`,
      }      
    });

    const result = await response.json();

    if (!response.ok || result.error) {
      return { error: result.message || 'Failed to delete comment.' };
    }

    dispatch({
      type: 'removeComment',
      _id: commentId,
    });

    return { success: 'Comment deleted successfully.' };
  } catch (err) {
    console.error(err);
    return { error: 'An error occurred while deleting the comment.' };
  }
};


  return (
    <CommentContext.Provider 
      value={{
        comments,
        fetchPostComments,
         addcomment,
         deletecomment
      }}
    >
      { children }
    </CommentContext.Provider>
  )
}

export { CommentProvider };
export default CommentContext;