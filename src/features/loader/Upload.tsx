import React, { useState } from "react";
import { agent } from "../../app/api/agent";
import { useStore } from "../../app/stores/stores";

interface Image {
  image: File;
}

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState<Image>();
  const [uploaded, setUploaded] = useState(false);

  const handleChange = (e: any) => {
    setSelectedFile({ image: e.target.files[0] });
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const newForm = new FormData();
      newForm.append("image", selectedFile.image);
     let img = await agent.story.upload(newForm);
     
    }
  };

  return (
    <>
      <input
        className="_input"
        type="file"
        name="file"
        accept="image/*"
        placeholder="Upload an Image"
        onChange={(e: any) => handleChange(e)}
      />
      <button className="_button" onClick={handleUpload}>
        Upload
      </button>
    </>
  );
}
