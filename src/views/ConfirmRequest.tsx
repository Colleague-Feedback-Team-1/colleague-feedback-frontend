import {
  Stack,
  Card,
  Typography,
  TextField,
  Avatar,
  CardHeader,
  IconButton,
  Button,
  Modal,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Loading from "../components/Loading";

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Employee, Receiver, Request, Reviewer } from "../types/types";
import EmployeeCard from "../components/EmployeeCard";
import ReviewerCard from "../components/ReviewerCard";
import { toast } from "react-toastify";
import { getTodayDate } from "../utils/formatDate";

const modalStyle = {
  position: "fixed",
  boxShadow: 24,
  backgroundColor: "white",
  p: 4,
  color: "white",
  textAlign: "center",
  borderRadius: "30px",
  alignItem: "center",
  margin: "80px auto auto auto",
  width: "60%",
  height: "min-content",
};

const ConfirmRequest = () => {
  const params = useParams();
  const [filterUser, setFilterUser] = useState("");
  const [requestData, setRequestData] = useState<Request | null>();
  const [employeeList, setEmployeeList] = useState<Employee[] | null>([]);
  const [managerList, setManagerList] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4500/api/employees/all-employees")
      .then((res) => {
        setEmployeeList(res.data);
      });
    axios
      .get(
        `http://localhost:4500/api/review-requests/by-requestid/${params.requestId}`
      )
      .then((res) => {
        setRequestData(res.data);
        setIsLoading(false);
      });
  }, [params.requestId]);

  // open and close the modal
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  // handle confirm
  const handleConfirm = () => {
    const confirmBody = {
      assignedManagerid: managerList[0]._id,
      assignedManagerName: managerList[0].displayName,
      confirmedByHR: "true",
    };

    setTimeout(() => {
      // first create a confirmed-by-admin noti
      let today = getTodayDate();
      const notification1 = {
        type: "confirmed-by-admin",
        date: today,
        receiver: [
          {
            receiverid: requestData?.employeeid,
            receiverName: requestData?.employeeName,
          },
        ],
        sender: [
          {
            senderid: "Admin",
            senderName: "Admin",
          },
        ],
        requestid: requestData?._id,
      };
      axios
        .post(
          "http://localhost:4500/api/notifications/insert-notification",
          notification1
        )
        .then((res) => toast.success("Confirmed request successfully"));
      // then create a ask-for-feedback noti
      let receiverList: Receiver[] = [];
      requestData?.reviewers.forEach((reviewer: Reviewer) => {
        receiverList.push({
          receiverid: reviewer.reviewerid,
          receiverName: reviewer.reviewerName,
        });
      });
      receiverList.push({
        receiverid: managerList[0]._id,
        receiverName: managerList[0].displayName,
      });
      const notification2 = {
        type: "ask-for-feedback",
        date: today,
        receiver: receiverList,
        sender: [
          {
            senderid: requestData?.employeeid,
            senderName: requestData?.employeeName,
          },
        ],
        requestid: requestData?._id,
      };
      axios
        .post(
          "http://localhost:4500/api/notifications/insert-notification",
          notification2
        )
        .then((res) => toast.success("Notification posted"));
      axios
        .patch(
          `http://localhost:4500/api/review-requests/update-manager/${params.requestId}`,
          confirmBody
        )
        .then((res) => {
          setOpenModal(false);
          navigate("/");
        })
        .catch((error) => toast.error(error));
    }, 1000);
  };

  // handle search bar
  const onChangeHandler = (value: string) => {
    setFilterUser(value);
  };

  const addManager = (manager: Employee) => {
    // limit the amount of manager to be only 1 employee
    if (managerList.length === 0) {
      // If the array is empty, add the new object as the first item
      setManagerList([manager]);
    } else {
      const newManagerArray = managerList;
      newManagerArray.slice(0, 1).push(manager);
      setManagerList(newManagerArray);
    }
  };

  const removeManager = (manager: Employee) => {
    let newManagerArray = managerList.filter(
      (employee) => employee._id !== manager._id
    );
    setManagerList(newManagerArray);
  };

  //render the list of all employees with filter from searchbar
  const renderAllEmployees = () => {
    if (filterUser === "") {
    } else {
      return employeeList!
        .filter((employee: Employee) => {
          return employee.displayName
            .toLowerCase()
            .includes(filterUser.toLowerCase());
        })
        .map((employee) => {
          return renderUserCard({ ...employee });
        });
    }
  };

  function isInArray(targetObject: any, objectArray: any) {
    for (let i = 0; i < objectArray.length; i++) {
      if (JSON.stringify(targetObject) === JSON.stringify(objectArray[i])) {
        return true;
      }
    }
    return false;
  }

  const renderCardAction = (prop: Employee) => {
    if (isInArray(prop, managerList)) {
      return (
        <IconButton onClick={() => removeManager({ ...prop })}>
          <CheckCircleIcon color="success" />
        </IconButton>
      );
    } else {
      return (
        <IconButton onClick={() => addManager({ ...prop })}>
          <AddCircleIcon color="primary" />
        </IconButton>
      );
    }
  };

  const renderUserCard = (prop: Employee) => {
    return (
      <Card sx={{ width: "300px", height: "70px", margin: "5px" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "green" }}>
              {prop.displayName.slice(0, 1)}
            </Avatar>
          }
          title={prop.displayName}
          subheader={`${prop.mail.slice(0, 15)}...`}
          action={renderCardAction({ ...prop })}
        />
      </Card>
    );
  };

  return (
    <Stack sx={{ textAlign: "left" }}>
      {isLoading === false ? (
        <Card
          sx={{
            padding: "20px",
            backgroundColor: "hsl(0deg 5.71% 86.27% / 14.9%)",
            boxShadow:
              "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
            borderRadius: "4px",
            overflowX: "auto",
            minHeight: "75vh",
          }}
        >
          <Typography variant="h4">Confirm Request</Typography>
          <Stack direction={"row"} padding={"20px 0 50px 0"} spacing={10}>
            <Stack flexGrow={1}>
              <Typography variant="h5">Reviewee:</Typography>
              <EmployeeCard {...requestData!} />
            </Stack>
            <Stack flexGrow={4}>
              <Typography variant="h5">Reviewers:</Typography>
              <Stack direction={"row"} flexWrap={"wrap"}>
                {requestData!.reviewers.map((reviewer) => {
                  return <ReviewerCard {...reviewer} />;
                })}
              </Stack>
            </Stack>
          </Stack>

          <Stack paddingBottom={"50px"} direction={"row"}>
            <Stack flexGrow={1} width={"40vw"}>
              <Typography variant="h5">
                Assigning Project Manager ({managerList.length}/1):
              </Typography>
              <Stack
                direction={"row"}
                flexWrap={"wrap"}
                alignItems={"center"}
                justifyContent={"flex-start"}
              >
                {managerList.map((employee) => {
                  return renderUserCard({ ...employee });
                })}
              </Stack>
            </Stack>
            <Stack sx={{ width: "60vw" }}>
              <Typography variant="h5">Search for an employee:</Typography>
              <TextField
                id="search-bar"
                label="Search"
                variant="outlined"
                value={filterUser}
                onChange={(e) => onChangeHandler(e.target.value)}
              />
              <Stack
                direction={"row"}
                flexWrap={"wrap"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                height={"200px"}
                sx={{ overflowY: "auto" }}
              >
                {renderAllEmployees()}
              </Stack>
            </Stack>
          </Stack>
          {managerList.length === 1 ? (
            <Button
              variant="contained"
              color="success"
              onClick={handleModalOpen}
            >
              Confirm this request
            </Button>
          ) : (
            <>
              <Typography>Please choose one Project Manager first!</Typography>
              <Button variant="outlined" disabled onClick={handleModalOpen}>
                Confirm this request
              </Button>
            </>
          )}

          <Modal
            open={openModal}
            onClose={handleModalClose}
            keepMounted
            sx={modalStyle}
          >
            <>
              <Typography variant="h4">
                This request will be confirmed and all the reviewers can start
                giving feedbacks.
              </Typography>
              <Stack
                direction={"row"}
                mt={3}
                spacing={2}
                sx={{ alignItems: "center", justifyContent: "center" }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleModalClose}
                >
                  No, let me check again
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleConfirm}
                >
                  Yes, confirm this request
                </Button>
              </Stack>
            </>
          </Modal>
        </Card>
      ) : (
        <Loading />
      )}
    </Stack>
  );
};

export default ConfirmRequest;
