import { Avatar, Card, CardHeader } from "@mui/material";

const UserCard = (prop) => {
    return (
      <Card sx={{ width: "150px", height:'70px', margin:"10px" }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: "green" }}>{prop.name.slice(0,1)}</Avatar>}
          title={prop.name}
          subheader={`ID #${prop.id}`}
        />
      </Card>
    );
};

export default UserCard;