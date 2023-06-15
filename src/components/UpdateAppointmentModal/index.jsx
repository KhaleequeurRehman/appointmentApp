import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const CustomModalHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const CustomModal = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const UpdateAppointmentModal = ({
  title,
  open,
  handleClose,
  children,
  actionBtnsText=['Close','Update'],
  actionBtn1OnClickHandler,
  actionBtn2OnClickHandler,
  disableActionBtn2WhileLoading=false,
  titleSx,
  ...restProps
}) => {
  return (
    <>
      <CustomModal
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        {...restProps}
      >
        <>
          <CustomModalHeader>
            <IconButton onClick={handleClose}>
              <CloseIcon sx={{ color: "#E75C62" }} />
            </IconButton>
            <Typography
              sx={{ fontSize: "20px", fontWeight: "600", mx: "auto", ...titleSx }}
            >
              {title && title}
            </Typography>
          </CustomModalHeader>
        </> 
        <DialogContent>{children && children}</DialogContent>
        <DialogActions sx={{ justifyContent: "center", mt: "10px" }}>
              <Button
                variant="contained"
                onClick={
                  ()=> { 
                     handleClose();
                     actionBtn1OnClickHandler && actionBtn1OnClickHandler();
                  }
                }
              >
                {actionBtnsText[0] && actionBtnsText[0]}
              </Button>

              <Button
                disabled={disableActionBtn2WhileLoading}
                variant="contained"
                onClick={
                  ()=> { 
                     handleClose();
                     actionBtn2OnClickHandler && actionBtn2OnClickHandler();
                  }
                }
              >
                {actionBtnsText[1] && actionBtnsText[1]}
              </Button>
            </DialogActions>
      </CustomModal>
    </>
  );
};

export default UpdateAppointmentModal;
