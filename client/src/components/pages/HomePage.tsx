import { useContext, useState } from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import Card from "../UI/molecules/Card";
import PostContext from "../../contexts/PostsContext";
import type { PostContextType } from "../../types";

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

const StyledPostsContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { posts } = useContext(PostContext) as PostContextType;

  return (
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

      <h1>Everything about Games and more!</h1>

     <StyledPostsContainer>
        {
          posts.length ? 
          posts.map(item => 
            <Card
              key={item._id}
              data={item}
            />
          ) :
          <p>Loading...</p>
        }
        
      </StyledPostsContainer>

      </Content>
    </Container>
  );
};

export default HomePage;