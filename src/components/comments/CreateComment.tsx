import { Formik, Field, ErrorMessage } from "formik";
import { Fragment } from "react";
import { Form } from "semantic-ui-react";
import { useStore } from "../../app/stores/stores";
import * as Yup from "yup";
import { useState } from "react";

export default function CreateComment() {
  const [comment, setComment] = useState({ comment: "" });
  const { post } = useStore();

  const validationSchema = Yup.object({
    comment: Yup.string().required("comment is required"),
  });

  function handlFormSubmit(data: { comment: string }) {
    post.create_comment({ ...data });
  }

  return (
    <Fragment>
      <header>Create Comment</header>
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={comment}
        onSubmit={(values) => handlFormSubmit(values)}
      >
        {({ handleSubmit }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <Field
              component="textarea"
              name="comment"
              placeholder="Write your comment"
            />
            <ErrorMessage name="comment" component="div" />
            <button className="button" type="submit">
              Submit
            </button>
            <button type="button" className="button">
              Cancel
            </button>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
}
