export const SERVER_URL =
  process.env.REACT_APP_SERVER_URL ||
  "https://webnc-classroom-backend.herokuapp.com/api";
export const GOOGLE_CLIENT_ID =
  process.env.GOOGLE_CLIENT_API ||
  "157282466908-fbu8722ebcdgtu5ej4e44bc61m1rkdmb.apps.googleusercontent.com";

export const USER = {
  LOGIN: "user/login",
  REGISTER: "user/register",
  UPDATE_PROFILE: "user/update/profile",
};

export const ROOM = {
  GET: "room/get",
  CREATE: "room/create",
  DETAIL: "room/detail",
  MEMBERS: "room/members",
  JOIN: "room/join",
  INVITE_BY_EMAIL: "room/invite/email",
};

export const GRADE_STRUCTURE = {
  GET: "grade-structures",
};
