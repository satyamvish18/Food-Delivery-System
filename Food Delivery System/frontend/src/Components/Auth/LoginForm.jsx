import { Button, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../State/Auth/Action";

const initialValues = {
  email: "",
  password: "",
};
export const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

  const handleSubmit = (values) => {
    //console.log("Login form values: ", values);
    dispatch(login({userData:values, navigate}))
  };
  return (
    <div className="">
      <Typography variant="h5" className="text-center">
        Sign in
      </Typography>

      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form>
          <Field
            as={TextField}
            name="email"
            label="Email"
            fullWidth
            variant="outlined"
            margin="normal"
          />

          <Field
            as={TextField}
            name="password"
            label="Password"
            fullWidth
            variant="outlined"
            margin="normal"
            type="password"
          />

          <Button fullWidth variant="contained" type="submit" color="primary" sx={{mt:2, padding:"1rem"}}>
            Sign in
          </Button>
        </Form>
      </Formik>
      <Typography variant="body2" align="center" sx={{mt:3}}>
        Create your account
        <Button size="small" onClick={()=> navigate("/account/register")}>
            Signup
        </Button>
      </Typography>
    </div>
  );
};

export default LoginForm;
