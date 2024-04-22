import React from "react";
import { Modal, Button, Typography, Box } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ConfirmationModal = ({ open, onClose, modal, handleSubmit }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        <Typography className="text-center" variant="h5">
          Подтверждение действия
        </Typography>
        <p className="text-center">{modal}</p>
        <div className="flex justify-around mt-4">
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Да
          </Button>
          <Button variant="contained" color="error" onClick={onClose}>
            Нет
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
