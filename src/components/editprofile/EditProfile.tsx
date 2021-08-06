import React from "react";
import Upload from "../../features/upload/Upload";

function EditProfile({ setActive }: { setActive: Function }) {
  function handleForm(e: React.SyntheticEvent) {}
  function handleActive() {
    setActive(false);
  }
  return (
    <div className="profile_edit">
      <form onSubmit={handleForm}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="name"
            className="_input"
          />
        </div>

        <div>
          {" "}
          <label htmlFor="about">About</label>
          <textarea name="about" placeholder="about" className="_input" />
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
