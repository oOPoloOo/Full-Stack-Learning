import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import type { PostContextType, UserContextTypes } from '../../types';
import UserContext from '../../contexts/UsersContext';
import PostContext from '../../contexts/PostsContext';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const Container = styled.div`
  max-width: 700px;
  margin: 40px auto;
  padding: 32px;
  background: #151B21; 
  border-radius: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  color: #DCCCFE;
`;

const Title = styled.h2`
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 600;
  color: #DCCCFE;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding-left: 16px;
  padding-right: 8px;
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 6px;
`;

const Input = styled.input`
  background-color: #172D35; 
  color: #DCCCFE;
  border: 1px solid #53174F; 
  padding: 10px 14px;
  font-size: 14px;
  border-radius: 10px;

  &:focus {
    outline: none;
    border-color: #DCCCFE;
  }
`;

const Textarea = styled.textarea`
  background-color: #172D35;
  color: #DCCCFE;
  border: 1px solid #53174F;
  padding: 10px 14px;
  font-size: 14px;
  border-radius: 10px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #DCCCFE;
  }
`;

const Button = styled.button`
  margin-top: 32px;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 500;
  color: #DCCCFE;
  background-color: #53174F;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #6d2471;
  }

  &:disabled {
    background-color: #333;
    cursor: not-allowed;
  }
`;


const AddNewPost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { loggedInUser } = useContext(UserContext) as UserContextTypes;
  const { addpost } = useContext(PostContext) as PostContextType;
  const navigate = useNavigate();

  const isValid = title.trim().length > 0 && description.trim().length >= 20;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid || !loggedInUser?._id) {
      toast.error("Please fill all fields correctly.");
      return;
    }

    const postData = {
      user_id: loggedInUser._id,
      name: title,
      text: description,
      email: loggedInUser.email ?? '',
      date: new Date().toISOString(),
    };

    setTitle('');
    setDescription('');

    const Context_Response = await addpost(postData);
    if ('error' in Context_Response) {
      toast.error(Context_Response.error);
    } else {
      toast.success(Context_Response.success || 'Post added successfully.');
      setTimeout(() => navigate('/'), 2000);
    }
  };

  return (
    <Container>
      <Title>Add New Post</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write at least 20 characters"
          />
        </FormGroup>

        <Button type="submit" disabled={!isValid}>
          Submit Post
        </Button>
      </form>
     
      <ToastContainer position="top-center" autoClose={1900} />
    </Container>
  );
};


export default AddNewPost;
