import { Typography, Card, CardHeader, Avatar } from "@mui/material";
import { Notification, UserContextProps } from "../../types/types";
import { getTodayDate } from "../../utils/formatDate";
import { CardStyle, CardSubheader } from "./constant";
import ExoveLogo from "../../assets/ExoveLogoSquareBlack.jpeg";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

type DeniedByAdminCardProps = {
  noti: Notification;
};

const DeniedByAdminCard = ({ noti }: DeniedByAdminCardProps) => {
  let today = getTodayDate();

  const { adminNoti } = useContext<UserContextProps>(UserContext);

  return (
    <Card sx={CardStyle(noti.date === today)}>
      <CardHeader
        avatar={<Avatar src={ExoveLogo} />}
        title={
          <Typography>
            {adminNoti ? (
              <b>
                An admin has denied a request from{" "}
                <span style={{ color: "#9b51e0" }}>
                  {noti.receiver[0].receiverName}.
                </span>
              </b>
            ) : (
              <>
                <b>An admin has denied your request.</b> Try create a new
                request <br></br> or contact admin for more information.
              </>
            )}
          </Typography>
        }
        subheader={CardSubheader(noti.date)}
      ></CardHeader>
    </Card>
  );
};

export default DeniedByAdminCard;
