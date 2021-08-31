import { Observer } from "mobx-react-lite";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useStore } from "../../app/stores/stores";
import { observer } from "mobx-react-lite";
import Upload from "../../features/upload/Upload";
interface Props {
  setActive: Function;
  photo_url?: string;
}
function EditProfile({ setActive, photo_url }: Props) {
  const [warning, setWarning] = useState(false);
  const { features, user } = useStore();
  const [data, setData] = useState({
    name: user.name,
    about: user.about,
    city: user.city,
  });

  function handleFormSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (features.url || photo_url) {
      user.editUserProfile({
        ...data,
        url: photo_url ? photo_url : features.url,
      });
      setActive(false);
      setWarning(false);
    } else {
      setWarning(true);
    }
  }
  useEffect(() => {
    setWarning(false);
  }, [features.url]);

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
      <form className="box-shadow" onSubmit={handleFormSubmit}>
        <div>
          <Upload type="Profile" photo_url={photo_url} />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            minLength={1}
            maxLength={15}
            required
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
            required
            minLength={1}
            maxLength={20}
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
            required
            minLength={5}
            maxLength={360}
            rows={10}
            cols={10}
            value={data.about}
            name="about"
            placeholder="Something about you"
            className="_input"
            onChange={handleFormData}
          />
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
export default observer(EditProfile);
