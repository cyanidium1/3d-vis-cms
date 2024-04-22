import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  FormControl
} from "@mui/material";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import { addItem } from "../redux/menuSlice";
import { useDispatch } from "react-redux";
import Alert from "@mui/material/Alert";
import ImageUploader from "./ImageUploader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const FormAddItem = ({ section }) => {
  const dispatch = useDispatch();
  const [isAlert, setIsAlert] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [promoPrice, setPromoPrice] = useState("");
  const [portionSize, setPortionSize] = useState("");
  const [photo, setPhoto] = useState("");
  const [availability, setAvailability] = useState("");

  // const [section, setSection] = useState("");

  useEffect(() => {
    if (isFormValid === false) {
      if (name || description || price || portionSize || photo || section) {
        setIsFormValid(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, description, price, photo, portionSize]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setPromoPrice("");
    setPortionSize("");
    setPhoto("");
    setAvailability("");
    // setSection("");
  };

  const handleSubmit = () => {
    if (!name || !description || !price || !portionSize || !section) {
      setIsFormValid(false);
      return;
    }

    const newItem = {
      id: nanoid(),
      name,
      description,
      price,
      promoPrice,
      portionSize,
      photo,
      availability,
    };

    console.log(newItem);
    dispatch(addItem({ newItem, section }));
    setIsAlert(true);

    setTimeout(() => {
      resetForm();
      handleClose();
      setIsAlert(false);
    }, 3000);
  };

  return (
    <div className="py-3 ">
      <Button sx={{ margin: "auto", display: "block" }} onClick={handleOpen}>
        <AddIcon />
        Добавить новый товар
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {!isFormValid && (
            <Alert severity="error">Заполните все обязательные поля</Alert>
          )}
          {!isAlert && (
            <div>
              <Typography align="center" variant="h5" gutterBottom>
                Добавить новый товар в секцию {section}
              </Typography>
              <FormControl className="w-full mx-auto">
                <TextField
                  required
                  fullWidth
                  margin="dense"
                  id="outlined-controlled"
                  label="Название"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
                <TextField
                  required
                  fullWidth
                  margin="dense"
                  id="outlined-controlled"
                  label="Описание"
                  value={description}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                />
                <TextField
                  required
                  fullWidth
                  type="number"
                  margin="dense"
                  id="outlined-controlled"
                  label="Цена"
                  value={price}
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  id="outlined-controlled"
                  label="Цена по скидке"
                  type="number"
                  value={promoPrice}
                  onChange={(event) => {
                    setPromoPrice(event.target.value);
                  }}
                />
                <TextField
                  required
                  fullWidth
                  margin="dense"
                  id="outlined-controlled"
                  label="Порция"
                  value={portionSize}
                  onChange={(event) => {
                    setPortionSize(event.target.value);
                  }}
                />
                <ImageUploader setPhoto={setPhoto} />
                {photo && (
                  <TextField
                    fullWidth
                    disabled
                    margin="dense"
                    id="outlined-controlled"
                    label="Фото"
                    value={photo}
                  />
                )}

                <Box>
                  <Button color="error" onClick={handleClose}>
                    Отмена
                  </Button>
                  <Button onClick={handleSubmit}>Сохранить</Button>
                </Box>
              </FormControl>
            </div>
          )}
          {isAlert && <Alert severity="success">Товар успешно добавлен</Alert>}
        </Box>
      </Modal>
    </div>
  );
};

export default FormAddItem;
