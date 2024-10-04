
import React, { Fragment, useState } from "react";
import Input from "./Input";
import IconEyeClose from "components/icon/IconEyeClose";
import IconEyeOpen from "components/icon/IconEyeOpen";


const InputPasswordToggle = ({ control }) => {
  const [togglePassword, setTogglePassword] = useState(false);
  if (!control) return null;
  return (
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
  );
};

export default InputPasswordToggle;