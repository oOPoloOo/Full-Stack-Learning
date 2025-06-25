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
        console.log('CLIENT BACK_RESPONSE', BACK_RESPONSE);
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

  return (
    <CommentContext.Provider 
      value={{
        comments,
        fetchPostComments 
        // addComment
      }}
    >
      { children }
    </CommentContext.Provider>
  )
}

export { CommentProvider };
export default CommentContext;