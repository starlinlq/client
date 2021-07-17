import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useEffect } from "react";
import { agent } from "../../app/api/agent";
import { useStore } from "../../app/stores/stores";

interface Image {
  image: File;
}

export default observer(function Upload() {
  const [selectedFile, setSelectedFile] = useState<Image>();
  const [uploaded, setUploaded] = useState(false);
  const { features } = useStore();

  const handleChange = (e: any) => {
    setSelectedFile({ image: e.target.files[0] });
  };

  const handleUpload = async () => {
    if (selectedFile) {
      features.upload_image(selectedFile.image);
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

  const handleCancel = () => {};

  return (
    <div className="_input upload _relative">
      {features.loading ? (
        <div className="loading">
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <>
          <div>
            {uploaded && (
              <p className="_required" style={{ paddingBottom: 10 }}>
                Image Uploaded
              </p>
            )}
            <label htmlFor="files">Select Image</label>
            <input
              className="file_input"
              style={{ width: "100%" }}
              type="file"
              name="file"
              accept="image/*"
              placeholder="Upload an Image"
              onChange={(e: any) => handleChange(e)}
            />
          </div>
          <div className="upload_buttons">
            <button type="button" className="" onClick={handleUpload}>
              Upload
            </button>
          </div>{" "}
        </>
      )}
    </div>
  );
});
