
import styled from "styled-components";


// const LoginBtn = styled.div`    
//   > div.rounded {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     overflow: hidden;

//     height: 36px;
//     width: 36px;

//     background-color: #004347;
//     border: 3px solid #0073f4;    
//     border-radius: 50%;

//     font-size: 12px;
//     color: white;
//     text-transform: uppercase;
//     cursor: pointer;
//   }
// `;

const StyledHeaderButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  padding: 6px 20px;
  font-size: 14px;
  font-weight: 500;

  background-color: #d8c9ff; /* soft purple, can be adjusted */
  color: #4b0082; /* deep purple text */

  border: none;
  border-radius: 9999px; /* pill shape */
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