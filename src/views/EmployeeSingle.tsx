import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Employee } from "../types/types";
import axios from "axios";
import {
  Card,
  CardMedia,
  CardHeader,
  Avatar,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import ExoveEmployee from "../assets/Exove-employee.png";
import Loading from "../components/Loading";

const EmployeeSingle = () => {
  const [employee, setEmployee] = useState<Employee>();
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    // imitate loading
    setIsLoading(true)
    setTimeout(() => {
      axios
        .get(`http://localhost:4500/api/employees/${params.employeeId}`)
        .then((res) => {
          setEmployee(res.data);
        });
      setIsLoading(false);
    }, 1000);
  }, [params]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Card sx={{ width: "600px", height: "200px", margin: "10px" }}>
          <Stack direction={"row"} spacing={5}>
            <CardMedia
              component={"img"}
              image={ExoveEmployee}
              sx={{ width: "200px", height: "200px", objectFit: "fill" }}
            />
            <Box component={"div"} textAlign={"left"}>
              <Typography variant="h3">{employee?.employeeName}</Typography>
              <Typography variant="h4">{employee?.employeeEmail}</Typography>
              <Typography variant="h5">
                {employee?.companyRole} | {employee?.privileges}{" "}
              </Typography>
            </Box>
          </Stack>
        </Card>
      )}
    </>
  );
};

export default EmployeeSingle;
