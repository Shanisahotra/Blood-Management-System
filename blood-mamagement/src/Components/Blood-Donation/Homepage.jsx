import React from "react";
import Slidebar from "../Sidebar";
import Navbar from "../Navbar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import "../Home.css";

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="bghome">
        <Box height={100} />

        <Box
          sx={{
            display: "flex",
          }}
        >
          <Slidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    paddingBottom: "50px",
                  }}
                >
                  <Typography variant="h2">
                    Available Blood Quantities
                  </Typography>
                </Box>
                <Stack direction="row" spacing={2}>
                  <Card
                    sx={{ minWidth: 24 + "%", height: 27 + "vh" }}
                    className="card1"
                  >
                    <CardContent>
                      <div>
                        <WaterDropIcon
                          sx={{ color: "white", fontSize: "50px" }}
                        />
                      </div>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Typography variant="h1" sx={{ color: "white" }}>
                          A+
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                  <Card
                    sx={{ minWidth: 24 + "%", height: 27 + "vh" }}
                    className="card1"
                  >
                    <CardContent>
                      <div>
                        <WaterDropIcon
                          sx={{ color: "white", fontSize: "50px" }}
                        />
                      </div>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Typography variant="h1" sx={{ color: "white" }}>
                          A-
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                  <Card
                    sx={{ minWidth: 24 + "%", height: 27 + "vh" }}
                    className="card1"
                  >
                    <CardContent>
                      <div>
                        <WaterDropIcon
                          sx={{ color: "white", fontSize: "50px" }}
                        />
                      </div>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Typography variant="h1" sx={{ color: "white" }}>
                          B+
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                  <Card
                    sx={{ minWidth: 24 + "%", height: 27 + "vh" }}
                    className="card2"
                  >
                    <CardContent>
                      <div>
                        <WaterDropIcon
                          sx={{ color: "white", fontSize: "50px" }}
                        />
                      </div>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Typography variant="h1" sx={{ color: "white" }}>
                          B-
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Stack>
              </Grid>
            </Grid>
            <Box height={30} />
            <Grid item xs={12}>
              <Stack direction="row" spacing={2}>
                <Card
                  sx={{ minWidth: 24 + "%", height: 27 + "vh" }}
                  className="card1"
                >
                  <CardContent>
                    <div>
                      <WaterDropIcon
                        sx={{ color: "white", fontSize: "50px" }}
                      />
                    </div>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="h1" sx={{ color: "white" }}>
                        AB+
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
                <Card
                  sx={{ minWidth: 24 + "%", height: 27 + "vh" }}
                  className="card1"
                >
                  <CardContent>
                    <div>
                      <WaterDropIcon
                        sx={{ color: "white", fontSize: "50px" }}
                      />
                    </div>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="h1" sx={{ color: "white" }}>
                        AB-
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
                <Card
                  sx={{ minWidth: 24 + "%", height: 27 + "vh" }}
                  className="card1"
                >
                  <CardContent>
                    <div>
                      <WaterDropIcon
                        sx={{ color: "white", fontSize: "50px" }}
                      />
                    </div>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="h1" sx={{ color: "white" }}>
                        O+
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
                <Card
                  sx={{ minWidth: 24 + "%", height: 27 + "vh" }}
                  className="card2"
                >
                  <CardContent>
                    <Box>
                      <WaterDropIcon
                        sx={{ color: "white", fontSize: "50px" }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="h1" sx={{ color: "white" }}>
                        O-
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Home;
