import styled from "styled-components";
import type { Comment } from "../../../types";

type Props = {
  data: Comment
}

const StyledCard = styled.div`
  background: #1a252f;
  padding: 15px;
  margin-top: 20px;
  border-radius: 8px;
  /* TODO: Fix cards layout */
  width: 350px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
`;

const CommentCard = ({ data }: Props) => {
  return (
    <StyledCard>
    <h3>{data.name}</h3>
    <p>${data.text}</p>   
    </StyledCard>
  );
}
 
export default CommentCard;