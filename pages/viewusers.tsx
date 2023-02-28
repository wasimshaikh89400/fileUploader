import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import ReplyIcon from "@mui/icons-material/Reply";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
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

const CustomPaginationGrid = () => {
  const router = useRouter();
  const [tableData, setTableData] = useState([]);

  const getTableData = () => {
    axios
      .get("https://mocki.io/v1/aaa399cd-ef29-4f9a-8326-9fa6a8b1d0e3")
      .then(({ data: { data } }) => {
        setTableData(data);
      });
  };

  useEffect(() => {
    getTableData();
  }, []);

  const columns = [
    {
      field: "id",
      hide: true,
      flex: 2,
    },
    {
      field: "customerId",
      headerName: "Customer Id",
      flex: 2,
      minWidth: 90,
      editable: true,
    },
    {
      field: "fileName",
      headerName: "File Name",
      flex: 2,
      minWidth: 120,
    },
    {
      field: "industry",
      headerName: "Industry",
      flex: 2,
      minWidth: 150,
    },
    {
      field: "businessProcess",
      headerName: "Business Process",
      flex: 2,
      minWidth: 150,
    },
    {
      field: "view",
      headerName: "Extract",
      type: "string",
      flex: 1,
      minWidth: 130,
      renderCell: (params: any) => {
        return (
          <ReplyIcon
            onClick={() => {
              localStorage.setItem("file", params.row);
              router.push("/fileExtractor");
            }}
            style={{
              transform: "scale(-1, 1)",
              color: "grey",
              cursor: "pointer",
            }}
          />
        );
      },
    },
  ];
  return (
    <Box sx={{ width: "100%", display: "flex" }}>
      <DataGrid
        rows={tableData.map((ele: any) => {
          return { ...ele, id: Math.random() };
        })}
        columns={columns}
        pagination
        pageSize={9}
        rowsPerPageOptions={[10]}
        autoHeight
        disableExtendRowFullWidth={false}
        onStateChange={(params: any) => console.log(params)}
        components={{
          Pagination: CustomPagination,
        }}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "Mui-even" : "Mui-odd"
        }
        sx={{
          width: "auto",
          textAlign: "center",
          border: "1px solid #01baae",
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
    </Box>
  );
};

export default CustomPaginationGrid;
