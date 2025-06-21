import { findUser, checkUser } from "./dbController.js";
import { createNewUser } from './usersController.js';
import { createAccessJWT, createRefreshJWT} from '../middleware/webToken.js';

export const login = async (req, res) => {
   try 
   {    
    const user = await findUser( req.body.email, req.body.password);  

    if(!user){
      return res.status(400).send({ error: `No user found with user email and/or password.` });
    }

    // sukuriame jsonWebToken    
    const accessToken = createAccessJWT(user);
    const refreshToken = createRefreshJWT(user);
    res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false
      })
      .header('Authorization', accessToken)
    res.send({ success: "Sucessfully logged in" });
  } catch(err) {
    console.log(err);
    res.status(500).send({ error: `Something wrong with server, please try to log in later.` })
  }
}

export const register = async (req, res) => {
    
    const user = await checkUser( req.body.email, req.body.password );
    if(user)
    {
        return res.status(405).send({ error: "User with such email already exists." });
    }
    const newUser = await createNewUser(req, res); 

    // sukuriame jsonWebToken
    const accessToken = createAccessJWT(newUser);
    console.log('REGISTER 4 --------'); 
    const refreshToken = createRefreshJWT(newUser);
    console.log('REGISTER 5 --------'); 
    res
        .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false
        })
        .header('Authorization', accessToken)
        .send({
        success: "Your user was created"
        });
}


export const loginAuto = async (req, res) => {
  const accessToken = req.headers.authorization.split(' ')[1];
  const verifyResults = validateJWT(accessToken);
 
  if('error' in verifyResults)
  {   
    res.status(400).send(verifyResults);
  } 
  else 
  {  
    res.send(verifyResults);
  }
}