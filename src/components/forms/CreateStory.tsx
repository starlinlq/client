import React from "react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, Segment, Header } from "semantic-ui-react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Story } from "../../app/interfaces";
import { useStore } from "../../app/stores/stores";
import { agent } from "../../app/api/agent";
import Loading from "../../features/loader/Loading";

function CreateStory() {
  const history = useHistory();

  const [
    story = {
      title: "",
      story: "",
      photo_url: "",
      category: "",
    },
    setActivity,
  ] = useState<Story>();
  const { id } = useParams<{ id: string }>();
  const { post } = useStore();
  const { loading } = post;

  const validationSchema = Yup.object({
    title: Yup.string().required("the activity title is required"),
    story: Yup.string().required("the activity description is required"),
    photo_url: Yup.string().required("a photo is required"),
    category: Yup.string().required("please select a category"),
  });

  useEffect(() => {
    if (id) {
      //load story
    }
  }, []);

  const handleFormSubmit = (data: Story | any) => {
    post.create(data);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <header>Create Story</header>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={story}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit }) => (
          <Form className="_form" onSubmit={handleSubmit} autoComplete="off">
            <Field className="_input" name="title" placeholder="Title" />
            <Field
              className="_textarea"
              name="story"
              rows={5}
              as="textarea"
              placeholder="Story"
            />
            <Field className="_select" name="category" as="select">
              <option value="1">Adventure</option>
              <option value="2">Nature</option>
              <option value="3">Life</option>
            </Field>
            <Field className="_input" name="photo_url" placeholder="Photo" />
            <div>
              <button type="submit" className="button">
                Submit
              </button>
              <a href="/" className="button">
                Cancel
              </a>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default observer(CreateStory);
