import styled from "styled-components";
import {  IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
// import FooterContext from "../../../contexts/FoooterContext";
// import { useContext } from "react";

const FooterS = styled.footer`
   > div.block {
        display: block;
   }
   > div.hidden {
        display: none;
   }
`;

const FooterContainer = styled.footer`
  background-color: #181818;
  padding: 40px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%; 
`;

const FooterSection = styled.div`
  flex: 1;
  margin: 0 16px;
  text-align: center;

  h2 {
    margin: 0;
  }
`;

const FooterLink = styled.p`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const FooterText = styled.p`
  margin: 4px 0;
`;

const IconWrapper = styled(IconButton)`
  color: white;
  &:hover {
    color: #007bff;
  }
`;

const Footer = () => {
    // const { showFooter } = useContext(FooterContext);

    return (
        <FooterS>
            {/* <div className={`${showFooter ? 'block': 'hidden'}`}> */}
            <div>
            <FooterContainer>
                <FooterContent>
                    <FooterSection>
                    <FooterLink>About</FooterLink>
                    <FooterLink>Terms of use</FooterLink>
                    <FooterLink>Privacy policy</FooterLink>
                    <FooterLink>Cookie policy</FooterLink>
                    </FooterSection>

                    <FooterSection>
                    <FooterText>© 2025 MyGameList.club</FooterText>
                    <FooterText>All rights reserved</FooterText>
                    <FooterText>Founded and inspired by Pietr Slabak</FooterText>
                    <FooterText>Designed by Dende</FooterText>
                    <FooterText>Developed by Polo &lt;exterminator666&gt;</FooterText>
                    </FooterSection>

                    <FooterSection>
                    <h2>GAME AWAY!</h2>
                    <FooterText>
                        You can share your thoughts with us and make our project better.
                    </FooterText>
                    <FooterText>contact@mygamelist.club</FooterText>
                      <div>
                        <IconWrapper>
                        <Facebook />
                        </IconWrapper>
                        <IconWrapper>
                        <Twitter />
                        </IconWrapper>
                        <IconWrapper>
                        <Instagram />
                        </IconWrapper>
                        <IconWrapper>
                        <LinkedIn />
                        </IconWrapper>
                      </div>
                    </FooterSection>
                </FooterContent>
                </FooterContainer>
            </div>
        </FooterS>       
    );
}
 
export default Footer;


