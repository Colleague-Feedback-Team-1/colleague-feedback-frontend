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
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Employee, Request, UserContextProps } from "../types/types";
import EmployeeCard from "../components/EmployeeCard";
import ReviewerCard from "../components/ReviewerCard";
import UserContext from "../context/UserContext";
import { toast } from "react-toastify";

const modalStyle = {
  position: "absolute",
  top: "50vh",
  left: "30vw",
  width: "30%",
  height: "25%",
  backgroundColor: "#9b51e0",
  boxShadow: 24,
  p: 4,
  color: "white",
  textAlign: "center",
  borderRadius: "30px",
};

const ConfirmRequest = () => {
  const params = useParams();
  const [filterUser, setFilterUser] = useState("");
  const [requestData, setRequestData] = useState<Request | null>();
  const [employeeList, setEmployeeList] = useState<Employee[] | null>([]);
  const [managerList, setManagerList] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const { user } = useContext<UserContextProps>(UserContext);
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
        console.log(res.data);
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
      axios
        .patch(
          `http://localhost:4500/api/review-requests/update-manager/${params.requestId}`,
          confirmBody
        )
        .then((res) => {
          console.log(res);
          setOpenModal(false);
          toast.success("Confirm request successfully");
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
            backgroundColor: "#ffdbeb",
            minHeight: "75vh",
          }}
        >
          <Typography variant="h3" pb={"50px"}>
            CONFIRMING REQUEST #
            {`${requestData!._id.slice(0, 5)}...${requestData!._id.slice(-3)}`}
          </Typography>
          <Stack direction={"row"} paddingBottom={"50px"} spacing={10}>
            <Stack flexGrow={1}>
              <Typography variant="h4">Reviewee:</Typography>
              <EmployeeCard {...requestData!} />
            </Stack>
            <Stack flexGrow={4}>
              <Typography variant="h4">Reviewers:</Typography>
              <Stack direction={"row"} flexWrap={"wrap"}>
                {requestData!.reviewers.map((reviewer) => {
                  return <ReviewerCard {...reviewer} />;
                })}
              </Stack>
            </Stack>
          </Stack>

          <Stack paddingBottom={"50px"} direction={"row"}>
            <Stack flexGrow={1} width={"40vw"}>
              <Typography variant="h4">
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
              <Typography variant="h4">Search for an employee:</Typography>
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
              <Typography variant="h2">Are you sure?</Typography>
              <Stack
                direction={"row"}
                mt={3}
                spacing={2}
                sx={{ alignItems: "center", justifyContent: "center" }}
              >
                <Button
                  variant="contained"
                  color="error"
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
