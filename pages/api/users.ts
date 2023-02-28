import axios from "axios";

const url =
  "https://70ab0747-b3aa-4c84-a64f-279d7155ea86.mock.pstmn.io/storeFile";

export const addUsers = async (
  username: string,
  password: string,
  email: string
) => {
  let response = await axios.post(url, {
    username: username,
    password: password,
    email: email,
  });
  return response;
};

export const handleLogin = async (username: string, password: string) => {
  let response = await axios.get(`${url}/users`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": true,
    },
  });

  return response;
};
