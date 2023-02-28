import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { fileUpload } from "../pages/api/fileupload";

const CustomFileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files?.[0] || null);
  };

  const convertToBlob = (file: File) => {
    return new Promise<Blob | null>((resolve) => {
      const reader = new FileReader();
      // reader.onloadend = () => {
      //   const result = reader.result;
      //   const blob =
      //     typeof result === "string"
      //       ? null
      //       : new Blob([result], { type: file.type });
      //   resolve(blob);
      // };
      reader.readAsArrayBuffer(file);
    });
  };

  const handleUploadClick = async () => {
    if (selectedFile) {
      setIsUploading(true);
      const blob = await convertToBlob(selectedFile);
      //   console.log(typeof blob);
      // const result = await fileUpload(blob, selectedFile.name);
      //   if (result) {
      //     window.location.reload();
      //   }
      //   if (blob) {
      //     const formData = new FormData();
      //     formData.append("fileUpload", blob, selectedFile.name);
      //     console.log(">>>", formData);
      //     // const result = await fileUpload(formData, selectedFile.name);
      //     // if (result) {
      //     //   window.location.reload();
      //     // }
      //   }
      setIsUploading(false);
    }
  };

  return (
    <Box>
      <input
        accept="image/jpeg,image/svg,image/png,application/pdf"
        id="file-upload"
        name="file-upload"
        type="file"
        multiple
        onChange={handleFileChange}
      />
      <Button
        variant="contained"
        color="primary"
        disabled={!selectedFile || isUploading}
        onClick={handleUploadClick}
      >
        Upload
      </Button>
    </Box>
  );
};

export default CustomFileUpload;
