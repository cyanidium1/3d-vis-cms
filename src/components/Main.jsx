import React, { useEffect, useState } from "react";
import Header from "./Header";
import Menu from "./Menu";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenu } from "../redux/menuOperations";
import { selectIsLoading } from "../redux/menuSlice";
import { Typography } from "@mui/material";
import JsonData from "./JsonData";

const Main = () => {
  const isLoading = useSelector(selectIsLoading);

  const [checked, setChecked] = useState(true);

  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      dispatch(fetchMenu());
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header setCheckedView={setChecked} />

      {isLoading && (
        <Typography variant="h3" gutterBottom className="text-center">
          Загружаем данные...
        </Typography>
      )}
      {!isLoading && checked && <Menu />}
      {!isLoading && !checked && <JsonData />}
    </>
  );
};

export default Main;
