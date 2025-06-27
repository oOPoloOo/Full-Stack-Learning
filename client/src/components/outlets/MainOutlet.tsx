import styled from "styled-components";
import Footer from "../UI/organisms/Footer";
import Header from "../UI/organisms/Header";
import { Outlet } from "react-router";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const MainOutlet = () => {
  return (
    <PageWrapper>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </PageWrapper>
  );
};
 
export default MainOutlet;