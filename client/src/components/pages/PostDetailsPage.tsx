import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import Card from "../UI/molecules/PostCard";
import type { CommentContextType, PostContextType, UserContextTypes } from "../../types";
import CommentContext from "../../contexts/CommentsContet";
import UserContext from "../../contexts/UsersContext";
import { useParams } from "react-router";
import PostContext from "../../contexts/PostsContext";

const SIDEBAR_WIDTH = 240;
const SIDEBAR_COLLAPSED_WIDTH = 48;
interface CollapsibleProps {
  collapsed: boolean;
}

const Container = styled.div`
  display: flex;
  
  overflow: hidden;
`;

const Sidebar = styled.div<CollapsibleProps>`
  width: ${({ collapsed }) => (collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH)}px;
  background: #151c22;
  color: white;
  padding: 20px 10px;
  box-sizing: border-box;
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: ${({ collapsed }) => (collapsed ? "center" : "flex-start")};
`;

const Content = styled.div<CollapsibleProps>`
  flex-grow: 1;
  background: linear-gradient(180deg, #0f2027, #203a43, #2c5364);
  color: white;
  padding: 20px;
  transition: margin-left 0.3s ease;
  position: relative;
`;

const HamburgerButton = styled.button`
  position: absolute;
  top: 45px;
  left: -25px;
  transform: translateX(-50%);
  background: #1f2d3a;
  border: none;
  border-radius: 50%;
  padding: 10px;
  margin-left: 25px;
  cursor: pointer;
  color: white;
  z-index: 10;
  &:hover {
    background: #2a3b4d;
  }
`;

const StyledCommentsContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const StyledPostCard = styled.div`
  background: #1a252f;
  padding: 15px;
  margin-top: 20px;
  border-radius: 8px;
  /* TODO: Fix  post layout */
  width: 100%;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
`;
const PostDetailsPage =  () => {
  const [collapsed, setCollapsed] = useState(false);
  const { comments , fetchPostComments } = useContext(CommentContext) as CommentContextType;
  const { posts } = useContext(PostContext) as PostContextType;
  const { id } = useParams();
  
//   TODO: for checking if admin or creator
//   const {loggedInUser } = useContext(UserContext) as UserContextTypes;


  useEffect(() => {
    if (id) {
      fetchPostComments(id);
    }
  }, [id]);
  const post = posts.find(post => post._id === id);


return (
    console.log('PostDetailsPage: return '),
    <Container>
        <Sidebar collapsed={collapsed}>
            {!collapsed && (
            <>
                <h2>Left Menu</h2>
                <p>Popular</p>
                <p>Answers</p>
                <p>Explore</p>
                <p>Communities</p>
            </>
            )}
        </Sidebar>

        <Content collapsed={collapsed}>
        <HamburgerButton onClick={() => setCollapsed(!collapsed)}>
            <FaBars />
        </HamburgerButton>
        
        <StyledPostCard>
            {post ? (
                <>
                    <h1>{post.name}</h1>
                    <p>{post.text}</p>
                </>
            ) : (
                <p>Loading post...</p>
            )}
        </StyledPostCard>

        <StyledCommentsContainer>          
            {
                comments.length ? 
                comments.map(item => 
                    <Card
                    key={item._id}
                    data={item}
                    />
                ) :
                <p>Loading...</p>
            }
            
        </StyledCommentsContainer>

      </Content>
    </Container>
  );
};

export default PostDetailsPage;