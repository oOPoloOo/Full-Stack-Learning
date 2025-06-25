import styled from 'styled-components';
// import NavLogo from '../atoms/NavLogo';
// import SearchButton from '../atoms/SearchButton';
import { Link, useNavigate } from 'react-router';
import HeaderButton from '../molecules/HeaderButton';
import { useContext } from 'react';
import UserContext from '../../../contexts/UsersContext';
import type { UserContextTypes } from '../../../types';
// import UsersContext from '../../../contexts/UsersContext';
// import { UsersContextTypes } from '../../../types';

const HeaderS = styled.header`
   
    display: flex;
    justify-content: center;
    align-items: center; 
   
    margin: 0;
    padding: 0;
    height: 84px;
    /* width: auto; */
    min-width: 240px;
    background-color: #531750;
   
   
     
    > div 
    {   
        display: flex;
        justify-content: space-between;
        height: 48px;
        width: 95%;


       
        > a 
        {
            text-decoration: none;
        }

        > a:hover
        {
            text-decoration: underline;
            text-decoration-color: var(--first-color);      
        }

        > div.hidden 
        {
            display: none;
        
        }

        > div.flex 
        {
            display: flex;
            align-items: center;
            gap: 15px;              
        }
    }
`;

const Header = () => {
    const { loggedInUser, logout } = useContext(UserContext) as UserContextTypes;
    const navigate = useNavigate();
    
    return (
        <HeaderS>
        <div>
            <Link to={`/`}>
            <p>To Home Page</p>
            </Link>

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
        </HeaderS>
    );
};
 
export default Header;