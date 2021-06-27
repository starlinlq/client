import * as Yup from "yup";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Segment, Header, Button } from "semantic-ui-react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Login } from "../../app/interfaces";
import { useStore } from "../../app/stores/stores";
import { history } from "../../";

function RegisterForm() {
  let login: Login = { email: "", password: "" };
  const { user } = useStore();

  const validationSchema = Yup.object({
    email: Yup.string().required("email is required"),
    password: Yup.string().required("name is required"),
  });

  function handlFormSubmit(data: Login) {
    console.log(data);
    user.getUser(data);
    history.push("/");
  }

  return (
    <Segment clearing>
      <Header content="login" sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        initialValues={login}
        onSubmit={(values) => handlFormSubmit(values)}
      >
        {({ handleSubmit }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" />
            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage name="email" component="div" />
            <Button floated="right" positive type="submit" content="Submit" />
            <Button
              as={Link}
              to="/"
              floated="right"
              positive
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}

export default RegisterForm;
