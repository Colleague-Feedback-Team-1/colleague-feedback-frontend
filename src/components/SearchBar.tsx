import {
  Stack,
  Autocomplete,
  TextField,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Employee } from "../types/types";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [employees, setEmployees] = useState<Employee[] | null>([]);

  useEffect(() => {
    axios
      .get("http://localhost:4500/api/employees/all-employees")
      .then((res) => {
        setEmployees(res.data);
      });
  }, []);
  return (
    <Stack
      direction={"row"}
      style={{ backgroundColor: "white" }}
      alignItems={"center"}
      justifyContent={"center"}
      width={"350px"}
      height={'100%'}
      borderRadius={'10px'}
    >
      <Autocomplete
        options={employees!}
        getOptionLabel={(employees) => `${employees.employeeName}`}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Search for an employee"
            size="small"
          />
        )}
        sx={{ width: "100%" }}
        noOptionsText="No employee found with that name"
        renderOption={(props, employees) => (
          <Link to={`/employees/${employees._id}`} {...employees}>
            <Box component={"li"} {...props} key={employees._id}>
              {employees.employeeName} ({employees.employeeEmail})
            </Box>
          </Link>
        )}
      />
    </Stack>
  );
};

export default SearchBar;
