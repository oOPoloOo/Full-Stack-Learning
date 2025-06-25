import React, { useState } from 'react';
import styled from 'styled-components';

const CheckboxWrapper = styled.div`
  /* display: flex;
  align-items: center;
  gap: 10px; */

    display: flex;
    align-items: center;
    font-size: 12px;
    margin-top: 16px;
`;

const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
  width: 20px;
  height: 20px;
  margin-right: 6px;
  accent-color: #4caf50; /* modern browsers support this */
  cursor: pointer;
`;


type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
 
  return (
    <CheckboxWrapper>
        <StyledCheckbox 
            checked={checked} 
             onChange={e => onChange(e.target.checked)}
        />
    </CheckboxWrapper>
  );
};

export default Checkbox;