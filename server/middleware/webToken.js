import jwt from 'jsonwebtoken';


export const checkJWT = async (req, res, next) => {
  const accessToken = req.headers.authorization.split(' ')[1]; // Authorization - server/header
  const refreshToken = req.cookies.refreshToken; // cookie, web/response.
  
  try {
    if(accessToken !== 'null' || refreshToken){
      jwt.verify(accessToken, process.env.ACCESS_JWT, (err, decoded) => {
       
        if(err)
        {
          if(!refreshToken)
          {
            return res.status(400).send({ error: err });
          }
          jwt.verify(refreshToken, process.env.REFRESH_JWT, (err, decoded) => {

            if(err)
            {
              return res.status(400).send({ error: err });
            } else {
              next();
            }
          });
        } else 
        {
          next();
        }
      });
    } else {
      console.log('do not have access');
      res.status(400).send({ error: "You have to log in" });
    }
  } catch(err) {
    res.status(500).send({ error: err });
  }
}

export const createAccessJWT = (newUser) => {
  return jwt.sign(newUser, process.env.ACCESS_JWT, {
    expiresIn: '10s'
  });
}

export const createRefreshJWT = (newUser) => {
  return jwt.sign(newUser, process.env.REFRESH_JWT, {
    expiresIn: '1m'
  });
}

export const verifyAdmin = (req, res, next) => {
  if(req.headers.role === 'admin'){
    next();
  } else {
    res.status(401).send({ error: 'You do not have permission to access this information.' });    
  }
}