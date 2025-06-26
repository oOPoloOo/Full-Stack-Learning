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

   const fetchPosts = async () => {
    try {
      const res = await fetch(`http://localhost:5500/posts`);
      const data: Post[] = await res.json();
      console.dir("POSTCONTEX fetchPosts post ", data);

      dispatch({ type: 'setPost', data });
    } catch (error) {
      console.error("Failed to fetch posts", error);
    }
  };

    useEffect(() => {
    fetchPosts();
  }, []);

  
  type BackAddPostResponse =
| { error: Error; message: string }
| {
    postData: Post; acknowledged: boolean;  
  };

  const addpost = async (
    newPost: Omit<Post, "_id">
  ): Promise<{ error: string } | { success: string; }> => {
    const accessJWT = localStorage.getItem("accessJWT") || sessionStorage.getItem("accessJWT");

    try {
      const BACK_RESPONSE: BackAddPostResponse = await fetch(`http://localhost:5500/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessJWT}`,
        },
        body: JSON.stringify(newPost),
      }).then((res) => res.json());

      if ("error" in BACK_RESPONSE) {
        console.error(BACK_RESPONSE.error);
        return { error: BACK_RESPONSE.message };
      } else {
       
        dispatch({ type: "addPost", newPost:  BACK_RESPONSE.postData});
        return { success: "Successfully added new post." };
      }
    } catch (err) {
      console.error(err);
      return { error: `Error has occurred` };
    }
  };

  const deletepost = async (postId: string, userEmail: String): Promise<{ error: string } | { success: string }> => {
  
    const accessJWT = localStorage.getItem('accessJWT') || sessionStorage.getItem('accessJWT');
  try {
    const response = await fetch(`http://localhost:5500/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessJWT}`,
      },
      body: JSON.stringify({ email: userEmail }),
    });
    const result = await response.json();

    if (!response.ok || result.error) {
      return { error: result.message || 'Failed to delete post.' };
    }
    
    dispatch({
      type: 'removePost',
      _id: postId,
    });

    return { success: 'Post deleted successfully.' };
  } catch (err) {
    console.error(err);
    return { error: 'An error occurred while deleting the post.' };
  }
};

  return (
    <PostContext.Provider 
      value={{
        posts,
        addpost,
        deletepost,
        fetchPosts
      }}
    >
      { children }
    </PostContext.Provider>
  )
}

export { PostProvider };
export default PostContext;