import React, { useState } from "react";
import MenuItem from "./MenuItem";
import FormAddItem from "./FormAddItem";
import { Button, TextField, Modal, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeSection, updateSection } from "../redux/menuSlice";

const MenuSection = ({ name, items }) => {
  const dispatch = useDispatch();
  const [newName, setNewName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteSection = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(removeSection({ section: name }));
    setIsModalOpen(false);
  };

  const handleRenameSection = () => {
    if (newName.trim() !== "") {
      dispatch(updateSection({ section: name, newName: newName.trim() }));
      setNewName("");
    }
  };

  return (
    <div className=" py-4 border-b-2 border-gray-300">
      <h2 className="text-2xl mb-2 text-center">{name}</h2>
      <div className="flex justify-center p-4 space-x-2">
        <TextField
          label="Новое название секции"
          variant="outlined"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          size="small"
        />
        <Button onClick={handleRenameSection}>Переименовать секцию</Button>
        <Button color="error" onClick={handleDeleteSection}>Удалить секцию</Button>
      </div>
      <div className="flex gap-2 flex-wrap justify-center">
        {items.map((item, index) => (
          <MenuItem key={index} item={item} section={name} />
        ))}
      </div>
      <FormAddItem section={name} />

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", border: "2px solid #000", boxShadow: 24, p: 4 }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Вы уверены что хотите удалить секцию вместе со всем товаром?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={handleConfirmDelete} variant="contained" color="error" sx={{ mr: 2 }}>Да</Button>
            <Button onClick={() => setIsModalOpen(false)} variant="contained">Нет</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default MenuSection;
