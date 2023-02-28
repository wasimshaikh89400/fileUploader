import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { fetchUploadedFiles } from "../pages/api/fileupload";
import Image from "next/image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Link from "next/link";

export default function Orders() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    fetchUploadedFiles()
      .then((response) => {
        //   console.log(response.data);
        setRows(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
  }
  const convertBlobToDataURL = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handlePDFdownload = (file: any) => {
    const byteCharacters = atob(file.data);
    // console.log("PDF download", byteCharacters);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: file.contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `myfile${new Date().getTime()}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <React.Fragment>
      <Title>Recent Files</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">File(Image)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => {
            let type = row.file?.contentType?.includes("image/")
              ? "IMAGE"
              : "FILE";
            let ImageSrc = `data:${row.file?.contentType};base64,${row.file.data}`;
            return (
              <TableRow key={row._id}>
                <TableCell>{row.createdAt}</TableCell>
                <TableCell>{row.fileName?.split(".")[0]}</TableCell>
                <TableCell align="right">
                  {type === "IMAGE" ? (
                    <Image
                      alt={row.fileName}
                      width={100}
                      height={100}
                      src={ImageSrc || ""}
                    />
                  ) : (
                    <>
                      <Link
                        style={{
                          textDecoration: "underline",
                          textDecorationColor: "blue",
                          color: "blue",
                        }}
                        href="#"
                        onClick={() => handlePDFdownload(row.file)}
                      >
                        <PictureAsPdfIcon sx={{ width: 24, height: 24 }} />{" "}
                        {row.fileName}
                      </Link>
                    </>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
