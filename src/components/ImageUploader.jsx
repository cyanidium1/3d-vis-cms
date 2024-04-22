import React, { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";

const ImageUploader = ({ setPhoto }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const cloudName = "dbfdkml1k";
    const uploadPreset = "ml_default";

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            upload_preset: uploadPreset,
          },
        }
      );

      setImgUrl(response.data.secure_url);
      setPhoto(response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error.response.data);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <Button onClick={handleUpload}>Загрузить</Button>
      {imgUrl && <img src={imgUrl} alt="food" width={80} />}
    </div>
  );
};

export default ImageUploader;
