import React from 'react';
import styled from 'styled-components';
const AuthenStyled = styled.div`
    .logo{
        margin: 0 auto 20px;
        font-size: 18px;
        width: 180px;
        height: 200px;
    }
    .heading{
        text-align: center;
        color: ${props => props.theme.primary};
        font-size: 40px;
        font-weight: bold;
        margin-bottom: 60px;
    }
    .field{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        row-gap: 20px;
    }
    
    .form{
        max-width: 500px;
        margin: 0 auto;
    }
    .have-account{
        margin-bottom: 20px;
        a {
            color: ${props => props.theme.primary};
        }
    }
`
const AuthenticationPage = ({children}) => {
    return (
        <AuthenStyled className='container'>
                <img src="logo.png" alt="monkey-blogging" className='logo' />
                <h1 className='heading'>Monkey Blogging</h1>
                {children}
        </AuthenStyled>
    );
};

export default AuthenticationPage;