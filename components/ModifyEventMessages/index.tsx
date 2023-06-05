import { Alert } from "@mui/material";
import React from "react";

interface ModifyEventProps {
  isLoading: boolean;
  isModified: boolean;
  error: string | null;
  successMessage: string | null;
}

const ModifyEventMessages: React.FC<ModifyEventProps> = ({
  isLoading,
  isModified,
  error,
  successMessage,
}) => {
  return (
    <>
      {!isLoading && error && (
        <Alert
          severity="error"
          style={{
            marginBottom: "10px",
          }}
        >
          {error}
        </Alert>
      )}
      {!isLoading && isModified && (
        <Alert
          severity="success"
          style={{
            marginBottom: "10px",
          }}
        >
          {successMessage}
        </Alert>
      )}
    </>
  );
};

export default ModifyEventMessages;
