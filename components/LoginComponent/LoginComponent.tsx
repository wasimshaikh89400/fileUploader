import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Link from "next/link";
import CustomTextField from "../CustomComponent/CustomTextField";
import { useRouter } from "next/router";

const LoginComponent = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [alert, setAlert] = useState(false);
  const router = useRouter();
  const handleRedirect = async () => {
    setAlert(true);
    router.push("/");
    if (Object.values(loginData).every((item) => item)) {
      //   const { data, status } = handleLogin(
      //     loginData.username,
      //     loginData.password
      //   );
    }
  };
  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <Typography
        variant="h4"
        sx={{ color: "#02abb0", fontSize: 24, fontWeight: 700 }}
      >
        Login To Your Account
      </Typography>
      <Typography
        variant="h6"
        sx={{ color: "grey", fontSize: 14, fontWeight: 500, mt: 1, mb: 6 }}
      >
        Doesn&lsquo;t have an account yet &nbsp;
        <Link style={{ color: "#00ccac" }} href={"/register"}>
          signup here!!
        </Link>
      </Typography>
      <CustomTextField
        label="User Name"
        value={loginData.username}
        onChange={(e: any) =>
          setLoginData({ ...loginData, username: e.target.value })
        }
      />
      <CustomTextField
        label="Password"
        value={loginData.password}
        onChange={(e: any) =>
          setLoginData({ ...loginData, password: e.target.value })
        }
        type="password"
      />
      <Typography sx={{ color: "grey", fontSize: 12 }}>
        Forgot password?
      </Typography>
      <br />
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
          opacity:
            loginData.password.length < 8 || loginData.username.length < 8
              ? 0.6
              : 1,
          pointerEvents:
            loginData.password.length < 8 || loginData.username.length < 8
              ? "none"
              : "auto",
        }}
        onClick={handleRedirect}
      >
        LOGIN
      </Button>
    </Box>
  );
};

export default LoginComponent;
