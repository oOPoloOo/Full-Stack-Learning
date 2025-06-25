import React, { useState } from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";

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
  cursor: pointer;
  color: white;
  z-index: 10;
  &:hover {
    background: #2a3b4d;
  }
`;

const Card = styled.div`
  background: #1a252f;
  padding: 15px;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
`;

const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);

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

        <h1>Home Page</h1>

        <Card>
          <h3>r/Backend</h3>
          <p>Does backend involve more programming languages than frontend?</p>
        </Card>

        <Card>
          <h3>r/EDM</h3>
          <p>I found this on Instagram and snapped all the different genres...</p>
        </Card>
      </Content>
    </Container>
  );
};

export default HomePage;