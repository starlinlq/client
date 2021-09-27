import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../app/stores/stores";
import Loading from "../../features/loader/Loading";
import ReactQuill from "react-quill";
import Upload from "../../features/upload/Upload";
import { history } from "../../index";
import { Story } from "../../app/interfaces";

interface Warning {
  title: boolean;
  story: boolean;
  image: boolean;
}
type Edit = {
  story?: string;
  category?: string;
  title?: string;
  photo_url?: string;
  editData?: Function;
  update?: boolean;
  story_id?: number;
  description?: string;
};

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

function CreateStory({
  story,
  title,
  category,
  photo_url,
  editData,
  story_id,
  update,
  description,
}: Edit) {
  const [story_data, setStoryData] = useState({
    story: story ? story : "",
    title: title ? title : "",
    photo_url: photo_url ? photo_url : "",
    category_title: category ? category : "",
  });
  const [options, setOptions] = useState([
    { option: "all" },
    { option: "Nature" },
    { option: "Adventure" },
    { option: "Comedy" },
    { option: "Rebirth" },
    { option: "Universe" },
    { option: "Family" },
  ]);

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
    if (story_data.story.length < 300) {
      _warning("story", true);
    } else if (!features.url && !photo_url) {
      _warning("image", true);
    } else if (!update) {
      post.create({ ...story_data, photo_url: features.url });
    } else {
      post.update({
        ...story_data,
        id: story_id,
        photo_url: features.url.length > 1 ? features.url : photo_url,
      });
    }
  };
  const handleCancel = () => {
    if (story && editData) {
      editData({
        story: "",
        title: "",
        category: "",
        photo_url: "",
        active: false,
        update: false,
      });
    } else {
      history.push("/");
    }
  };

  useEffect(function () {
    if (category) {
      let data = options.filter((element) => element.option !== category);
      let new_data = [{ option: category }, ...data];
      setOptions(new_data);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="create_story_container  ">
      <header className="create_title">Begin writing your story.</header>
      <form
        className="_form"
        onSubmit={(event: React.SyntheticEvent) => {
          handleFormSubmit(event);
        }}
        autoComplete="off"
      >
        <Upload photo_url={photo_url} />
        <input
          minLength={12}
          type="text"
          required
          className="_input "
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
          value={story_data.category_title}
          onChange={(e) => {
            handleOnChange(e);
          }}
          className="_select"
          name="category_title"
        >
          <>
            {!category && <option value="All">Select Category</option>}
            {options.map((value) => (
              <option value={value.option}>{value.option}</option>
            ))}
          </>
        </select>

        {warning.image && (
          <label className="_required"> Please upload an image</label>
        )}

        <div className="form_buttons">
          <button type="submit" className="button button-w">
            Submit
          </button>
          <button
            onClick={handleCancel}
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
