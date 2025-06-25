import { createContext, useReducer, useEffect } from "react";

import type { ChildrenElementProp, Post, PostContextReducerActions, PostContextType } from "../types";


const reducer = (state: Post[], action: PostContextReducerActions) => {
  switch(action.type){
    case 'setPost':
      return action.data;
    case 'addPost':
      return [...state, action.newPost];
    case 'removePost':
      return state.filter(el => el._id !== action._id);
  }
}

const PostContext = createContext<PostContextType|undefined>(undefined);

const PostProvider = ({ children }: ChildrenElementProp) => {

  const [posts, dispatch] = useReducer(reducer, []);

  const fetchData = () => {
    fetch(`http://localhost:5500/posts`)
      .then(res => res.json())
      .then((data: Post[]) => {
        dispatch({
          type: 'setPost',
          data: data
        });
      })
  }

  type BackAddPostResponse = 
  { error: Error, message: string } |
  { acknowledged: boolean, insertedId: string }
  const addpost = async (newPost: Omit<Post, '_id'>): Promise<{ error: string } | { success: string }> => {
    const accessJWT = localStorage.getItem('accessJWT') || sessionStorage.getItem('accessJWT');
    try {
      // vietoj http://localhost:5500 - galima būtų naudoti proxy (reik set-up'intis)
      const BACK_RESPONSE: BackAddPostResponse = await fetch(`http://localhost:5500/posts`, {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
          Authorization: `Bearer ${accessJWT}`
        },
        body: JSON.stringify(newPost)
      }).then(res => res.json())
      if("error" in BACK_RESPONSE){
        console.error(BACK_RESPONSE.error);
        return { error: BACK_RESPONSE.message };
      } else {
        dispatch({
          type: 'addPost',
          newPost: {
            ...newPost,
            _id: BACK_RESPONSE.insertedId
          }
        });
        return { success: 'Successfully added new post.' };
      }
    } catch(err) {
      console.error(err);
      return { error: `Error has accured` };
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PostContext.Provider 
      value={{
        posts,
        addpost
      }}
    >
      { children }
    </PostContext.Provider>
  )
}

export { PostProvider };
export default PostContext;