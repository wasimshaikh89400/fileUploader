import Dropzone from "react-dropzone";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EmptyStateSVG from "../components/EmptyStateSVG/EmptyStateSVG";
import CustomSelect from "../components/CustomComponent/CustomSelectBox";
import CustomTextField from "../components/CustomComponent/CustomTextField";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import CustomSnackbar from "../components/CustomComponent/CustomSnackbar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const IndustryOptions = [
  {
    value: "information_technology_(it)",
    label: "Information technology (IT)",
  },
  { value: "energy", label: "Energy" },
  { value: "financial_services", label: "Financial services" },
  { value: "food_and_beverage", label: "Food and beverage" },
  { value: "transportation", label: "Transportation" },
  { value: "retail", label: "Retail" },
  { value: "construction", label: "Construction" },
  { value: "media_and_entertainment", label: "Media and entertainment" },
  { value: "education", label: "Education" },
];

const BusinessProcessOptions = [
  { value: "sales_management", label: "Sales management" },
  { value: "marketing_automation", label: "Marketing automation" },
  { value: "customer_support", label: "Customer support" },
  { value: "inventory_management", label: "Inventory management" },
  { value: "hr_management", label: "HR management" },
  { value: "project_management", label: "Project management" },
  { value: "supply_chain_management", label: "Supply chain management" },
  { value: "financial_management", label: "Financial management" },
];

const styles = {
  root: {
    border: "1px dashed #02AABD",
    borderRadius: 2,
    padding: 10,
    backgroundColor: "#F7F7F7",
    height: "50vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  cloudIcon: {
    width: 40,
    height: 40,
    color: "#02AABD",
  },
  button: {
    marginBlock: "20px 30px",
    borderColor: "#02AABD",
    color: "#02AABD",
    "&:hover": {
      borderColor: "#02AABD",
    },
  },
  selectBox: {
    borderColor: "#02AABD",
    "&:focus": {
      backgroundColor: "#ffddec",
      borderColor: "brown",
    },
    "&:before": {
      borderColor: "red",
    },
    "&:after": {
      borderColor: "green",
    },
    "&:not(.Mui-disabled):hover::before": {
      borderColor: "white",
    },
  },
  selectedFile: {
    display: "flex",
    width: "100%",
    padding: 2,
    border: "1px dashed #02AABD",
    borderRadius: 2,
    marginBlock: 2,
    position: "relative",
    alignItems: "center",
    paddingLeft: 10,
  },
  sizeText: {
    color: "#00707C",
    fontWeight: 600,
    fontSize: "14px",
  },
};
const Uploader = () => {
  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  const [uploadData, setUploadData] = useState<any>({
    industry: "",
    businessProcess: "",
    customerId: "",
  });
  const [loader, setLoader] = useState<boolean>(false);
  const [showSnackBar, setShowSnackBar] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const handleFileSelect = (files: any) => {
    setSelectedFiles((prevFiles: any) => [...files, ...prevFiles]);
  };
  const [index, setIndex] = useState<number>(0);

  const handleDeleteSelectedFiles = () => {
    setSelectedFiles((prevFile: any) =>
      prevFile.filter((_file: any, id: number) => index !== id)
    );
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpload = () => {
    if (
      Object.values(uploadData).every((ele) => ele) &&
      selectedFiles.length > 0
    ) {
      setLoader(true);
      axios
        .post(
          "https://70ab0747-b3aa-4c84-a64f-279d7155ea86.mock.pstmn.io/storeFile"
        )
        .then(() => {
          setLoader(false);
          setShowSnackBar(true);
          setTimeout(() => {
            setShowSnackBar(false);
          }, 3000);
          setUploadData({
            industry: "",
            businessProcess: "",
            customerId: "",
          });
          setSelectedFiles([]);
        });
    } else setError(true);
    setTimeout(() => {
      setError(false);
    }, 3000);
  };
  return (
    <Box px={8}>
      <Grid style={{ marginBlock: 20 }} container spacing={4}>
        <Grid item sm={4}>
          <CustomSelect
            value={uploadData.industry}
            onChange={(e) =>
              setUploadData({ ...uploadData, industry: e.target.value })
            }
            label="Industries"
          >
            {IndustryOptions.map((option, index: number) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </CustomSelect>
        </Grid>
        <Grid item sm={4}>
          <CustomSelect
            value={uploadData.businessProcess}
            onChange={(e) =>
              setUploadData({ ...uploadData, businessProcess: e.target.value })
            }
            label="Business Process"
          >
            {BusinessProcessOptions.map((option, index: number) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </CustomSelect>
        </Grid>
        <Grid item sm={4}>
          <CustomTextField
            value={uploadData.customerId}
            label="Customer Id"
            onChange={(e) =>
              setUploadData({ ...uploadData, customerId: e.target.value })
            }
          />
        </Grid>
      </Grid>
      <Grid style={{ marginTop: 70 }} container>
        <Grid item sm={6}>
          <Dropzone onDrop={handleFileSelect}>
            {({ getRootProps, getInputProps }) => (
              <Box sx={styles.root} {...getRootProps()}>
                <input {...getInputProps()} />
                <CloudUploadIcon style={styles.cloudIcon} />
                <Typography sx={{ color: "grey", mt: 2 }}>
                  Drag drop some files here
                </Typography>
                <Button sx={styles.button} variant="outlined">
                  Choose file
                </Button>
                <Typography>*Accepted format - PDF, JPEG only</Typography>
              </Box>
            )}
          </Dropzone>
        </Grid>
        <Grid style={{ paddingLeft: 60 }} item sm={6}>
          <Typography sx={{ color: "#02AABD", fontSize: 18, fontWeight: 600 }}>
            Attach document
          </Typography>
          <Typography
            sx={{ color: "grey", fontSize: 14, fontWeight: 500, mt: 1 }}
          >
            You can upload the documents for the selected customer ID
          </Typography>

          <Box>
            {selectedFiles.length > 0 ? (
              <Box>
                {selectedFiles.map((file: any, index: number) => (
                  <Grid container sx={styles.selectedFile} key={file.name}>
                    <Grid item sm={5}>
                      <Typography sx={{ color: "grey" }}>
                        {file.name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography sx={styles.sizeText}>
                        {file.size / 1000} KB
                      </Typography>
                    </Grid>
                    <Box
                      sx={{
                        position: "absolute",
                        right: 40,
                        top: 17,
                        cursor: "pointer",
                        color: "#02AABD",
                      }}
                      onClick={() => {
                        setOpen(true);
                        setIndex(index);
                      }}
                    >
                      <DeleteOutlineIcon />
                    </Box>
                  </Grid>
                ))}
                <Button
                  variant="contained"
                  sx={{
                    background: "linear-gradient(#02aab0,#00cdac)",
                    color: "#FFFFFF",
                    width: 120,
                    fontSize: 16,
                    fontWeight: "bold",
                    float: "right",
                    height: 46,
                  }}
                  onClick={handleUpload}
                >
                  {loader ? (
                    <CircularProgress
                      style={{ height: 23, width: 23, color: "white" }}
                    />
                  ) : (
                    "Upload"
                  )}
                </Button>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  alignItems: "center",
                  mt: 6,
                }}
              >
                <EmptyStateSVG />
                <Typography sx={{ color: "grey" }}>
                  You have nothing selected.
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
      <CustomSnackbar
        open={showSnackBar || error}
        severity={showSnackBar ? "success" : "warning"}
        message={
          showSnackBar
            ? "File uploaded successfully!"
            : "Please fill in all the mandatory fields before submitting the files"
        }
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm File Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the selected file(s)? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteSelectedFiles}>Confirm</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Uploader;
