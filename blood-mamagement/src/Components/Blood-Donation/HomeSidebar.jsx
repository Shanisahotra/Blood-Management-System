import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Slidebar from "../Sidebar";
import {
  Box,
  Stack,
  Typography,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { DataGrid } from "@mui/x-data-grid";

const Setting = () => {
  const [donors, setDonors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");

  const columns = [
    { field: "id", headerName: "S. No.", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "email", headerName: "Email", width: 180 },
    { field: "age", headerName: "Age", type: "number", width: 90 },
    { field: "bloodGroup", headerName: "Blood Group", width: 120 },
    { field: "unit", headerName: "Unit", width: 90 },
    { field: "disease", headerName: "Disease", width: 130 },
    {
      field: "operation",
      headerName: "Operation",
      width: 150,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            component={Link}
            to={`/update/${params.row._id}`}
          >
            Update
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:3100/donor")
      .then((response) => {
        if (Array.isArray(response.data)) {
          const formattedData = response.data.map((donor, index) => ({
            id: index + 1,
            ...donor,
          }));
          setDonors(formattedData);
          setSearchResults(formattedData);
        } else {
          setError("Error: Expected array, received " + typeof response.data);
        }
      })
      .catch((error) => {
        setError("Error fetching donor data: " + error.message);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3100/donors/${id}`);
      setDonors(donors.filter((donor) => donor._id !== id));
      setSearchResults(searchResults.filter((donor) => donor._id !== id));
    } catch (error) {
      setError("Error deleting donor: " + error.message);
    }
  };

  const handleSearch = async (term) => {
    try {
      const response = await axios.get(
        `http://localhost:3100/search?q=${term}`
      );
      const formattedData = response.data.map((donor, index) => ({
        id: index + 1,
        ...donor,
      }));
      setSearchResults(formattedData);
    } catch (error) {
      setError("Error searching donors: " + error.message);
    }
  };

  const handleChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    handleSearch(term);
  };

  const handleExport = async () => {
    try {
      const response = await axios.get("http://localhost:3100/export", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "data.xlsx");
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      setError("Error exporting data: " + error.message);
    }
  };

  return (
    <>
      <Navbar />
      <Box height={60} />
      <div className="bghome">
        <Box sx={{ display: "flex" }}>
          <Slidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Box height={40} />
            <Box
              sx={{
                maxHeight: 55 + "vh",
                maxWidth: 170 + "vh",
                backgroundColor: "white",
              }}
            >
              <Typography
                gutterBottom
                component="div"
                variant="h5"
                sx={{ padding: "20px" }}
              >
                Donors List
              </Typography>
              <Divider />
              <Box height={10} />
              <Stack direction="row" spacing={2} sx={{ padding: "10px" }}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={searchResults}
                  sx={{ width: 300 }}
                  onChange={(e, v) => filterData(v)}
                  getOptionLabel={(rows) => rows.name || ""}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      label="Search Donors"
                      value={searchTerm}
                      onChange={handleChange}
                    />
                  )}
                />
                <Button variant="contained" onClick={handleExport}>
                  Export to Excel
                </Button>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  {error && <div className="error">{error}</div>}
                </Typography>
              </Stack>
              <Box height={10} />
              <DataGrid
                sx={{ backgroundColor: "white" }}
                rows={searchResults}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
              />
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Setting;
