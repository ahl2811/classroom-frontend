import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getNotifications,
  NotificationStatus,
  viewNotifications,
} from "../../pages/notifications/api";
import {
  generateContentNoti,
  generateNotifyLink,
} from "../../pages/notifications/helpers";
import Options from "../options";
import Notification from "./Notification";
import { NotificationContainer } from "./style/notification";

export const NotificationList = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery("notifications", getNotifications);
  const { mutateAsync } = useMutation("view-notifications", viewNotifications, {
    onSuccess: () => {
      queryClient.invalidateQueries("notifications");
    },
  });

  return (
    <Options
      icon={<i className="bi bi-bell-fill icon fs-5 fw-bold" />}
      className="position-relative ms-1"
      menuCenter={true}
      badge={
        data?.findIndex((item) => item.status === NotificationStatus.NEW) !== -1
      }
      callback={() => mutateAsync()}
    >
      <NotificationContainer>
        {data?.length !== 0 ? (
          data?.map(({ id, type, sender, grade, status, classroomName }) => {
            const content = generateContentNoti({
              type,
              senderName: sender?.name as string,
              gradeName: grade.gradeStructure?.name,
              classroomName,
            });

            const link = generateNotifyLink({
              gradeId: grade.id,
              studentId: grade.studentId,
              classId: grade.classroomId,
            });
            return (
              <Notification
                key={id}
                id={id}
                isRead={status === NotificationStatus.DONE}
                title={type}
                content={content}
                link={link}
              />
            );
          })
        ) : (
          <div className="py-1 px-4 text-center">No notifications found</div>
        )}
      </NotificationContainer>
    </Options>
  );
};
