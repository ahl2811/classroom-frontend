import { IUser } from "../../../common/types";
import { getAuthorization, request } from "../../../common/utils";
import { IReviewGrade } from "../../reviews/api";

export enum NotificationType {
  FINALIZE_GRADE = "Finalize Grade",
  REPLY_COMMENT = "Reply Comment",
  REQUEST_REVIEW = "Request Review",
}

export enum NotificationStatus {
  NEW = "New",
  TO_READ = "To Read",
  DONE = "Done",
}

export interface INotification {
  id: string;
  status: NotificationStatus;
  type: NotificationType;
  sender: IUser;
  grade: IReviewGrade;
}

export const getNotifications = async () => {
  const { data } = await request.get<INotification[]>(
    `/notification`,
    getAuthorization()
  );
  return data;
};

export const viewNotifications = async () => {
  return await request.patch(`/notification`, null, getAuthorization());
};

export const readNotification = async (notiId: string) => {
  return await request.patch(
    `/notification/${notiId}`,
    null,
    getAuthorization()
  );
};
