import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { Alert } from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";
import ModifyEventMessages from "../ModifyEventMessages";

interface DeleteEventModalProps {
  isLoading: boolean;
  isDeleted: boolean;
  error: string | null;
  onDeleteHandler: () => void;
  onClose: () => void;
}

const DeleteEventModal: React.FC<DeleteEventModalProps> = ({
  isLoading,
  isDeleted,
  error,
  onDeleteHandler,
  onClose,
}) => {
  const style = {
    position: "absolute" as "absolute",

    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 4,
    padding: 3,
  };

  return (
    <>
      <Box sx={style}>
        {isLoading && (
          <Box
            role="loading-spinner"
            sx={{
              display: "flex",
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {!isLoading && !isDeleted && !error && (
          <>
            <Typography
              id="modal-modal-title"
              fontSize={25}
              color="#07213a"
              fontWeight={400}
            >
              Are you sure you want to delete this event?
            </Typography>
            <div className={styles.deleteEventButtonContainer}>
              <Button
                variant="contained"
                color="error"
                onClick={onDeleteHandler}
              >
                Delete
              </Button>
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </>
        )}
      </Box>
    </>
  );
};

export default DeleteEventModal;
