import { Select, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CssTextField = styled(TextField)(({ theme }) => ({
  "& label.Mui-focused": {
    color: "#CC7E00",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#CC7E00",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "border-TechStopBlue60",
      borderWidth: "2px",
    },
    "&:hover fieldset": {
      borderColor: "#CC7E00",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#CC7E00",
    },
  },
}));

export const CssSelect = styled(Select)(({ theme }) => ({
  "& label.Mui-focused": {
    color: "#CC7E00",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#CC7E00", // Кастомний колір бордера
      borderWidth: "2px", // Товщина бордера
    },
    "&:hover fieldset": {
      borderColor: "#CC7E00", // Кастомний колір бордера при ховері
      borderWidth: "2px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#CC7E00", // Дефолтний колір бордера при фокусі
      borderWidth: "2px",
    },
  },
}));
