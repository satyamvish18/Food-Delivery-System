import { Button, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { registerUser } from "../State/Auth/Action";
import { useDispatch } from "react-redux";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  role: "",
};

export const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    //console.log("Register form values: ", values);
    dispatch(registerUser({userData:values, navigate}))
  };
  return (
    <div className="">
      <Typography variant="h5" className="text-center">
        Create Account
      </Typography>

      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form>
          <Field
            as={TextField}
            name="fullName"
            label="Full Name"
            fullWidth
            variant="outlined"
            margin="normal"
          />

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

          <FormControl fullWidth margin="normal">
            <InputLabel id="role-simple-select-label">Role</InputLabel>
            <Field
              as={Select}
              labelId="role-simple-select-label"
              id="role-simple-select"
              name="role"
              label="Role"
              //onChange={handleChange}
            >
              <MenuItem value={"CUSTOMER"}>Customer</MenuItem>
              <MenuItem value={"RESTAURANT_OWNER"}>Restaurant Owner</MenuItem>
            </Field>
          </FormControl>

          <Button
            fullWidth
            variant="contained"
            type="submit"
            color="primary"
            sx={{ mt: 2, padding: "1rem" }}
          >
            Register
          </Button>
        </Form>
      </Formik>
      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Already have an account?
        <Button size="small" onClick={() => navigate("/account/login")}>
          Signin
        </Button>
      </Typography>
    </div>
  );
};

export default RegisterForm;
