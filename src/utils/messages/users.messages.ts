import { messageType } from "./messages";

export const USER_DUPLICATED_USER: messageType = {
  id: "001",
  errorCode: 400,
  message: "Email already taken!",
};

export const USER_NOT_FOUND: messageType = {
  id: "002",
  errorCode: 400,
  message: "User not found!",
};
