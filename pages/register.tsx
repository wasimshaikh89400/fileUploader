import styles from "../styles/Home.module.css";
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { addUsers } from "./api/users";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import RegisterComponent from "../components/RegisterComponent/RegisterComponent";

// const inter = Inter({ subsets: ["latin"] });

const Register = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let name = event.target.name;
    let value = event.target.value;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "password_confirm":
        setPasswordConfirm(value);
      default:
        break;
    }
  };
  return (
    <>
      <Box className={styles.main}>
        <Box
          width="80%"
          sx={{
            background: "#edf5f3",
            border: "1px solid #38b297",
            borderRadius: "5px",
          }}
        >
          <Grid container sx={{ borderRadius: 2 }}>
            <Grid
              item
              sm={12}
              md={7}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RegisterComponent />
            </Grid>
            <Grid
              item
              sm={12}
              md={5}
              sx={{
                background: "linear-gradient(#02aab0,#00cdac)",
                height: "83vh",
                paddingLeft: 2,
                paddingTop: 6,
              }}
            >
              <img
                src="https://youthed.org.za/wp-content/uploads/2022/10/login-users.png"
                alt="img"
                width="95%"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Register;
