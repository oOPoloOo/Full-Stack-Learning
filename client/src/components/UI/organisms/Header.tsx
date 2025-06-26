import styled from 'styled-components';
import { Link, useNavigate } from 'react-router';
import HeaderButton from '../molecules/HeaderButton';
import { useContext } from 'react';
import UserContext from '../../../contexts/UsersContext';
import type { UserContextTypes } from '../../../types';

const HeaderS = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 84px;
  background-color: #531750;

  > div {
    display: flex;
    justify-content: space-between;  
    align-items: center;
    width: 95%;
    height: 48px;

    .left {
      display: flex;
      align-items: center;
    }

    .right {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    a {
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
      text-decoration-color: var(--first-color);
    }
  }
`;

const Header = () => {
    const { loggedInUser, logout } = useContext(UserContext) as UserContextTypes;
    const navigate = useNavigate();
    
    return (        
        <HeaderS>
            <div>
               
                <div className="left">              
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <img
                        src="https://pngimg.com/d/gamepad_PNG60.png"
                        alt="Home"
                        style={{ width: '85px', height: 'auto' }}
                        />
                        <span
                        style={{
                            color: 'white',
                            fontSize: '22px',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                        }}
                        >
                        Game Forum
                        </span>
                    </Link>
                </div>

                <div className="right">
                {loggedInUser ? (
                    <HeaderButton
                    label="Logout"
                    onClick={() => {
                        logout();
                        navigate('/');
                    }}
                    />
                ) : (
                    <>
                    <Link to={`/login`}>
                        <HeaderButton label="Login" />
                    </Link>
                    <Link to={`/register`}>
                        <HeaderButton label="Register" />
                    </Link>
                    </>
                )}
                </div>
            </div>
        </HeaderS>
    );
};
 
export default Header;