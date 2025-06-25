import { connectDB } from "./dbController.js";
import { v4 as generateID } from 'uuid';

  export const returnAllPosts = async (req, res) => {
  const client = await connectDB();
  try 
  {    
    const data = await client.db(process.env.DB_NAME).collection('posts').find().toArray();
    res.send(data);
  } catch(err){
    res.status(500).send({ error: 'error accured while trying to connect to DB' });
  } finally {
    await client.close();
  }
}

export const returnPostById = async (req, res) => {
  const client = await connectDB();
  try 
  {
    let filter = 
    {     
      _id: req.params.id
    };

    const data = await client.db(process.env.DB_NAME).collection('posts').findOne(filter);
  
    if(Object.is(data, null)){
      res.status(404).send({ error: `No post was found using ID ${req.params.id}.` });
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

export const createNewPost = async (req, res) => {

 const client = await connectDB();
  try{
    const newPost = {
      _id: generateID(),           
      ...req.body
    };
    const DB_Response = await client.db(process.env.DB_NAME).collection('posts').insertOne(newPost);
  
    if(DB_Response.acknowledged){
      res.status(201).send({
        ...newPost        
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

export const deletePostById = async (req, res) => {
   
  const client = await connectDB();
  try{    
    let filterPost = 
    { 
      _id: req.params.id
    };
     let filterComments = 
    {       
      post_id: req.params.id
    };

    const DB_Response_post = await client.db(process.env.DB_NAME).collection('posts').deleteOne(filterPost);

    console.log("DB_Response_post",DB_Response_post);
    if(DB_Response_post.deletedCount){
      const comments = await client.db(process.env.DB_NAME).collection('comments').find(filterComments).toArray();
      if(comments.length === 0) {
        res.send({ success: `Post with ID ${req.params.id} was deleted successfully.` });        
      }
      else
      {
        const DB_Response_comments = await client.db(process.env.DB_NAME).collection('comments').delete(filterComments);
          console.log("DB_Response_comments",DB_Response_post);

        if(DB_Response_comments.deletedCount)
        {
          res.send({ success: `Post and comments with ID ${req.params.id} was deleted successfully.` });
        }
        else
        {
          res.status(404).send({ error: `Failed to delete post comments. No post with ID ${req.params.id}.` });
        }
      }

    } else {
      res.status(404).send({ error: `Failed to delete post. No post with ID ${req.params.id}.` });
    }
  } catch(err) {
    console.log(err);
    res.status(500).send({ error: 'error accured while trying to connect to DB' });
  } finally {
    await client.close();
  }
}