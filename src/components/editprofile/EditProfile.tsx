import React from "react";
import { useState } from "react";
import { useStore } from "../../app/stores/stores";
import Upload from "../../features/upload/Upload";

function EditProfile({ setActive }: { setActive: Function }) {
  const [data, setData] = useState({ name: "", about: "", city: "" });
  const { features, user } = useStore();

  function handleFormSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (features.url) {
      user.editUserProfile({ ...data, url: features.url });
      setActive(false);
    }
  }

  function handleFormData(
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  function handleActive() {
    setActive(false);
  }
  return (
    <div className="profile_edit">
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            value={data.name}
            onChange={handleFormData}
            type="text"
            name="name"
            placeholder="Your name"
            className="_input"
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            value={data.city}
            onChange={handleFormData}
            type="text"
            name="city"
            placeholder="Where are you from"
            className="_input"
          />
        </div>

        <div>
          {" "}
          <label htmlFor="about">About</label>
          <textarea
            value={data.about}
            name="about"
            placeholder="Something about you"
            className="_input"
            onChange={handleFormData}
          />
        </div>
        <div>
          <label htmlFor="profile picture">Profile picture</label>
          <Upload />
        </div>

        <button className="button" type="submit">
          Submit
        </button>
        <button className="button" onClick={handleActive} type="button">
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
