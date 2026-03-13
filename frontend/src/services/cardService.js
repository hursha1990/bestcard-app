import API from "./api";

export const addCard = (data) => {
  return API.post("/cards", data);
};

export const getCards = () => {
  return API.get("/cards");
};