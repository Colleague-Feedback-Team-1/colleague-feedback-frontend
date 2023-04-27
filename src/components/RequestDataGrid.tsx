import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Request, Reviewer } from "../types/types";
import { Stack, Box, Typography, Button, Modal } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Check } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";


const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "20%",
  backgroundColor: "#9b51e0",
  boxShadow: 24,
  p: 4,
  color: "white",
  textAlign: "center",
  
};


const RequestDataGrid = () => {
  const [adminRequestList, setAdminRequestList] = useState<Request[] | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [deletingRequestId, setDeletingRequestId] = useState<string>("");
  const navigate = useNavigate();

  console.log("deleting request ", deletingRequestId);

  
  useEffect(() => {
    axios.get(`http://localhost:4500/api/review-requests/`).then((res) => {
      setAdminRequestList(res.data);
      setIsLoading(false);
    });
  }, []);

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

  // handle the modal
  const handleModalClose = () => setOpenModal(false);

  const handleDeleteModal = (requestId: string) => {
    setOpenModal(true);
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

  // Define the columns
  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "Request ID",
      width: 100,
      valueGetter: (params: GridValueGetterParams) => {
        return `...${params.row._id.slice(-6)}`;
      },
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
      field: "dateRequested",
      headerName: "Due Date",
      width: 120,
      renderCell: (params) => {
        const date = new Date(params.row.dateRequested) 
        return date.toLocaleDateString();
      }
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
      field: "feedbackReceived",
      headerName: "Feedback Received",
      width: 120,
      valueGetter: (params: GridValueGetterParams) => {
        const feedbackSubmitted = params.row.reviewers.filter(
          (reviewer: any) => reviewer.feedbackSubmitted
        );
        return `${feedbackSubmitted.length}/${params.row.reviewers.length}`;
      },
    },
    {
      field: "View",
      headerName: "Actions",
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <>
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
        </>
      ),
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
      <Modal
        open={openModal}
        onClose={handleModalClose}
        keepMounted
        sx={modalStyle}
      >
        <>
          <Typography variant="h3">Are you sure to delete request "{`...${deletingRequestId.slice(-7)}`}"?</Typography>
          <Typography variant="body1">This item will be deleted immediately. You can't undo this action. </Typography>
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
    </Stack>
  );
};

export default RequestDataGrid;
