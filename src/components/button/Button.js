import { LoadingSpinner } from 'components/loading';
import React, { Children } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { type } from '@testing-library/user-event/dist/type';
const ButtonStyles = styled.button`
    cursor: pointer;
    padding: 25px;
    line-height: 1;
    color: white;
    border-radius: 8px;
    font-weight: 600;
    font-size: 18px;
    width: 100%;
    height: ${props => props.height || "66px"};
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(to right bottom, ${props => props.theme.primary},
    ${props => props.theme.secondary});

    &:disabled{
        opacity: 0.5;
        pointer-events: none;
    }

`
const Button = ({type = 'button', onClick = ()=>{}, children , ...props}) => {
    const {isLoading} = props
    const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children
    return (
        <ButtonStyles type={type} onClick={onClick} {...props}>
            {child}
        </ButtonStyles>
    );
};

Button.propTypes = {
    type: PropTypes.oneOf(["button", "submit"]),
    isLoading: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node,
    kind: PropTypes.oneOf(["primary", "secondary", "ghost"]),
  };
export default Button;