import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "https://65bb61a052189914b5bbeb61.mockapi.io/menu";

export const fetchMenu = createAsyncThunk(
  "menu/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiUrl);
      const data = response.data[0];
      return data;
    } catch (error) {
      return rejectWithValue("Something went wrong, please try again later!");
    }
  }
);

export const updateMenu = createAsyncThunk(
  "menu/update",
  async (dataMenu, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${apiUrl}/sections`, dataMenu);
      const data = response.data;
      return data;
    } catch (error) {
      return rejectWithValue("Something went wrong, please try again later!");
    }
  }
);

export const resetMenu = createAsyncThunk(
  "menu/reset",
  async (_, { dispatch }) => {
    try {
      const response = await axios.get("/menu.json");
      const data = response.data[0];
      return data;
    } catch (error) {
      console.error("Помилка при завантаженні даних з файлу menu.json:", error);
      throw error;
    }
  }
);
