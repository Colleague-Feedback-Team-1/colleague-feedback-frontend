import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Receiver, Request, Reviewer } from "../types/types";
import { Stack, Box, Typography, Button, Modal } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Check, Margin } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const modalStyle = {
  position: "fixed",
  backgroundColor: "#9b51e0",
  boxShadow: 24,
  p: 4,
  color: "white",
  textAlign: "center",
  borderRadius: "30px",
  alignItem: "center",
  margin:"80px auto auto auto",
  width:"60%",
  height:"min-content"
};

const RequestDataGrid = () => {
  const [adminRequestList, setAdminRequestList] = useState<Request[] | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openRemindModal, setOpenRemindModal] = useState(false);
  const [deletingRequestId, setDeletingRequestId] = useState<string>("");
  const [remindingRequestData, setRemindingRequestData] = useState<Request>();
  const [remindingReviewers, setRemindingReviewers] = useState<Receiver[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      axios.get(`http://localhost:4500/api/review-requests/`).then((res) => {
        setAdminRequestList(res.data);
        setIsLoading(false);
      });
    }, 700);
  }, []);

  // handle the modal
  const handleModalClose = () => {
    setOpenDeleteModal(false);
    setOpenRemindModal(false);
  };

  const handleDeleteModal = (requestId: string) => {
    setOpenDeleteModal(true);
    setDeletingRequestId(requestId);
  };

  // function to delete request after confirm with modal
  const deleteRequest = async (requestId: string) => {
    console.log("deleting request ", requestId);
    setTimeout(() => {
      axios
        .delete(
          `http://localhost:4500/api/review-requests/delete/${deletingRequestId}`
        )
        .then((res) => {
          console.log(res);
          handleModalClose();
          navigate("/");
        });
    }, 1000);
  };

  const booleanCellRenderer = (params: any) => {
    return params.value ? (
      <Check style={{ color: "green" }} />
    ) : (
      <CloseIcon style={{ color: "red" }} />
    );
  };

  // function for reminder
  const remind = async (requestID: string) => {
    let result = await axios.get(
      `http://localhost:4500/api/review-requests/by-requestid/${requestID}`
    );
    let remindingReviewers: Receiver[] = [];
    result.data.reviewers.forEach((reviewer: Reviewer) => {
      if (!reviewer.feedbackSubmitted) {
        remindingReviewers.push({
          receiverid: reviewer.reviewerid,
          receiverName: reviewer.reviewerName,
        });
        
      }
    });
      if(!result.data.selfReview) {
        remindingReviewers.push({
          receiverid: result.data.employeeid,
          receiverName: result.data.employeeName,
        })
      }
    
    setRemindingReviewers(remindingReviewers);
    setOpenRemindModal(true);
  };

  // Define the columns
  const columns: GridColDef[] = [
    {
      field: "View",
      headerName: "Actions",
      sortable: false,
      width: 320,
      renderCell: (params) => (
        <Stack direction={"row"} spacing={2}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => remind(params.row._id)}
          >
            Remind
          </Button>
          <Link
            to={`/requests/${params.row._id}`}
            style={{ textDecoration: "none", paddingRight: "13px" }}
          >
            <Button variant="contained">View</Button>
          </Link>

          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteModal(params.row._id)}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
    { field: "employeeName", headerName: "Reviewee", width: 120 },
    {
      field: "confirmedByHR",
      headerName: "Confirmed",
      width: 120,
      type: "boolean",
      renderCell: booleanCellRenderer,
    },
    {
      field: "selfReview",
      headerName: "Self Review",
      width: 120,
      type: "boolean",
      renderCell: booleanCellRenderer,
    },
    {
      field: "feedbackReceived",
      headerName: "Feedback",
      width: 100,
      valueGetter: (params: GridValueGetterParams) => {
        const feedbackSubmitted = params.row.reviewers.filter(
          (reviewer: any) => reviewer.feedbackSubmitted
        );
        return `${feedbackSubmitted.length}/${params.row.reviewers.length}`;
      },
    },
    {
      field: "assignedManagerName",
      headerName: "Manager",
      width: 100,
      renderCell: (params) => {
        return params.row.assignedManagerName.split(" ")[0];
      },
    },
    {
      field: "reviewers",
      headerName: "Reviewers",
      width: 300,
      valueGetter: (params: GridValueGetterParams) => {
        const allReviewerNames = params.row.reviewers
          .map((reviewer: Reviewer) => reviewer.reviewerName.split(" ")[0])
          .join(", ");
        return allReviewerNames;
      },
    },

    {
      field: "dateRequested",
      headerName: "Due Date",
      sortable: false,
      width: 120,
      renderCell: (params) => {
        const date = new Date(params.row.dateRequested).toLocaleString(
          "en-US",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        );
        return date;
      },
    },
    {
      field: "_id",
      headerName: "Request ID",
      width: 100,
      valueGetter: (params: GridValueGetterParams) => {
        return `...${params.row._id.slice(-6)}`;
      },
    },
  ];

  return (
    <Stack textAlign={"left"}>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <DataGrid
            columns={columns}
            rows={adminRequestList!}
            getRowId={(rows) => rows._id}
          />
        </div>
      )}
      {/* DELETE MODAL */}
      <Modal
        open={openDeleteModal}
        onClose={handleModalClose}
        keepMounted
        sx={modalStyle}
      >
        <>
          <Typography variant="h3">
            Are you sure to delete request "
            {`...${deletingRequestId.slice(-7)}`}"?
          </Typography>
          <Typography variant="body1">
            This item will be deleted immediately. You can't undo this action.{" "}
          </Typography>
          <Stack
            direction={"row"}
            mt={3}
            spacing={2}
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            <Button
              variant="contained"
              color="success"
              onClick={handleModalClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteRequest(deletingRequestId)}
            >
              Delete
            </Button>
          </Stack>
        </>
      </Modal>

      {/* REMINDER MODAL */}
      <Modal
        open={openRemindModal}
        onClose={handleModalClose}
        keepMounted
        sx={modalStyle}
      >
        <>
          <Stack spacing={3} >
            <Typography variant="h3">
              A reminder notification will be sent to:
            </Typography>
            {remindingReviewers.map((reviewer) => {
              return (
                <Typography variant="h5">▪ {reviewer.receiverName}</Typography>
              );
            })}
            <Typography variant="h3">Are you sure?</Typography>
          </Stack>

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
              Cancel
            </Button>
            <Button variant="contained" color="success">
              Send notification
            </Button>
          </Stack>
        </>
      </Modal>
    </Stack>
  );
};

export default RequestDataGrid;
