import axios from "axios";

const url = "https://5688-203-192-225-62.in.ngrok.io/api";

export const fileUpload = async (formData: Blob, fileName: string) => {
  //   console.log(">>>", formData);
  const response = await axios.post(
    `${url}/fileupload`,
    {
      username: localStorage.getItem("username"),
      fileName: fileName,
      fileUpload: formData,
      createdAt: new Date().toLocaleDateString(),
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "ngrok-skip-browser-warning": true,
      },
    }
  );
  return response;
};

export const fetchUploadedFiles = async () => {
  const response = await axios(`${url}/getFileData`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "ngrok-skip-browser-warning": true,
    },
    method: "GET",
  });
  return response;
};
