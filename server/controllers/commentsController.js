import { connectDB } from "./dbController.js";
import { v4 as generateID } from 'uuid';


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

// export const returnCommentById = async (req, res) => {
//   const client = await connectDB();
//   try 
//   {
//     let filter = 
//     {     
//       _id: req.params.id
//     };

//     const data = await client.db(process.env.DB_NAME).collection('comments').findOne(filter);
  
//     if(Object.is(data, null)){
//       res.status(404).send({ error: `No comment was found using ID ${req.params.id}.` });
//       return;
//     }
//     res.send(data);
    
//   } catch(err){
//     console.log(err);
//     res.status(500).send({ error: 'error accured while trying to connect to DB' });
//   } finally {
//     await client.close();
//   }
// }

export const returnCommentByPostId = async (req, res) => {
  const client = await connectDB();
  try 
  {
    let filter = 
    {       
      post_id: req.params.id
    };
    const data = await client.db(process.env.DB_NAME).collection('comments').find(filter).toArray();
    
    if(Object.is(data, null)){
      res.status(404).send({ error: `No comment was found using ID ${req.params.id}.` });
      return;
    }
    res.send({     
      acknowledged: true,
      comments: data
    });
    
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
   
    const newComment = {
      _id: generateID(),
      post_id: req.body.post_id,
      name: req.body.name,
      text: req.body.text,
      email: req.body.email,
      date: req.body.email
    };
    const DB_Response = await client.db(process.env.DB_NAME).collection('comments').insertOne(newComment);
  
    if(DB_Response.acknowledged){
      res.status(201).send({
          success: "Your comment was created",    
          commentData: newComment       
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