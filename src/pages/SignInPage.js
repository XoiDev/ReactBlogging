import { useAuth } from 'contexts/auth-context';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthenticationPage from './AuthenticationPage';
import { useForm } from 'react-hook-form';
import { Field } from 'components/field';
import { Label } from 'components/label';
import { Input } from 'components/input';
import { Button } from 'components/button';
import { IconEyeOpen } from 'components/icon';
import IconEyeClose from 'components/icon/IconEyeClose';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'firebase-app/firebase-config';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";



const schema = yup.object({
    email: yup
      .string()
      .email("Please enter valid email address")
      .required("Please enter your email address"),
    password: yup
      .string()
      .min(6, "Your password must be at least 6 characters or greater")
      .required("Please enter your password"),
  });

const SignInPage = () => {
    const [togglePassword, setTogglePassword] = useState(false)
    const {userInfo ,setUserInfo} = useAuth()
    const navigate = useNavigate()
    
    const { control, handleSubmit,  formState:{isValid, isSubmitting, errors}  } = useForm( {
        mode: "onChange",
        resolver: yupResolver(schema)
    })
    useEffect(() => {
        const arrErroes = Object.values(errors);
        if (arrErroes.length > 0) {
          toast.error(arrErroes[0]?.message, {
            pauseOnHover: false,
            delay: 0,
          });
        }
      }, [errors]);
    useEffect(()=>{
        document.title = "Login Page" 
        if(userInfo?.email) navigate("/")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo])
    

    
    const handleSignIn = async (values)=>{
        if(!isValid) return;
        await signInWithEmailAndPassword(auth, values.email, values.password);
        // setUserInfo(test)
        navigate("/");
        // console.log(test);
        

        // const unsubscribe = onAuthStateChanged(auth, (user) => {
        //     if (user) {
        //       setUserInfo(user); 
        //     } else {
        //       setUserInfo(null); 
        //     }
        //   });
        // return () => unsubscribe();
    }
    return (
        <AuthenticationPage>
                <form onSubmit={handleSubmit(handleSignIn)} className='form'>
                    <Field>
                        <Label htmlFor='email'>Email address</Label>
                        <Input name="email" id="email" type='email' control={control} autoComplete="username"  placeholder="Please enter your email address"></Input>
                    </Field>
                    <Field>
                        <Label htmlFor='password'>Password</Label>
                        <Input autoComplete="current-password" name="password" control={control}  type={togglePassword ? "text" : "password"} placeholder="Please enter your password">
                        {!togglePassword ? <IconEyeClose onClick={() => { setTogglePassword(true) }} className='input-icon'></IconEyeClose> : <IconEyeOpen onClick={() => { setTogglePassword(false) }} className='input-icon'></IconEyeOpen>}</Input>
                    </Field>
                    <div className='have-account'>You have not had an account? <NavLink to={"/sign-up"}>Register an account</NavLink></div>
                    <Button type='submit' style={{
                    maxWidth: 300,
                    margin: "0 auto"
                }} disabled={isSubmitting} isLoading={isSubmitting}>Sign up</Button>
                </form>
        </AuthenticationPage>
    );
};

export default SignInPage;