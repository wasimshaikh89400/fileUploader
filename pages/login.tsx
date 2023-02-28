/* eslint-disable @next/next/no-img-element */
import styles from "../styles/Home.module.css";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import LoginComponent from "../components/LoginComponent/LoginComponent";

const Login = () => (
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
            <LoginComponent />
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

export default Login;
