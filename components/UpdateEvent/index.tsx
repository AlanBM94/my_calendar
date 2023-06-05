import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { Alert } from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";

interface UpdateEventModalProps {
  isLoading: boolean;
  isUpdated: boolean;
  error: string | null;
  onUpdateHandler: () => void;
  onClose: () => void;
}

const UpdateEventModal: React.FC<UpdateEventModalProps> = ({
  isLoading,
  isUpdated,
  error,
  onUpdateHandler,
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
        {!isLoading && !isUpdated && !error && (
          <>
            <Typography
              id="modal-modal-title"
              fontSize={25}
              color="#07213a"
              fontWeight={400}
            >
              Are you sure you want to update this event?
            </Typography>
            <div className={styles.updateEventButtonContainer}>
              <Button
                variant="contained"
                color="primary"
                onClick={onUpdateHandler}
              >
                Update
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

export default UpdateEventModal;
