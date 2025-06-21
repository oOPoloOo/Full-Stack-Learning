import { connectDB } from "./dbController.js";


  export const returnAllSessions = async (req, res) => {
  const client = await connectDB();
  try 
  {    
    const data = await client.db(process.env.DB_NAME).collection('sessions').find().toArray();
    res.send(data);
  } catch(err){
    res.status(500).send({ error: 'error accured while trying to connect to DB' });
  } finally {
    await client.close();
  }
}

export const returnSessionById = async (req, res) => {
  const client = await connectDB();
  try 
  {
    let filter = 
    {     
      _id: req.params.id
    };

    const data = await client.db(process.env.DB_NAME).collection('sessions').findOne(filter);
  
    if(Object.is(data, null)){
      res.status(404).send({ error: `No session was found using ID ${req.params.id}.` });
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

export const createNewSession = async (req, res) => {
  const client = await connectDB();
  try{
    const newSession = 
    {
      ...req.body     
    }
    const DB_Response = await client.db(process.env.DB_NAME).collection('sessions').insertOne(newSession);
  
    if(DB_Response.acknowledged){
      res.status(201).send({
        ...newSession,
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

export const deleteSessionById = async (req, res) => {
  const client = await connectDB();
  try{    
    let filter = 
    { 
      _id: req.params.id
    };
    const DB_Response = await client.db(process.env.DB_NAME).collection('sessions').deleteOne(filter);
    console.log(DB_Response);
    if(DB_Response.deletedCount){
      res.send({ success: `Session with ID ${req.params.id} was deleted successfully.` });
    } else {
      res.status(404).send({ error: `Failed to delete. No session with ID ${req.params.id}.` });
    }
  } catch(err) {
    console.log(err);
    res.status(500).send({ error: 'error accured while trying to connect to DB' });
  } finally {
    await client.close();
  }
}