import React, { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import Registration from "../components/Login/Registration";
import LoginForm from "../components/Login/LoginForm";
import { motion } from "framer-motion";

function Login() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      className="loginME"
      initial={{ width: 0 }}
      animate={{ width: "80vw" }}
      exit={{ width: "80vw", transition: { duration: 0.1 } }}
    >
      <Grid container direction={"row"} spacing={1.35}>
        <Grid item>
          <Typography
            sx={{
              fontSize: 20,
              fontFamily: "Futura",
              textAlign: "center",
              color: "#50194d",
            }}
            gutterBottom
          >
            LOGIN
          </Typography>
          <LoginForm />
          <br />
          <br />
        </Grid>
        <Grid item>
          <Typography
            sx={{
              fontSize: 20,
              fontFamily: "Futura",
              textAlign: "center",
              color: "#50194d",
            }}
            gutterBottom
          >
            Register Account
          </Typography>
          <Registration />
        </Grid>
      </Grid>
    </motion.div>
  );
}

export default Login;
