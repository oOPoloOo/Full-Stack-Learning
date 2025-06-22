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
