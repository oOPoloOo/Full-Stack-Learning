import { connectDB } from "./helper.js";


  export const returnAllUsers = async (req, res) => {
  const client = await connectDB();
  try 
  {    
    const data = await client.db(process.env.DB_NAME).collection('users').find().toArray();
    res.send(data);
  } catch(err){
    res.status(500).send({ error: 'error accured while trying to connect to DB' });
  } finally {
    await client.close();
  }
}

export const returnUserById = async (req, res) => {
  const client = await connectDB();
  try 
  {
    let filter = 
    {     
      _id: req.params.id
    };

    const data = await client.db(process.env.DB_NAME).collection('users').findOne(filter);
  
    if(Object.is(data, null)){
      res.status(404).send({ error: `No user was found using ID ${req.params.id}.` });
      return;
    }
    res.send(data);
    
  } catch(err){
    console.log(err);
    res.status(500).send({ error: 'error accured while trying to connect to DB' });
  } finally {
    await client.close();
  }
}

export const createNewUser = async (req, res) => {
  const client = await MongoClient.connect(DB_CONNECTION_STRING);
  try{
    const newUser = 
    {
      ...req.body,
      password: bcrypt.hashSync(req.body.passwordText, 10)
    }
    const DB_Response = await client.db(process.env.DB_NAME).collection('users').insertOne(newUser);
  
    if(DB_Response.acknowledged){
      res.status(201).send({
        ...newUser,
        _id: DB_Response.insertedId
      });
    } else {
      res.status(500).send({ error: 'error accured while trying to connect to DB' });
    }
  } catch(err) {
    console.log(err);
    res.status(500).send({ error: 'error accured while trying to connect to DB' });
  } finally {
    await client.close();
  }
}

export const deleteUserById = async (req, res) => {
  const client = await MongoClient.connect(DB_CONNECTION_STRING);
  try{    
    let filter = 
    { 
      _id: req.params.id
    };
    const DB_Response = await client.db(process.env.DB_NAME).collection('users').deleteOne(filter);
    console.log(DB_Response);
    if(DB_Response.deletedCount){
      res.send({ success: `User with ID ${req.params.id} was deleted successfully.` });
    } else {
      res.status(404).send({ error: `Failed to delete. No user with ID ${req.params.id}.` });
    }
  } catch(err) {
    console.log(err);
    res.status(500).send({ error: 'error accured while trying to connect to DB' });
  } finally {
    await client.close();
  }
}