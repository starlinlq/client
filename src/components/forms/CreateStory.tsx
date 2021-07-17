import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../app/stores/stores";
import Loading from "../../features/loader/Loading";
import ReactQuill from "react-quill";
import Upload from "../../features/upload/Upload";
import { history } from "../../index";

interface Warning {
  title: boolean;
  story: boolean;
  image: boolean;
}

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
  const [story_data, setStoryData] = useState({
    story: "",
    title: "",
    category: "",
  });

  const [warning = { title: false, image: false, story: false }, setWarning] =
    useState<Warning>();
  const { id } = useParams<{ id: string }>();
  const { post, features, user } = useStore();
  const { loading } = post;

  const handleOnChange = (e: any) => {
    setStoryData({ ...story_data, [e.target.name]: e.target.value });
  };
  const handleStory = (data: string) => {
    setStoryData({ ...story_data, story: data });
  };

  const _warning = (name: string, set: boolean) => {
    setWarning({ ...warning, [name]: set });
  };

  const handleFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (story_data.story.length < 500) {
      _warning("story", true);
    } else if (!features.url) {
      _warning("image", true);
    } else {
      post.create({ ...story_data, photo_url: features.url });
    }
  };

  useEffect(function () {}, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <header className="create_title">Begin writing your story.</header>
      <form
        className="_form"
        onSubmit={(event: React.SyntheticEvent) => {
          handleFormSubmit(event);
        }}
        autoComplete="off"
      >
        <input
          minLength={12}
          type="text"
          required
          className="_input"
          value={story_data.title}
          onChange={(e) => {
            handleOnChange(e);
          }}
          name="title"
          placeholder="Title"
        />
        {warning.story && (
          <label className="_required">
            story should be at least 500 characters
          </label>
        )}
        <ReactQuill
          className="testing02"
          theme="snow"
          value={story_data.story}
          onChange={(e: string) => handleStory(e)}
          placeholder={"Write something amazing..."}
          modules={modules}
        />

        <select
          required
          value={story_data.category}
          onChange={(e) => {
            handleOnChange(e);
          }}
          className="_select"
          name="category"
        >
          <option value="">Select Category</option>
          <option value="1">Adventure</option>
          <option value="2">Nature</option>
          <option value="3">Life</option>
        </select>

        {warning.image && (
          <label className="_required"> Please upload an image</label>
        )}

        <Upload />

        <div>
          <button type="submit" className="button button-w">
            Submit
          </button>
          <button
            onClick={() => {
              history.push("/");
            }}
            type="button"
            className="button button-w"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
export default observer(CreateStory);
