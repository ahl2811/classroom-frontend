export const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000/api";
export const GOOGLE_CLIENT_ID =
  process.env.GOOGLE_CLIENT_API ||
  "157282466908-fbu8722ebcdgtu5ej4e44bc61m1rkdmb.apps.googleusercontent.com";

export const USER = {
  LOGIN: "user/login",
  REGISTER: "user/register",
};

export const ROOM = {
  GET: "room/get",
  CREATE: "room/create",
  DETAIL: "room/detail",
  MEMBERS: "room/members",
  JOIN: "room/join",
};
