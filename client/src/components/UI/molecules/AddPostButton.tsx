// import styled from "styled-components";

// const StyledAddPostButton = styled.button`
//   display: inline-flex;
//   justify-content: center;
//   align-items: center;

//   padding: 8px 24px;
//   font-size: 14px;
//   font-weight: 500;

//   background-color: #d8c9ff; /* soft purple */
//   color: #4b0082; /* deep purple */

//   border: none;
//   border-radius: 9999px; /* pill shape */
//   cursor: pointer;

//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

//   transition: background-color 0.2s, transform 0.1s;

//   &:hover {
//     background-color: #cbb7f9;
//   }

//   &:active {
//     transform: scale(0.98);
//   }
// `;

// type Props = {
//   label?: string;
//   onClick?: () => void;
// };

// const AddPostButton: React.FC<Props> = ({ label = "Add Post", onClick }) => {
//   return <StyledAddPostButton onClick={onClick}>{label}</StyledAddPostButton>;
// };

// export default AddPostButton;


import styled from "styled-components";

const StyledAddPostButton = styled.button`
  display: flex;
  justify-content: flex-start; /* align text to the left */
  align-items: center;

  width: 100%; /* stretch to full width */
  /* max-width: 300px; optional: limit max size if needed */
  padding-left: 24px; /* same left padding as before */
  padding-right: 24px;
  height: 40px;

  font-size: 14px;
  font-weight: 500;

  background-color: #d8c9ff;
  color: #4b0082;

  border: none;
  border-radius: 9999px;
  cursor: pointer;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  transition: background-color 0.2s, transform 0.1s;

  &:hover {
    background-color: #cbb7f9;
  }

  &:active {
    transform: scale(0.98);
  }
`;

type Props = {
  label?: string;
  onClick?: () => void;
};

const AddPostButton: React.FC<Props> = ({ label = "Login", onClick }) => {
  return <StyledAddPostButton onClick={onClick}>{label}</StyledAddPostButton>;
};

export default AddPostButton;