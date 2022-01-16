import { NotificationType } from "./api";

export const generateContentNoti = ({
  type,
  senderName,
  gradeName,
  classroomName,
}: {
  senderName: string;
  type: NotificationType;
  gradeName: string;
  classroomName: string;
}) => {
  let action = "";
  switch (type) {
    case NotificationType.FINALIZE_GRADE:
      action = `has finalized your grade "${gradeName}" in classroom "${classroomName}"`;
      break;
    case NotificationType.REPLY_COMMENT:
      action = `has replied your comment in "${gradeName}" of classroom "${classroomName}"`;
      break;
    case NotificationType.REQUEST_REVIEW:
      action = `has requested you to review in "${gradeName}" of classroom "${classroomName}"`;
      break;
    default:
      break;
  }
  return senderName + " " + action;
};

export const generateNotifyLink = ({
  gradeId,
  studentId,
  classId,
}: {
  gradeId: string;
  studentId: string;
  classId: string;
}) => {
  return `/classrooms/${classId}/scores?studentId=${studentId}&activeGradeId=${gradeId}`;
};
