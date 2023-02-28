import React from "react";
import { makeStyles } from "@mui/styles";
import { FormControl, InputLabel, Select } from "@mui/material";

interface CustomSelectBoxProps {
  label: string;
  value: string | number;
  onChange: (event: any) => void;
  children: React.ReactNode;
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    "& label.Mui-focused": {
      color: "#02AABD",
    },
    "& label": {
      fontSize: 14,
      marginTop: 4,
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#02AABD",
      },
    },
  },
}));

const CustomSelectBox: React.FC<CustomSelectBoxProps> = ({
  label,
  value,
  onChange,
  children,
}) => {
  const classes = useStyles();

  return (
    <FormControl fullWidth variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={value}
        onChange={onChange}
        label={label}
      >
        {children}
      </Select>
    </FormControl>
  );
};

export default CustomSelectBox;
