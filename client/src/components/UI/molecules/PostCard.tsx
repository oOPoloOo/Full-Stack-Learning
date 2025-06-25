import styled from "styled-components";
import { Link } from "react-router";
import type { Post } from "../../../types";

type Props = {
  data: Post
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

const PostCard = ({ data }: Props) => {
  return (
    <Link to={`details/${data._id}`}>
      <StyledCard>
        <h3>{data.name}</h3>
        <p>{data.text}</p>   
      </StyledCard>
    </Link>
  );
}
 
export default PostCard;