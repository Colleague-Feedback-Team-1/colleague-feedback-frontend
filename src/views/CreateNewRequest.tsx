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
  const [requestData, setRequestData] = useState<Request | null>();
  const [employeeList, setEmployeeList] = useState<Employee[] | null>([]);
  const [revieweeList, setRevieweeList] = useState<Employee | null>();
  const [managerList, setManagerList] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const { user } = useContext<UserContextProps>(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4500/api/employees/${user?._id}`)
      .then((res) => {
        console.log(res.data)
        setRevieweeList(res.data);
        setIsLoading(false)
      });
  }, []);
console.log(revieweeList)
  // open and close the modal
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  // handle send
  const handleConfirm = () => {
   
  };

  // handle search bar
  const onChangeHandler = (value: string) => {
    setFilterUser(value);
  };

  // add reviewers

  // remove reviewer

  //render the list of all employees with filter from searchbar
  /* const renderAllEmployees = () => {
    if (filterUser === "") {
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
  }; */

  function isInArray(targetObject: any, objectArray: any) {
    for (let i = 0; i < objectArray.length; i++) {
      if (JSON.stringify(targetObject) === JSON.stringify(objectArray[i])) {
        return true;
      }
    }
    return false;
  }

  /* const renderCardAction = (prop: Employee) => {
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
      <Card sx={{ width: "250px", height: "70px", margin: "5px" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "green" }}>
              {prop.displayName.slice(0, 1)}
            </Avatar>
          }
          title={prop.displayName}
          subheader={`${prop.mail}`}
          action={renderCardAction({ ...prop })}
        />
      </Card>
    );
  }; */

  return (
    <Stack sx={{ textAlign: "left" }}>
      {isLoading === false ? (
        <Card
          sx={{
            padding: "20px",
            backgroundColor: "#00d084",
            minHeight: "75vh",
          }}
        >
          <Typography variant="h3" pb={"50px"}>
            CREATE NEW REQUEST
          </Typography>
          <Stack flexGrow={1}>
            <Typography variant="h4">Reviewee:</Typography>
             {<EmployeeCard employeeid={revieweeList!._id} employeeEmail={revieweeList!.mail} employeeName={revieweeList!.displayName} />
            }
          </Stack>
          <Stack flexGrow={4}>
            <Typography variant="h4">Reviewers:</Typography>
            <Stack direction={"row"}>
              {/*     {requestData!.reviewers.map((reviewer) => {
                  return <ReviewerCard {...reviewer} />;
                })} */}
            </Stack>
          </Stack>

          <Stack sx={{ width: "60vw" }}>
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
              overflow={"scroll"}
            >
              {/*                 {renderAllEmployees()}
               */}{" "}
            </Stack>
          </Stack>
          <Button variant="contained"  onClick={handleModalOpen}>
            Confirm this request
          </Button>

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

export default CreateNewRequest;
