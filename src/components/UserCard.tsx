import { Avatar, Card, CardHeader } from "@mui/material";
import { Employee } from "../types/types";

const UserCard = (prop:Employee) => {
    return (
      <Card sx={{ width: "150px", height:'70px', margin:"10px" }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: "green" }}>{prop.employeeName.slice(0,1)}</Avatar>}
          title={prop.employeeName}
          subheader={`ID #${prop.employeeEmail}`}
        />
      </Card>
    );
};

export default UserCard;