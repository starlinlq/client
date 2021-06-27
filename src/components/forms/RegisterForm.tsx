import * as Yup from "yup";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Segment, Header, Button } from "semantic-ui-react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Register } from "../../app/interfaces";
import { useStore } from "../../app/stores/stores";
import { history } from "../../";

function RegisterForm() {
  let register: Register = { name: "", email: "", password: "" };
  const { user } = useStore();

  const validationSchema = Yup.object({
    email: Yup.string().required("email is required"),
    name: Yup.string().required("name is required"),
    password: Yup.string().required("password is required"),
  });

  function handlFormSubmit(data: Register) {
    user.registerUser(data).then(() => {
      history.push("/");
    });
  }

  return (
    <Segment clearing>
      <Header content="Register" sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        initialValues={register}
        onSubmit={(values) => handlFormSubmit(values)}
      >
        {({ handleSubmit }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <Field name="name" placeholder="Name" />
            <ErrorMessage name="name" component="div" />
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
