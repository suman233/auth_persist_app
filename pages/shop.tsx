import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const Shop = () => {
  const [paramsTextFields, setParamsTextFields] = useState([0]);

  const mapTextFields = (): React.JSX.Element[] => {
    return paramsTextFields.map((item, i) => {
      return (
        <div style={{ marginBottom: "15px" }}>
          <TextField
            id="outlined-basic"
            name="key"
            label="API KEY"
            variant="outlined"
            sx={{ mr: 2, backgroundColor: "#f2f6f7", color: "black" }}
            InputProps={{
              sx: {
                color: "black"
              }
            }}
            // onChange={handleChange}
          />
          <TextField
            id="outlined-basic"
            name="value"
            label="VALUE"
            variant="outlined"
            // onChange={handleChange}
            sx={{ mr: 2, backgroundColor: "#f2f6f7", color: "black" }}
            InputProps={{
              sx: {
                color: "black"
              }
            }}
          />
          <TextField
            id="outlined-basic"
            name="value"
            label="Description"
            variant="outlined"
            // onChange={handleChange}
            sx={{ mr: 2, backgroundColor: "#f2f6f7", color: "black" }}
            InputProps={{
              sx: {
                color: "black"
              }
            }}
          />
        </div>
      );
    });
  };

  const handleSubmit = () => {
    setParamsTextFields((prev) => [...prev, 0]);
  };
  return (
    <Container>
      <Typography>Shop Item Page</Typography>
      <Box sx={{ my: "30px" }}>
        <Typography sx={{ mb: 3, fontWeight: "bold" }}>Query Params</Typography>
        <div>
          {mapTextFields()}
          <Button
            onClick={handleSubmit}
            size="small"
            variant="contained"
            sx={{ height: 50, backgroundColor: "orange", width: "35%" }}
          >
            Add
          </Button>
        </div>
      </Box>
    </Container>
  );
};

export default Shop;
