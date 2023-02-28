import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import uniqueRandom from "unique-random";
import CustomSnackbar from "../components/CustomComponent/CustomSnackbar";

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}
const tableData1 = [
  { "AT/AF": "34" },
  { "VT (>4 beats)": "29" },
  { "AT/AF(Monitor)": "43.3" },
  { "Fast A&V": "0" },
  {
    "VT (133-200 bpm)": "60",
  },
  {
    "VT-NS (>4 beats, >200 bpm)": "56",
  },
  {
    "High Rate-NS": "93",
  },
];

const tableData2 = [
  {
    "SVT: VT/VF Rx Withheld": "0",
  },
  {
    "V. Oversensing-TWave Rx Withheld": "61.8",
  },
  {
    "V. Oversensing-Noise Rx Withheld": "52",
  },
  { "AT/AF": "98" },
  { "VT (>4 beats)": "34.16" },
  { "AT/AF(Monitor)": "39" },
  { "Fast A&V": "0" },
];

const tableData3 = [
  { "AT/AF": "65" },
  { "VT (>4 beats)": "12.16" },
  { "AT/AF(Monitor)": "54" },
  { "Fast A&V": "40" },
];

const randomData = [
  {
    pdfUrl:
      "https://tf-dev-discovery-tool-teqfocus-internal-bucket.s3.amazonaws.com/rt/5_MDT_PPM_redacted.pdf",
    tableData: tableData1,
  },
  {
    pdfUrl:
      "https://tf-dev-discovery-tool-teqfocus-internal-bucket.s3.amazonaws.com/rt/1_MDT_PPM_redacted.pdf",
    tableData: tableData2,
  },
  {
    pdfUrl:
      "https://tf-dev-discovery-tool-teqfocus-internal-bucket.s3.amazonaws.com/rt/3_MDT_ICD_redacted.pdf",
    tableData: tableData3,
  },
];

const random = uniqueRandom(0, randomData.length - 1);

const randomSelection = randomData[random()];
const docs = [
  {
    uri: randomSelection.pdfUrl,
  },
];

const ImagePreview = () => {
  const [tableData, setTableData] = useState(
    randomSelection.tableData.map((data) => ({
      key: Object.keys(data)[0],
      value: Object.values(data)[0],
      id: Math.random().toString(36),
    }))
  );

  console.log(randomSelection);

  const [loader, setLoader] = useState(false);
  const [snackbar, setSnackBar] = useState(false);

  const handleUpload = () => {
    setLoader(true);
    console.log("PDF data:", tableData);
    setTimeout(() => {
      setLoader(false);
      setSnackBar(true);
    }, 2000);
  };

  const handleCellEditCommit = (params: any) => {
    const { id, field, value } = params;
    const updatedRows: any = tableData.map((row: any) => {
      if (row.id === id) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setTableData(updatedRows);
  };

  return (
    <Grid container sx={{ border: "1px solid grey" }}>
      <Grid item sm={12} md={6}>
        <DocViewer
          documents={docs}
          pluginRenderers={DocViewerRenderers}
          style={{ borderRadius: 7 }}
          config={{
            header: {
              overrideComponent: MyHeader,
            },
          }}
        />
      </Grid>
      <Grid
        item
        sm={12}
        md={6}
        sx={{
          height: "130vh",
          background: "white",
          borderLeft: "1px solid grey",
        }}
      >
        <DataGrid
          rows={tableData}
          columns={columns}
          pagination
          pageSize={9}
          rowsPerPageOptions={[10]}
          autoHeight
          disableExtendRowFullWidth={false}
          onCellEditCommit={handleCellEditCommit}
          components={{
            Pagination: CustomPagination,
          }}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "Mui-even" : "Mui-odd"
          }
          hideFooter
          sx={{
            width: "auto",
            textAlign: "center",
            "& .MuiDataGrid-root": {
              width: "100%",
            },
            "& .Mui-even": {
              background: "#FFFFFF",
              color: "grey",
            },
            "& .Mui-odd": {
              background: "#F2F4F4",
              color: "grey",
            },
            "& .MuiDataGrid-columnHeaders": {
              background: "linear-gradient(150deg,#f0f0f0,white)",
              color: "#01baae",
              fontWeight: "bold",
              fontSize: 15,
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              background: "#00cdac",
            },
            "&.MuiDataGrid-root .MuiDataGrid-row": {
              borderRadius: "2px",
              marginTop: "2px",
            },
            "& .MuiDataGrid-footerContainer": {
              background: "#F0F9F9",
            },
          }}
        />
        <Button
          variant="contained"
          sx={{
            background: "linear-gradient(#02aab0,#00cdac)",
            color: "#FFFFFF",
            width: 120,
            fontSize: 16,
            fontWeight: "bold",
            float: "right",
            mt: 3,
            mr: 2,
            height: 40,
          }}
          onClick={handleUpload}
        >
          {loader ? (
            <CircularProgress
              style={{ height: 23, width: 23, color: "white" }}
            />
          ) : (
            "Update"
          )}
        </Button>
      </Grid>
      <CustomSnackbar
        open={snackbar}
        severity="success"
        message="Data updated successfully!"
      />
    </Grid>
  );
};

const columns = [
  {
    field: "key",
    headerName: "Keys",
    flex: 1,
    minWidth: 190,
  },
  {
    field: "value",
    headerName: "Values",
    flex: 1,
    minWidth: 190,
    editable: true,
    sortable: false,
  },
];

const MyHeader = (state: any, previousDocument: any, nextDocument: any) => {
  if (!state.currentDocument || state.config?.header?.disableFileName) {
    return null;
  }

  return (
    <div
      style={{
        background: "white",
        fontSize: 15,
        height: 0,
        color: "white",
        padding: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      {" "}
      <div style={{ marginTop: 18, width: 20, whiteSpace: "nowrap" }}></div>
    </div>
  );
};

export default ImagePreview;
