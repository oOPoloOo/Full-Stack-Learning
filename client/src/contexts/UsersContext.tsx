import { useNavigate } from "react-router";
import { useState, useEffect, createContext, useReducer } from "react";
import type { User, ChildrenProp, UserContextTypes, UserContextReducerActions } from "../types";


const reducer = (state: Omit<User, 'password'> | null, action: UserContextReducerActions): Omit<User, 'password'> | null => {
  switch(action.type){
    case 'setUser':
      return action.user;
    case 'logUserOut':
      return null;
    case 'editUser':
      return state ? {
        ...state,
        [action.key]: action.newValue
      } : state;   
  }
}

const UserContext = createContext<UserContextTypes | undefined>(undefined);
const UserProvider = ({ children }: ChildrenProp) => {
  
  const [loggedInUser, dispatch] = useReducer(reducer, null);
  const navigate = useNavigate();

 
 

  const register = async (values: Pick<User,"name" | "email" | "password">) => {
    try {
      const bodyToSend = {
        name: values.name,
        email: values.email,
        password: values.password
      };
      const BACK_RESPONSE = await fetch(`http://localhost:5500/users/register`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(bodyToSend)
      }).then(res => {
        const authHeader = res.headers.get('Authorization');
        if (authHeader !== null) 
        {
          localStorage.setItem('accessJWT', authHeader);
        }  
        return res.json();
      });

      if(BACK_RESPONSE.success){
           dispatch({
          type: 'setUser',
          user: BACK_RESPONSE.userData
        });
        return { success: BACK_RESPONSE.success };
      } else {
        return { error: BACK_RESPONSE.error };
      }
    } catch(err) {
      console.log(err);
      return { error: err };
    }
  }

  const login = async (loginInfo:  Pick<User, "email" | "password">, keepLoggedIn: boolean) => {
    try 
    {     
      const BACK_RESPONSE = await fetch(`http://localhost:5500/users/login`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(loginInfo)
      }).then(res => {
        
        const authHeader = res.headers.get('Authorization');

        if (authHeader !== null) 
        {         
          if(keepLoggedIn){
            localStorage.setItem('accessJWT', authHeader);
          } else {
            sessionStorage.setItem('accessJWT', authHeader);
          }          
        }
        return res.json();
      });
      
      if(BACK_RESPONSE.success){
        dispatch({
          type: 'setUser',
          user: BACK_RESPONSE.userData
        });
      
        return { success: BACK_RESPONSE.success };
      } else {
        return { error: BACK_RESPONSE.error };
      }
    } catch(err) {
      console.log(err);
      return { error: err };
    }
  }

  const logout = () => {
    dispatch({
      type: 'logUserOut'
    });
    localStorage.removeItem('accessJWT');
    sessionStorage.removeItem('accessJWT');
  }
  
  useEffect(() => {
    const accessJWT = localStorage.getItem('accessJWT') || sessionStorage.getItem('accessJWT');
    if(accessJWT){
      fetch(`http://localhost:5500/users/loginAuto`, {
        headers: {
          Authorization: `Bearer ${accessJWT}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if('error' in data){
            // modal about error
            console.log(data.error);
            localStorage.removeItem('accessJWT');
            // navigate to login after few seconds
            navigate('/login');
          } 
          else 
          {
            console.log('sessions successfully resumed');
            dispatch({
              type: 'setUser',
              user: data
            });
        }
      })
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        loggedInUser,
        register,
        login,
        logout
      }}
    >
      { children }
    </UserContext.Provider>
  );
}




// const reducer = (state: User[], action: UsersReducerActionTypes): User[] => {  
// };

// const UsersContext = createContext<UsersContextTypes | undefined>(undefined);

//  const UsersProvider = ({ children }: ChildrenProp) => {

    // TODO: Implement the reducer function
//   const [users, dispatch] = useReducer(reducer, []);
//   const [loggedInUser, setLoggedInUser] = useState<User | null>(() => {  });

// useEffect(() => {
//     fetch(`http://localhost:8080/users`)
//       .then(res => res.json())
//       .then(data => dispatch({
//         type: 'setUsers',
//         data: data
//       }))
//   }, []);





//   return (
//     <UsersContext.Provider
//       value={{
//         loggedInUser,
//         setLoggedInUser,
//         users,
//         dispatch,
//       }}
//     >
//       {children}
//     </UsersContext.Provider>
//   );
//   return ( null );
// };

export { UserProvider };
export default UserContext;