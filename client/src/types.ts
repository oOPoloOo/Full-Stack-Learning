
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  passwordText: string;
  role: 'user' | 'admin';
};
// export type UsersReducerActionTypes = 
// { type: 'setUsers', data: User[]} |
// { type: 'addUser', newUser: User } |
// { type: 'deleteUser', id: User['id'] }

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

// export type BackLoginResponse = { error: string } | { success: string, userData: Omit<User, 'password'> };
