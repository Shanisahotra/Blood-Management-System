import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import backgroundImage from "../assets/background.jpg";

const defaultTheme = createTheme();

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const collectData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3100/api/user/register",
        {
          name,
          email,
          password,
        }
      );
      console.log("Response:", response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      setName("");
      setEmail("");
      setPassword("");
      setMessage("Registration successful");
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error occurred while registering");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: 0, // Ensure no padding to achieve full width
          margin: 0, // Ensure no margin to achieve full width
          overflow: "hidden", // Prevent any scrollbars from appearing
        }}
        maxWidth={false} // Disable maxWidth to use full width of the viewport
      >
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            paddingBottom: "10px",
            padding: "20px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <CssBaseline />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{ m: 1, bgcolor: "#980002", height: "10vh", width: "10vh" }}
            >
              <WaterDropIcon sx={{ fontSize: "7vh" }} />
            </Avatar>
            <Typography component="h1" variant="h3">
              Sign Up
            </Typography>
            <Typography component="h1" variant="h5" sx={{ paddingTop: "10px" }}>
              Create Account
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={collectData}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    pattern="[A-Za-z]+"
                    type="text"
                    required
                    fullWidth
                    id="firstName"
                    label="Name"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ backgroundColor: "#980002", mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              {message && <Typography color="error">{message}</Typography>}
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body1">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Container>
    </ThemeProvider>
  );
}
