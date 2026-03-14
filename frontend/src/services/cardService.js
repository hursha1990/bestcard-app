import API from "./api";

export const addCard = (data) => {
  return API.post("/cards", data);
};

export const getCards = () => {
  return API.get("/cards");
};

export const updateCard = (id, data) => {
  return API.put(`/cards/${id}`, data);
};

export const deleteCard = (id) => {
  return API.delete(`/cards/${id}`);
};