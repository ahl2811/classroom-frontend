import { IUser } from "../../../common/types";
import { getAuthorization, request } from "../../../common/utils";
import { ReportStatus } from "../../reviews/api";

export interface IGradeReviewDetail {
  gradeId: string;
  name: string;
  grade: number;
  isFinalize: boolean;
  reportInfo: {
    reportStatus: ReportStatus;
    expectedGrade: number | null;
    message: string | null;
  };
}

export interface IGradeDetails {
  user: IUser;
  grades: IGradeReviewDetail[];
  totalGrade: number;
}

export interface IComment {
  id: string;
  message: string;
  sender: IUser;
}

export const getGradeDetails = async (classId: string, studentId: string) => {
  const { data } = await request.get<IGradeDetails>(
    `/classrooms/${classId}/grade-board/${studentId}`,
    getAuthorization()
  );
  return data;
};

export const requestReview = async (
  gradeId: string,
  data: { expectedGrade: number; message: string }
) => {
  return await request.post(
    `/grade/${gradeId}/request-review`,
    data,
    getAuthorization()
  );
};

export const getComments = async (gradeId: string) => {
  const { data } = await request.get<IComment[]>(
    `/comment/${gradeId}`,
    getAuthorization()
  );
  return data;
};

export const comment = async ({
  gradeId,
  message,
}: {
  gradeId: string;
  message: string;
}) => {
  const { data } = await request.post<IComment>(
    `/comment/${gradeId}`,
    { message },
    getAuthorization()
  );
  return data;
};
