import { connectDB } from "./helper.js";


  export const returnAllComments = async (req, res) => {
  const client = await connectDB();
  try 
  {    
    const data = await client.db(process.env.DB_NAME).collection('comments').find().toArray();
    res.send(data);
  } catch(err){
    res.status(500).send({ error: 'error accured while trying to connect to DB' });
  } finally {
    await client.close();
  }
}

export const returnCommentById = async (req, res) => {
  const client = await connectDB();
  try 
  {
    let filter = 
    {     
      _id: req.params.id
    };

    const data = await client.db(process.env.DB_NAME).collection('comments').findOne(filter);
  
    if(Object.is(data, null)){
      res.status(404).send({ error: `No comment was found using ID ${req.params.id}.` });
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

export const createNewComment = async (req, res) => {
  const client = await connectDB();
  try{
    const newComment = 
    {
      ...req.body     
    }
    const DB_Response = await client.db(process.env.DB_NAME).collection('comments').insertOne(newComment);
  
    if(DB_Response.acknowledged){
      res.status(201).send({
        ...newComment,
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

export const deleteCommentById = async (req, res) => {
  const client = await connectDB();
  try{    
    let filter = 
    { 
      _id: req.params.id
    };
    const DB_Response = await client.db(process.env.DB_NAME).collection('comments').deleteOne(filter);
    console.log(DB_Response);
    if(DB_Response.deletedCount){
      res.send({ success: `Comment with ID ${req.params.id} was deleted successfully.` });
    } else {
      res.status(404).send({ error: `Failed to delete. No comment with ID ${req.params.id}.` });
    }
  } catch(err) {
    console.log(err);
    res.status(500).send({ error: 'error accured while trying to connect to DB' });
  } finally {
    await client.close();
  }
}