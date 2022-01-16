import { IUser } from "../../../common/types";
import { getAuthorization, request } from "../../../common/utils";
import { IGradeStructure } from "../../grade-structure/api";
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
  grade: IReviewGrade & {
    gradeStructure: IGradeStructure;
  };
  classroomName: string;
}

export const getNotifications = async () => {
  const { data } = await request.get<INotification[]>(
    `/notification`,
    getAuthorization()
  );
  return data;
};

export const viewNotifications = async () => {
  return await request.patch(`/notification`, undefined, getAuthorization());
};

export const readNotification = async ({ notiId }: { notiId: string }) => {
  return await request.patch(
    `/notification/${notiId}`,
    undefined,
    getAuthorization()
  );
};
