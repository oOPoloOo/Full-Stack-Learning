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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PostContext.Provider 
      value={{
        posts
        // addMerch
      }}
    >
      { children }
    </PostContext.Provider>
  )
}

export { PostProvider };
export default PostContext;