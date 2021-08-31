import { observer } from "mobx-react-lite";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { useStore } from "../../app/stores/stores";
import { IoPersonCircleOutline, IoImageOutline } from "react-icons/io5";

interface Image {
  image: File;
}

type Props = {
  user?: boolean;
  story?: boolean;
  type?: string;
  photo_url?: string;
};

export default observer(function Upload({
  user,
  story,
  type,
  photo_url,
}: Props) {
  const [selectedFile, setSelectedFile] = useState<Image>();
  const [uploaded, setUploaded] = useState(false);
  const { features } = useStore();
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleChange = (e: any) => {
    setSelectedFile({ image: e.target.files[0] });
    features.upload_image(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      features.upload_image(selectedFile.image);
    }
  };
  const handleFile = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  useEffect(
    function () {
      if (features.url) {
        setUploaded(true);
      }
    },
    [features.url]
  );

  console.log(features.url);

  return (
    <div className=" upload_container _relative">
      {features.loading ? (
        <div className="loading">
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <>
          <div>
            {uploaded || photo_url ? (
              <div className="picture_container">
                <img
                  src={
                    photo_url && features.url.length === 0
                      ? photo_url
                      : features.url
                  }
                  alt="profile"
                  className={type === "Profile" ? "profile_img" : "story_img"}
                  onClick={handleFile}
                />
              </div>
            ) : (
              <div className="profile_picture">
                {type === "Profile" ? (
                  <>
                    <IoPersonCircleOutline
                      onClick={handleFile}
                      className="profile_icon"
                    />
                    <p>Select profile picture</p>
                  </>
                ) : (
                  <>
                    <IoImageOutline
                      onClick={handleFile}
                      className="profile_icon"
                    />
                    <p>Select story picture</p>{" "}
                  </>
                )}
              </div>
            )}
            <div className="file-upload">
              <input
                ref={hiddenFileInput}
                className="file-upload__input"
                style={{ width: "100%" }}
                type="file"
                name="file"
                accept="image/*"
                placeholder="Upload an Image"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
});

/*
 <label htmlFor="files">Select Image</label>
            <input
              className="file_input"
              style={{ width: "100%" }}
              type="file"
              name="file"
              accept="image/*"
              placeholder="Upload an Image"
              onChange={(e) => handleChange(e)}
            />

             <div className="upload_buttons">
            <button type="button" className="" onClick={handleUpload}>
              Upload
            </button>
          </div>{" "}

*/
