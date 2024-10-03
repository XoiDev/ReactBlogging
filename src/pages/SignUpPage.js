import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Label } from '../components/label';
import { Input } from '../components/input';

import { useForm } from 'react-hook-form';
import IconEyeClose from 'components/icon/IconEyeClose';
import { Field } from 'components/field';
import { IconEyeOpen } from 'components/icon';
import { Button } from 'components/button';
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { object } from 'prop-types';
import { toast } from 'react-toastify';
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth"
import { auth, db } from 'firebase-app/firebase-config';
import { NavLink, useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import AuthenticationPage from './AuthenticationPage';

const SignUpPageStyle = styled.div`
    min-height: 100vh;
    padding: 40px;
`;


const schema = yup.object({
    fullname: yup.string().required("please enter your fullname"),
    email: yup.string().email("please enter valid email").required("please enter your email"),
    password: yup.string().min(8, "Your password must be at least 8 characters or greater").required("please enter your fullname")
})

const SignUpPage = () => {
    const navigate = useNavigate()
    const {
        control,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
        watch,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema)
    })
    const handleSignUp = async (values) => {
        if(!isValid) return;
        const user = await createUserWithEmailAndPassword(auth , values.email, values.password)
        await updateProfile(auth.currentUser, {
            displayName: values.fullname
        })

        const useRef = collection(db , "users")
        addDoc(useRef, {
            fullname: values.fullname,
            email: values.email,
            password: values.password
        })
        toast.success("Register Succesfully!!!")
        navigate("/")
    }
    const [togglePassword, setTogglePassword] = useState(false)
    useEffect(()=>{
        const arrError = Object.values(errors)
        if(arrError.length > 0){
            toast.error(arrError[0]?.message, {
                delay: 0,
                pauseOnHover: true
            })
        }
    },[errors])
    return (
        <AuthenticationPage>
            <form onSubmit={handleSubmit(handleSignUp)} className='form'>
                <Field className='field'>
                    <Label htmlFor="fullname">
                        Fullname
                    </Label>
                    <Input
                        type="text"
                        name="fullname"
                        placeholder="Enter your fullname"
                        control={control}
                        id="fullname"
                        autoComplete="off"
                    >
                    </Input>
                </Field>
                <Field className='field'>
                    <Label htmlFor="email">
                        Email address
                    </Label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        control={control}
                        id="email"
                        autoComplete="username"
                    >
                    </Input>
                </Field>
                <Field className='field'>
                    <Label htmlFor="password">
                        Password
                    </Label>
                    <Input
                        type={togglePassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        control={control}
                        id="password"
                        
                        autoComplete="current-password"
                    >
                        {!togglePassword ? <IconEyeClose onClick={() => { setTogglePassword(true) }} className='input-icon'></IconEyeClose> : <IconEyeOpen onClick={() => { setTogglePassword(false) }} className='input-icon'></IconEyeOpen>}
                    </Input>
                </Field>
                <div className='have-account'>You already have an account? <NavLink to={"/sign-in"}>Login</NavLink>{" "}</div>
                <Button type='submit' style={{
                    maxWidth: 300,
                    margin: "0 auto"
                }} disabled={isSubmitting} isLoading={isSubmitting}>Sign up</Button>

            </form>
        </AuthenticationPage>
    );
};

export default SignUpPage;