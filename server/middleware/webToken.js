import jwt from 'jsonwebtoken';

// TODO: fix
export const checkJWT = async (req, res, next) => {
  const accessToken = req.headers.authorization.split(' ')[1]; // Authorization - server/header
  const refreshToken = req.cookies.refreshToken; // cookie, web/response.
  
  try {
    if(accessToken !== 'null' || refreshToken){
      jwt.verify(accessToken, process.env.ACCESS_JWT, (err, decoded) => {
            

        if(err)
        {
           console.log('Server:  ascces token denied');
          if(!refreshToken)
          {
                console.log('Server:  refresh token not found');
            return res.status(400).send({ error: err });
          }
          jwt.verify(refreshToken, process.env.REFRESH_JWT, (err, decoded) => {
           
            if(err)
            {
              console.log('Server:  refresh token denied');
              return res.status(400).send({ error: err });
            } else {
              console.log('Server:  refresh token verified');
              next();
            }
          });
        } else 
        {
           console.log('Server:  ascces token verified');
          next();
        }
      });
    } else {
      console.log('Server: refresh and ascces tokens');
      res.status(400).send({ error: "You have to log in" });
    }
  } catch(err) {
    res.status(500).send({ error: err });
  }
}

export const createAccessJWT = (newUser) => {
  return jwt.sign(newUser, process.env.ACCESS_JWT, {
    expiresIn: '60m'
  });
}

export const createRefreshJWT = (newUser) => {
  return jwt.sign(newUser, process.env.REFRESH_JWT, {
    expiresIn: '40m'
  });
}

export const verifyAdmin = (req, res, next) => {
  if(req.headers.role === 'admin'){
    next();
  } else {
    res.status(401).send({ error: 'You do not have permission to access this information.' });    
  }
}