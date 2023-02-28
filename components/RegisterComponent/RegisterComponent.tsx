import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Link from "next/link";
import CustomTextField from "../CustomComponent/CustomTextField";
import { addUsers } from "../../pages/api/users";
import { useRouter } from "next/router";
import CustomizedSnackbars from "../CustomComponent/CustomSnackbar";
const RegisterComponent = () => {
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [missPassword, setMissPassword] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();
  const onSubmit = async () => {
    if (Object.values(userData).every((item: string) => item.trim())) {
      if (userData.password !== userData.confirmPassword) {
        setMissPassword(true);
        setTimeout(() => {
          setMissPassword(false);
        }, 3000);
      } else {
        let result = await addUsers(
          userData.userName,
          userData.password,
          userData.email
        );
        if (result.status === 200) {
          setSuccess(true);
          router.push("/login");
        } else {
          alert("user already Present!");
        }
      }
    } else setError(true);
    setTimeout(() => {
      setError(false);
    }, 3000);
  };
  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <Typography
        variant="h4"
        sx={{ color: "#02abb0", fontSize: 24, fontWeight: 700 }}
      >
        Register To Your Account
      </Typography>
      <Typography
        variant="h6"
        sx={{ color: "grey", fontSize: 14, fontWeight: 500, mt: 1, mb: 3 }}
      >
        Already have an account &nbsp;
        <Link style={{ color: "#00ccac" }} href={"/login"}>
          login here!!
        </Link>
      </Typography>
      <CustomTextField
        value={userData.userName}
        onChange={(e) => setUserData({ ...userData, userName: e.target.value })}
        label="User Name"
      />
      <CustomTextField
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        label="Email"
      />{" "}
      <CustomTextField
        value={userData.password}
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        label="Password"
        type="password"
      />{" "}
      <CustomTextField
        value={userData.confirmPassword}
        onChange={(e) =>
          setUserData({ ...userData, confirmPassword: e.target.value })
        }
        label="Confirm Password"
        type="password"
      />
      <Button
        variant="outlined"
        sx={{
          background: "linear-gradient(#02aab0,#00cdac)",
          color: "white",
          width: 400,
          marginTop: 4,
          height: 58,
          fontSize: 16,
          fontWeight: 700,
          opacity: !Object.values(userData).every((ele) => ele) ? 0.6 : 1,
          pointerEvents: !Object.values(userData).every((ele) => ele)
            ? "none"
            : "auto",
        }}
        onClick={onSubmit}
      >
        Sign in
      </Button>
      <CustomizedSnackbars
        open={missPassword || error || success}
        severity={success ? "success" : "warning"}
        message={
          missPassword
            ? "The confirmed password does not match with the password you entered"
            : resolveTernary(error)
        }
      />
    </Box>
  );

  function resolveTernary(error: boolean): string {
    return error
      ? "Please fill in all the mandatory fields before submitting the form"
      : "registration done successfully";
  }
};

export default RegisterComponent;
