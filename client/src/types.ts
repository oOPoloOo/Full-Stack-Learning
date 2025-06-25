
export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  passwordText: string;
  role: 'user' | 'admin';
};

export type UserContextReducerActions = 
{ type: 'setUser', user: Omit<User, 'password'> } |
{ type: 'logUserOut' } |
{ type: 'editUser', key: keyof Omit<User, 'password'|'_id'|'role'|'likedMerch'>, newValue: string | number };


// TODO: 110
export type UserContextTypes = {
  loggedInUser: Omit<User, "password"> | null,
  logout: () => void, 
  // TODO: keepLoggedIn, editUser 
  login: ({ email, password }: Pick<User, "email" | "password">, keepLoggedIn: boolean) => Promise<{ error: string } | { success: string }>,
  register: ({ name, email, password }: Pick<User,"name" | "email" | "password">) => Promise<{ error: string } | { success: string }>,
};

export type ChildrenProp = {
  children: React.ReactElement
};

export type ChildrenElementProp = { children: React.ReactElement };
export type ChildrenNodeProp = { children: React.ReactNode };

export type Post = {
  _id: string,
  user_id: string,
  name: string,
  email: string,
  text: string,
  date: string
};

export type PostContextType = {
  posts: Post[],
 addpost: (newPost: Omit<Post, "_id">) => Promise<{ error: string } | { success: string }>,
 deletepost: (postId: string, userEmail: string) => Promise<{ error: string } | { success: string }>;
};

export type PostContextReducerActions = 
{ type: 'setPost', data: Post[] } |
{ type: 'addPost', newPost: Post } |
{ type: 'removePost', _id: Post['_id'] };

export type Comment = {
  _id: string,
  user_id: string,
  name: string,
  email: string,
  text: string,
  date: string
};

export type CommentContextType = {
  comments: Comment[],
  fetchPostComments: (postID: string) => Promise<{ error: string } | { success: string }>;

  // addComment: (newComment: Omit<Comment, "_id">) => Promise<{ error: string } | { success: string }>
};

export type CommentContextReducerActions = 
{ type: 'setComment', data: Comment[] } |
{ type: 'addComment', newComment: Comment } |
{ type: 'removeComment', _id: Comment['_id'] };

