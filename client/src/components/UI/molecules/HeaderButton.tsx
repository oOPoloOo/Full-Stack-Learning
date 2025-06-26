
import styled from "styled-components";

const StyledHeaderButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  padding: 6px 20px;
  font-size: 14px;
  font-weight: 500;

  background-color: #d8c9ff;
  color: #4b0082; 

  border: none;
  border-radius: 9999px;
  cursor: pointer;

  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  transition: background-color 0.2s;

  &:hover {
    background-color: #cbb7f9;
  }
`;

type Props = 
{
    label?: string;
    onClick?: () => void;
};



const HeaderButton: React.FC<Props>  = ({ label = "Login" ,onClick}) => {

    return ( 
      <StyledHeaderButton onClick={onClick} >
        <div className="rounded">
          {label}
        </div>
      </StyledHeaderButton>
    );
}
 
export default HeaderButton;