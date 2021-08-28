import { observer } from "mobx-react-lite";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { useStore } from "../../app/stores/stores";
import { IoPersonCircleOutline } from "react-icons/io5";

interface Image {
  image: File;
}

interface Props {
  user?: boolean;
  story?: boolean;
}

export default observer(function Upload({ user, story }: Props) {
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
            {uploaded ? (
              <div className="picture_container">
                <img src={features.url} alt="profile" onClick={handleFile} />
              </div>
            ) : (
              <div className="profile_picture">
                <IoPersonCircleOutline
                  onClick={handleFile}
                  className="profile_icon"
                />
                <p>Select profile picture</p>
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
