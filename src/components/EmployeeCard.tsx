import { Avatar, Card, CardHeader } from "@mui/material";
import { Link } from "react-router-dom";

interface EmployeeCardProp {
  _id?: string;
  employeeid?: string;
  employeeName: string;
  employeeEmail: string;
}

const EmployeeCard = (prop: EmployeeCardProp) => {
  return (
    <Card sx={{ width: "300px", height: "70px", margin: "10px" }}>
      <Link to={`/employees/${prop.employeeid}`}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "green" }}>
              {prop.employeeName.slice(0, 1)}
            </Avatar>
          }
          title={prop.employeeName}
          subheader={`${prop.employeeEmail.slice(0,15)}...`}
        />
      </Link>
    </Card>
  );
};

export default EmployeeCard;
