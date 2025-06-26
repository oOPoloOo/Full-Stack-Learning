import { MongoClient } from "mongodb";

const DB_CONNECTION_STRING = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.${process.env.DB_CLUSTER_ID}.mongodb.net/`;

export const connectDB = async () => {
  return await MongoClient.connect(DB_CONNECTION_STRING);
}

export const checkUser = async (uEmail) => {
  const client = await connectDB();

  let filter = 
  {     
    email: uEmail    
  };

  const user = await client.db(process.env.DB_NAME).collection('users').findOne(filter);

  return user;
}

export const findUser = async (uEmail, uPassword) => {
  const client = await connectDB();

  let filter = 
  {     
    $and: 
    [
      { email: uEmail },
      { password: uPassword }
    ]
  };

  const user = await client.db(process.env.DB_NAME).collection('users').findOne(filter);
 
  return user;
}


export const isPostCreator  = async (req, res, next) => {
  const client = await connectDB();
  
  let filter = 
  { 
    _id: req.params.id
  };
  
  const userEmail =  req.body.email; 
  const post = await client.db(process.env.DB_NAME).collection('posts').findOne(filter);
  if(post.email !== userEmail) 
  {
    return res.status(401).send({ error: 'You do not have permission to do this action.' });      
  }  
  next();
}

export const isCommentsCreator  = async (req, res, next) => {
  const client = await connectDB(); 

  let filter = 
  { 
    _id: req.params.id
  };
 
  const comment = await client.db(process.env.DB_NAME).collection('comments').findOne(filter);

  if(!comment) //TODO Check
  {
    return res.status(401).send({ error: 'You do not have permission to do this action.' });      
  }  
  next();
}
 
