// import React, { useEffect, useState } from 'react';
// import { Label } from '../components/label';
// import { Input } from '../components/input';
// import { useForm } from 'react-hook-form';
// import IconEyeClose from 'components/icon/IconEyeClose';
// import { Field } from 'components/field';
// import { IconEyeOpen } from 'components/icon';
// import { Button } from 'components/button';
// import * as yup from "yup"
// import { yupResolver } from "@hookform/resolvers/yup"
// import { toast } from 'react-toastify';
// import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth"
// import { auth, db } from 'firebase-app/firebase-config';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
// import AuthenticationPage from './AuthenticationPage';
// import InputPasswordToggle from 'components/input/InputPasswordToggle';
// import slugify from 'slugify';




// const schema = yup.object({
//     fullname: yup.string().required("please enter your fullname"),
//     email: yup.string().email("please enter valid email").required("please enter your email"),
//     password: yup.string().min(6, "Your password must be at least 6 characters or greater").required("please enter your fullname")
// })

// const SignUpPage = () => {
//     const navigate = useNavigate()
//     const {
//         control,
//         handleSubmit,
//         formState: { errors, isValid, isSubmitting },
//         watch,
//     } = useForm({
//         mode: "onChange",
//         resolver: yupResolver(schema)
//     })
//     const handleSignUp = async (values) => {
//         if(!isValid) return;
//         const user = await createUserWithEmailAndPassword(auth , values.email, values.password)
//         await updateProfile(auth.currentUser, {
//             displayName: values.fullname
//         })
//         const colRef = collection(db , "users")
//         await setDoc(doc(db , 'users', auth.currentUser.uid),{
//             fullname: values.fullname,
//             email: values.email,
//             password: values.password,
//             username: slugify(values.fullname , {lower : true})
//         })
//         // await addDoc(colRef, {
//         //     fullname: values.fullname,
//         //     email: values.email,
//         //     password: values.password
//         // })
//         toast.success("Register Succesfully!!!")
//         navigate("/")
//     }
//     const [togglePassword, setTogglePassword] = useState(false)
//     useEffect(()=>{
//         document.title = "Register Page"
//         const arrError = Object.values(errors)
//         if(arrError.length > 0){
//             toast.error(arrError[0]?.message, {
//                 delay: 0,
//                 pauseOnHover: true
//             })
//         }
//     },[errors])
//     return (
//         <AuthenticationPage>
//             <form onSubmit={handleSubmit(handleSignUp)} className='form'>
//                 <Field className='field'>
//                     <Label htmlFor="fullname">
//                         Fullname
//                     </Label>
//                     <Input
//                         type="text"
//                         name="fullname"
//                         placeholder="Enter your fullname"
//                         control={control}
//                         id="fullname"
//                         autoComplete="off"
//                     >
//                     </Input>
//                 </Field>
//                 <Field className='field'>
//                     <Label htmlFor="email">
//                         Email address
//                     </Label>
//                     <Input
//                         type="email"
//                         name="email"
//                         placeholder="Enter your email"
//                         control={control}
//                         id="email"
//                         autoComplete="username"
//                     >
//                     </Input>
//                 </Field>
//                 <Field className='field'>
//                     <Label htmlFor="password">
//                         Password
//                     </Label>
//                     <InputPasswordToggle control={control}></InputPasswordToggle>
//                 </Field>
//                 <div className='have-account'>You already have an account? <NavLink to={"/sign-in"}>Login</NavLink>{" "}</div>
//                 <Button type='submit' style={{
//                     maxWidth: 300,
//                     margin: "0 auto"
//                 }} disabled={isSubmitting} isLoading={isSubmitting}>Sign up</Button>

//             </form>
//         </AuthenticationPage>
//     );
// };

// export default SignUpPage;


import slugify from "slugify";
import React, { useEffect } from "react";
import InputPasswordToggle from "components/input/InputPasswordToggle";
import AuthenticationPage from "./AuthenticationPage";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { Label } from "components/label";
import { Input } from "components/input";
import { Field } from "components/field";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Button } from "components/button";
import { auth, db } from "firebase-app/firebase-config";

const schema = yup.object({
  fullname: yup.string().required("Please enter your fullname"),
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleSignUp = async (values) => {
    if (!isValid) return;
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
    });

    await setDoc(doc(db, "users", auth.currentUser.uid), {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      username: slugify(values.fullname, { lower: true }),
    });

    toast.success("Register successfully!!!");
    navigate("/");
  };
  useEffect(() => {
    const arrErroes = Object.values(errors);
    if (arrErroes.length > 0) {
      toast.error(arrErroes[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  useEffect(() => {
    document.title = "Register Page";
  }, []);
  return (
    <AuthenticationPage>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignUp)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="fullname">Fullname</Label>
          <Input
            type="text"
            name="fullname"
            placeholder="Enter your fullname"
            control={control}
          />
        </Field>
        <Field>
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            control={control}
          />
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <div className="have-account">
          You already have an account? <NavLink to={"/sign-in"}>Login</NavLink>{" "}
        </div>
        <Button
          type="submit"
          className="w-full max-w-[300px] mx-auto"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Sign Up
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignUpPage;