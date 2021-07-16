import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Story } from "../../app/interfaces";
import { useStore } from "../../app/stores/stores";
import Loading from "../../features/loader/Loading";
import ReactQuill from "react-quill";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],

    ["clean"],
  ],
};

function CreateStory() {
  const history = useHistory();

  const [
    story_data = {
      title: "",
      category: "",
    },
    setStory_data,
  ] = useState<Story>();
  const [selectedFile, setSelectedFile] = useState({});
  const [story, setStory] = useState("");
  const { id } = useParams<{ id: string }>();
  const { post } = useStore();
  const { loading } = post;

  const validationSchema = Yup.object({
    title: Yup.string().required("the activity title is required"),
    category: Yup.string().required("please select a category"),
  });

  const handleOnChange = (data: string) => {
    setStory(data);
  };

  const handleFormSubmit = (data: Story | any) => {
    post.create({ ...data, story, ...selectedFile });
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <header className="create_title">Begin writing your story</header>

      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={story_data}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit }) => (
          <Form className="_form" onSubmit={handleSubmit} autoComplete="off">
            <Field className="_input" name="title" placeholder="Title" />
            <ReactQuill
              className="testing02"
              theme="snow"
              value={story}
              onChange={(e: string) => handleOnChange(e)}
              placeholder={"Write something amazing..."}
              modules={modules}
            />
            <Field className="_select" name="category" as="select">
              <option value="1">Adventure</option>
              <option value="2">Nature</option>
              <option value="3">Life</option>
            </Field>
            <input
              className="_input"
              type="file"
              name="file"
              accept="image/*"
              placeholder="Upload an Image"
              onChange={(e: any) =>
                setSelectedFile({ image: e.target.files[0] })
              }
            />
            <div>
              <button type="submit" className="button button-w">
                Submit
              </button>
              <button type="button" className="button button-w">
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default observer(CreateStory);
