import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import { updateItem } from "../redux/menuSlice";
import { useDispatch } from "react-redux";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import ImageUploader from "./ImageUploader";

const FormUpdateItem = ({ item, section, onClose }) => {
  const dispatch = useDispatch();
  const [isAlert, setIsAlert] = useState(false);

  const [id] = useState(item.id);
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);
  const [promoPrice, setPromoPrice] = useState(item.promoPrice || "");
  const [portionSize, setPortionSize] = useState(item.portionSize);
  const [photo, setPhoto] = useState(item.photo);
  // const [availability, setAvailability] = useState(item.availability || "");

  const handleUpdate = () => {
    const newItem = {
      id,
      name,
      description,
      price,
      promoPrice,
      portionSize,
      photo,
      // availability,
    };

    dispatch(updateItem({ newItem, section }));

    setIsAlert(true);

    setTimeout(() => {
      onClose();
    }, 3000);
  };

  return (
    <>
      {!isAlert && (
        <>
          <TextField
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
            fullWidth
            margin="dense"
            id="outlined-controlled"
            type="number"
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
            type="number"
            label="Цена по скидке"
            value={promoPrice}
            onChange={(event) => {
              setPromoPrice(event.target.value);
            }}
          />
          <TextField
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
          <TextField
            fullWidth
            margin="dense"
            id="outlined-controlled"
            label="Фото"
            value={photo}
            onChange={(event) => {
              setPhoto(event.target.value);
            }}
          />
          <Box>
            <Button color="error" onClick={onClose}>
              Отмена
            </Button>
            <Button onClick={handleUpdate}>Сохранить</Button>
          </Box>
        </>
      )}
      {isAlert && (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Товар успешно изменен
        </Alert>
      )}
    </>
  );
};

export default FormUpdateItem;
