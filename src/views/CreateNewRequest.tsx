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
  Box,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Loading from "../components/Loading";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Employee,
  UserContextProps,
  RequestWithoutId,
} from "../types/types";
import EmployeeCard from "../components/EmployeeCard";
import UserContext from "../context/UserContext";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "react-datepicker/dist/react-datepicker.css";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "25%",
  height: "25%",
  backgroundColor: "#9b51e0",
  boxShadow: 24,
  p: 4,
  color: "white",
  textAlign: "center",
  borderRadius: "30px",
};

const CreateNewRequest = () => {
  const [filterUser, setFilterUser] = useState("");
  const [employeeList, setEmployeeList] = useState<Employee[] | null>([]);
  const [revieweeList, setRevieweeList] = useState<Employee | null>();
  const [reviewerList, setReviewerList] = useState<Employee[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const { user } = useContext<UserContextProps>(UserContext);
  const navigate = useNavigate();
  const [dueDate, setDueDate] = useState<string | undefined>("");

  useEffect(() => {
    axios
      .get("http://localhost:4500/api/employees/all-employees")
      .then((res) => {
        setEmployeeList(res.data);
      });
    axios
      .get(`http://localhost:4500/api/employees/${user?._id}`)
      .then((res) => {
        console.log(res.data);
        setRevieweeList(res.data);
        setIsLoading(false);
      });
  }, []);

  const handleChangeTimePicker = (date: any) => {
    const formattedDate = timeFormatter(date.$d);
    console.log(formattedDate);
    setDueDate(formattedDate);
  };

  // convert the time from the time converter to the format that MongoDB accept
  const timeFormatter = (date: any) => {
    const formattedDate = date
      .toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, ".");
    return formattedDate;
  };
  // open and close the modal
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  // handle search bar
  const onChangeHandler = (value: string) => {
    setFilterUser(value);
  };

  // add reviewers
  const addReviewer = (reviewer: Employee) => {
    if (reviewerList!.length < 5) {
      // limit the number of reviewers to 5
      const newReviewerArray = [...reviewerList!];
      newReviewerArray.push(reviewer);
      setReviewerList(newReviewerArray);
    } else {
      console.log("Maximum number of reviewers reached");
    }
  };

  // remove reviewer
  const removeReviewer = (reviewer: Employee) => {
    let newReviewerArray = reviewerList!.filter(
      (user) => user._id !== reviewer._id
    );
    setReviewerList(newReviewerArray);
  };

  //render the list of all employees with filter from searchbar
  const renderAllEmployees = () => {
    if (filterUser === "") {
      return 
    } else {
      return employeeList!
        .filter((employee: Employee) => employee._id !== user?._id)
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
  for (const object of objectArray) {
    if (JSON.stringify(targetObject) === JSON.stringify(object)) {
      return true;
    }
  }
  return false;
}

  const renderCardAction = (prop: Employee) => {
    if (isInArray(prop, reviewerList)) {
      return (
        <IconButton onClick={() => removeReviewer({ ...prop })}>
          <CheckCircleIcon color="success" />
        </IconButton>
      );
    } else {
      return (
        <IconButton onClick={() => addReviewer({ ...prop })}>
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

  // reviewer is slightly different than user card: only have one action removeReviewer
  const renderReviewerCard = (prop: Employee) => {
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
          action={
            <IconButton onClick={() => removeReviewer({ ...prop })}>
              <CheckCircleIcon color="success" />
            </IconButton>
          }
        />
      </Card>
    );
  };

  // render the action at below, depend on the form details
  const renderFormAction = () => {
    if (reviewerList?.length === 5 && dueDate) {
      return (
        <>
          <Typography>
            After you create this request, it needs to be confirmed by HR before
            everyone can give feedbacks
          </Typography>
          <Button variant="contained" onClick={handleModalOpen}>
            Create this request
          </Button>
        </>
      );
    }
    else {
      return (
        <>
          <Typography>
            Please choose a due date and 5 reviewers for this request!
          </Typography>
          <Button variant="outlined" disabled>
            Create this request
          </Button>
        </>
      );
    }
  };

  // create new request
  const updatedReviewerList = reviewerList?.map((reviewer) => {
    return {
      reviewerid: reviewer._id,
      reviewerName: reviewer.displayName,
      reviewerEmail: reviewer.mail,
      role: reviewer.description,
      feedbackSubmitted: false,
    };
  });
  const createRequest = () => {
    let request: RequestWithoutId = {
      confirmedByHR: false,
      selfReview: false,
      employeeid: revieweeList!._id,
      employeeEmail: revieweeList!.mail,
      employeeName: revieweeList!.displayName,
      assignedManagerid: "",
      assignedManagerName: "",
      reviewers: updatedReviewerList!,
      dateRequested: dueDate,
    };

    console.log(JSON.stringify(request));
    axios
      .post("http://localhost:4500/api/review-requests/insert-request", request)
      .then((res) => {
        console.log(res);
        handleModalClose();
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Stack sx={{ textAlign: "left" }}>
      {isLoading === false ? (
        <Card
          sx={{
            padding: "20px",
            minHeight: "75vh",
          }}
        >
          <Typography variant="h3" pb={"50px"}>
            CREATE NEW REQUEST
          </Typography>
          <Stack
            flexGrow={1}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <Stack>
              <Typography variant="h4">Reviewee:</Typography>
              {
                <EmployeeCard
                  employeeid={revieweeList!._id}
                  employeeEmail={revieweeList!.mail}
                  employeeName={revieweeList!.displayName}
                />
              }
            </Stack>
            <Stack flexGrow={3}>
              <Typography variant="h4">Due date:</Typography>
              <DatePicker
                value={dueDate}
                onChange={(e: any) => handleChangeTimePicker(e)}
                sx={{ width: "200px" }}
              />
            </Stack>
          </Stack>
          <Stack flexGrow={4}>
            <Typography variant="h4">
              Reviewers: ({reviewerList?.length}/5)
            </Typography>
            <Stack
              direction={"row"}
              flexWrap={"wrap"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              paddingBottom={"20px"}
            >
              {reviewerList!.length > 0 ? (
                reviewerList?.map((reviewer) => {
                  return renderReviewerCard(reviewer);
                })
              ) : (
                <Typography>Choose a reviewer below</Typography>
              )}
            </Stack>
          </Stack>

          <Stack>
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
              sx={{ overflowY: "scroll" }}
            >
              {renderAllEmployees()}
            </Stack>
          </Stack>
          <Box paddingY={"30px"}>{renderFormAction()}</Box>

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
                  onClick={createRequest}
                >
                  Yes, create this request
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

export default CreateNewRequest;
