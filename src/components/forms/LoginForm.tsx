import * as Yup from "yup";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Segment, Header, Button } from "semantic-ui-react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Login } from "../../app/interfaces";
import { useStore } from "../../app/stores/stores";
import { observer } from "mobx-react-lite";
import Loading from "../../features/loader/Loading";
import { history } from "../../";
function RegisterForm() {
  let login: Login = { email: "", password: "" };
  const { id } = useParams<{ id: string }>();
  const { user } = useStore();
  const { isAuth } = user;

  const validationSchema = Yup.object({
    email: Yup.string().required("email is required"),
    password: Yup.string().required("name is required"),
  });
  console.log(id);

  function handlFormSubmit(data: Login) {
    user.getUser(data);
    if (id) {
      history.push(`/story/${id}`);
    } else if (user.isAuth) {
      history.push("/");
    }
  }

  if (user.loading) {
    return <Loading />;
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

export default observer(RegisterForm);
