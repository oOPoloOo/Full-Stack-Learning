import styled from "styled-components";
import type { Comment, CommentContextType, UserContextTypes } from "../../../types";
import { useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import CommentContext from "../../../contexts/CommentsContet";
import UserContext from "../../../contexts/UsersContext";

type Props = {
  data: Comment
}

const StyledCard = styled.div`
  position: relative;
  background: #1a252f;
  padding: 15px;
  margin-top: 20px;
  border-radius: 8px;
  width: 60%;
  max-width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  align-self: flex-start;

  @media (max-width: 768px) {
    width: 100%;
    padding: 12px;
    font-size: 14px;
  }
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

const StyledText = styled.p`
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
`;

const CommentCard = ({ data }: Props) => {
  const { loggedInUser } = useContext(UserContext) as UserContextTypes;
  const { deletecomment } = useContext(CommentContext) as CommentContextType;

  const canDelete = loggedInUser?.email === data.email;

  const handleDelete = async () => {
    if (!loggedInUser) {
      toast.error("User data not available. Try again later.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        const Context_Response = await deletecomment(data._id);
        if ('error' in Context_Response) {
          toast.error(Context_Response.error);
        } else {
          toast.success(Context_Response.success || "Comment deleted successfully.");
        }
      } catch (error) {
        toast.error("Failed to delete comment.");
        console.error(error);
      }
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={1900} />
      <StyledCard>
        {canDelete && (
          <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
        )}
        <h3>{data.name}</h3>
        <StyledText>{data.text}</StyledText>
      </StyledCard>
    </>
  );
};


export default CommentCard;