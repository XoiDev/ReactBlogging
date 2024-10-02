
import { IconEyeClose } from 'components/icon';
import IconEyeOpen from 'components/icon/IconEyeOpen';
import React from 'react';
import { useController } from 'react-hook-form';
import styled from 'styled-components';


const InputStyled = styled.div`
    position: relative;
    width: 100%;
    input{
        width: 100%;
        padding: ${props => props.hasIcon ? "20px 60px 20px 20px" : "20px"};;
        background-color: ${props => props.theme.grayLight};
        border-radius: 8px;
        font-weight: 500;
        transition: all 0.2s linear;
        border: 1px solid transparent;
    }
    input:focus{
        background-color: white;
        border-color: ${props => props.theme.primary};;
    }
    input::-webkit-input-placeholder{
        color: #84878b;
    }
    input::-moz-input-placeholder{
        color: #84878b;
    }
    .input-icon{
        position: absolute;
        right: 20px;
        top: 33px;
        transform:  translateY(-50%);
        cursor: pointer;
    }
   
`
const Input = ({name , id, type="text", children, hasIcon = false, control, ...props}) => {
    const {field} = useController({
        control,
        name,
        defaultValue:"", 
    });
    return (
        <InputStyled hasIcon={children ? true : false}>
            <input id={id} type={type} {...field} {...props} />
            {children}
        </InputStyled>
    );
};

export default Input;