// const apiKey = "543d57dc-bf32-4cf7-851a-9ba536178e76";
// const jsonId = "873e8471-e741-44c3-aa20-583474238c4e";
// const apiUrl = `https://api.jsonstorage.net/v1/json/543d57dc-bf32-4cf7-851a-9ba536178e76/873e8471-e741-44c3-aa20-583474238c4e?apiKey=${apiKey}`;
const apiUrl = "https://65bb61a052189914b5bbeb61.mockapi.io/menu";

const updateJsonData = async (jsonData) => {
  console.log("updateJsonData");
  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([jsonData]),
    });

    if (response.ok) {
      console.log("Data updated successfully");
    } else {
      console.error(
        "Error updating data:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Error updating data:", error);
  }
};

// Пример использования
const updatedData = {
  sections: [
    {
      name: "Первые блюда",
      items: [
        {
          id: 1,
          name: "Борщ",
          description:
            "Традиционный украинский суп с свеклой, картошкой и мясом.",
          price: 150,
          portionSize: "стандарт",
          photo: "https://example.com/borscht.jpg",
          availability: "в наличии",
        },
        {
          id: 2,
          name: "Солянка",
          description: "Плотный мясной суп с оливками и лимоном.",
          price: 180,
          portionSize: "стандарт",
          photo: "https://example.com/solyanka.jpg",
          availability: "в наличии",
        },
        {
          id: 3,
          name: "Грибной суп",
          description: "Ароматный суп с разнообразными грибами.",
          price: 160,
          portionSize: "стандарт",
          photo: "https://example.com/mushroom_soup.jpg",
          availability: "в наличии",
        },
        {
          id: 4,
          name: "Уха",
          description: "Рыбный суп с разнообразной рыбой и овощами.",
          price: 200,
          portionSize: "стандарт",
          photo: "https://example.com/fish_soup.jpg",
          availability: "в наличии",
        },
      ],
    },
  ],
};
updateJsonData(updatedData);
