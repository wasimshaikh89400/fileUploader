import React from "react";
import Box from "@mui/material/Box";
const IconBundler = ({ icon }: any) => {
  return (
    <Box
      style={{
        width: 40,
        height: 40,
        padding: 5,
        borderRadius: "50%",
        background: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {icon}
    </Box>
  );
};

export default IconBundler;
