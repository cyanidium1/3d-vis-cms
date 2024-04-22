import { createSlice } from "@reduxjs/toolkit";
import { fetchMenu, updateMenu, resetMenu } from "./menuOperations";

const initialState = {
  menu: [],
  isLoading: false,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    removeItem: (state, { payload }) => {
      const { id, section } = payload;

      const sectionIndex = state.menu.sections.findIndex(
        (item) => item.name === section
      );

      if (sectionIndex !== -1) {
        const itemIndex = state.menu.sections[sectionIndex].items.findIndex(
          (item) => item.id === id
        );

        if (itemIndex !== -1) {
          state.menu.sections[sectionIndex].items.splice(itemIndex, 1);
        } else {
          console.log(`Товар з ідентифікатором ${id} не знайдено.`);
        }
      } else {
        console.log(`Секція з назвою ${sectionIndex} не знайдена.`);
      }
    },

    updateItem: (state, { payload }) => {
      const { newItem, section } = payload;

      const sectionIndex = state.menu.sections.findIndex(
        (item) => item.name === section
      );

      if (sectionIndex !== -1) {
        const itemIndex = state.menu.sections[sectionIndex].items.findIndex(
          (item) => item.id === newItem.id
        );

        if (itemIndex !== -1) {
          state.menu.sections[sectionIndex].items.splice(itemIndex, 1, newItem);
        } else {
          console.log(`Товар з ідентифікатором ${newItem.id} не знайдено.`);
        }
      } else {
        console.log(`Секція з назвою ${sectionIndex} не знайдена.`);
      }
    },
    addItem: (state, { payload }) => {
      const { newItem, section } = payload;

      const sectionIndex = state.menu.sections.findIndex(
        (item) => item.name === section
      );

      if (sectionIndex !== -1) {
        state.menu.sections[sectionIndex].items.push(newItem);
      } else {
        console.log(`Секція з назвою ${sectionIndex} не знайдена.`);
      }
    },


    addSection: (state, { payload }) => {
      const { name } = payload;
      const newSection = {
        name: name,
        items: []
      };
      state.menu.sections.push(newSection);
    },



    removeSection: (state, { payload }) => {
      const { section } = payload;
      const sectionIndex = state.menu.sections.findIndex((item) => item.name === section);

      if (sectionIndex !== -1) {
        state.menu.sections.splice(sectionIndex, 1);
      } else {
        console.log(`Секція з назвою ${section} не знайдена.`);
      }
    },

    updateSection: (state, { payload }) => {
      const { section, newName } = payload;
      const sectionIndex = state.menu.sections.findIndex((item) => item.name === section);

      if (sectionIndex !== -1) {
        state.menu.sections[sectionIndex].name = newName;
      } else {
        console.log(`Секція з назвою ${section} не знайдена.`);
      }
    },

    updateItems: (state, { payload }) => {
      state.menu = payload;
    },
  },
  extraReducers: (builder) => {
    // fetch menu
    builder.addCase(fetchMenu.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMenu.fulfilled, (state, action) => {
      state.menu = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchMenu.rejected, (state) => {
      state.isLoading = false;
    });
    //update menu
    builder.addCase(updateMenu.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateMenu.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.menu = payload;
    });
    builder.addCase(updateMenu.rejected, (state) => {
      state.isLoading = false;
    });
    //reset
    builder
      .addCase(resetMenu.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetMenu.fulfilled, (state, { payload }) => {
        state.menu = payload;
        state.isLoading = false;
      })
      .addCase(resetMenu.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { removeItem, updateItem, addItem, addSection, removeSection, updateSection, updateItems } =
  menuSlice.actions;

export const selectMenu = (state) => state.menu;
export const selectIsLoading = (state) => state.isLoading;
export default menuSlice.reducer;
