import styled from "styled-components";
import { Link } from "react-router";
import type { Post, PostContextType, UserContextTypes } from "../../../types";
import { useContext } from "react";
import UserContext from "../../../contexts/UsersContext";
import PostContext from "../../../contexts/PostsContext";
import { toast, ToastContainer } from "react-toastify";



type Props = {
  data: Post
}

const StyledCard = styled.div`
  position: relative; 
  background: #1a252f;
  padding: 15px;
  margin-top: 20px;
  border-radius: 8px;
  width: 350px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #53174f;
  color: #dcccfe;
  border: none;
  border-radius: 6px;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 12px;
  z-index: 1;

  &:hover {
    background-color: #6d2471;
  }
`;


const PostCard = ({ data }: Props) => {
const { loggedInUser } = useContext(UserContext) as UserContextTypes;
  const { deletepost } = useContext(PostContext) as PostContextType;

  const canDelete = loggedInUser?._id === data.user_id;

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault(); 
    if(!loggedInUser) 
    {
      toast.error("Your user data is loading, please try again later.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this post?")) {
     
      const Context_Response =   await deletepost(data._id, loggedInUser.email); 
        if ('error' in Context_Response) {
          toast.error(Context_Response.error);
        } else {
          toast.success(Context_Response.success || 'Post added successfully.');
        }
      }
  };

  return (
    <Link to={`details/${data._id}`}>
      <ToastContainer position="top-center" autoClose={1900} />
      <StyledCard>
        {canDelete && (
          <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
        )}
        <h3>{data.name}</h3>
        <p>{data.text}</p>
      </StyledCard>
    </Link>
  );
};

export default PostCard;