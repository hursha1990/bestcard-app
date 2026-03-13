import API from "./api";

export const signup = (data) => {
  return API.post("/signup", data);
};

export const login = (data) => {
  return API.post("/login", data);
};