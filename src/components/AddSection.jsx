import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
    Box,
    Button,
    FormControl,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import { addSection } from "../redux/menuSlice";
import { useDispatch } from "react-redux";
import Alert from "@mui/material/Alert";

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

const AddSection = () => {
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

    useEffect(() => {
        if (isFormValid === false) {
            if (name) {
                setIsFormValid(true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);

    const resetForm = () => {
        setName("");
    };

    const handleSubmit = () => {
        if (!name) {
            setIsFormValid(false);
            return;
        }

        const newSection = {
            name,
        };

        console.log(newSection);
        dispatch(addSection(newSection));
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
                Добавить новую секцию
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {!isFormValid && (
                        <Alert severity="error">Заполните обязательное поле</Alert>
                    )}
                    {!isAlert && (
                        <div>
                            <Typography align="center" variant="h5" gutterBottom>
                                Добавить новую секцию
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


                                <Box>
                                    <Button color="error" onClick={handleClose}>
                                        Отмена
                                    </Button>
                                    <Button onClick={handleSubmit}>Сохранить</Button>
                                </Box>
                            </FormControl>
                        </div>
                    )}
                    {isAlert && <Alert severity="success">Секция успешно добавлена</Alert>}
                </Box>
            </Modal>
        </div>
    );
};

export default AddSection;
