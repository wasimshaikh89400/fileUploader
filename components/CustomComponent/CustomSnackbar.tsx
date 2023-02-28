import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useEffect, useState } from "react";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface CustomSnackbarProps {
  open: boolean;
  message: string;
  severity: "success" | "warning" | "error";
}

const CustomizedSnackbars = ({
  open = false,
  message = "Success",
  severity = "success",
}: CustomSnackbarProps) => {
  const [openS, setOpen] = useState<boolean>(false);
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    setOpen(open);
  }, [open]);

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={openS} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default CustomizedSnackbars;
