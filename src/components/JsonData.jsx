import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMenu, updateItems } from "../redux/menuSlice";
import { Alert, Button, TextField } from "@mui/material";
import { Save as SaveIcon } from "@mui/icons-material";

const JsonData = () => {
  const menuData = useSelector(selectMenu);

  const [jsonData, setJsonData] = useState(JSON.stringify(menuData, null, 2));
  const [isAlert, setIsAlert] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setJsonData(JSON.stringify(menuData, null, 2));
  }, [menuData]);

  const handleSave = () => {
    const newMenu = JSON.parse(jsonData);
    dispatch(updateItems(newMenu));
    setIsAlert(true);

    setTimeout(() => {
      setIsAlert(false);
    }, 5000);
  };

  return (
    <div className="p-4">
      <TextField
        id="jsonTextarea"
        label="JSON Data"
        multiline
        // rows={10}
        value={jsonData}
        variant="outlined"
        fullWidth
        onChange={(event) => {
          setJsonData(event.target.value);
        }}
      />
      {isAlert && <Alert severity="success">Меню успешно обновлено</Alert>}
      <Button
        variant="contained"
        color="primary"
        startIcon={<SaveIcon />}
        onClick={handleSave}
        style={{ marginTop: "16px" }}
      >
        Сохранить
      </Button>
    </div>
  );
};

export default JsonData;
