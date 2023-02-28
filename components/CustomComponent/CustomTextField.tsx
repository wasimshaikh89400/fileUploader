import React from "react";
import TextField from "@mui/material/TextField";

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (e: any) => void;
  type?: string;
}
const CustomTextField = ({
  label,
  value,
  onChange,
  type = "text",
  ...rest
}: TextFieldProps) => {
  const styles = {
    root: {
      "& .MuiOutlinedInput-root": {
        mb: 3,
        "&:hover fieldset": {
          borderColor: "#02AABD",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#02AABD",
        },
      },
      "& .MuiInputLabel-root": {
        fontSize: 14,
        mt: 0.5,
        "&.Mui-focused": {
          borderColor: "#02AABD",
          color: "#02AABD",
        },
      },
    },
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      sx={styles.root}
      label={label}
      type={type}
      inputProps={{
        style: { borderColor: "#02AABD" },
      }}
      onChange={onChange}
      value={value}
      {...rest}
    />
  );
};

export default CustomTextField;
