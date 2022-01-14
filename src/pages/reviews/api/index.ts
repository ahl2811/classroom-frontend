import { getAuthorization, request } from "../../../common/utils";
import { IGradeStructure } from "../../grade-structure/api";

export enum ReportStatus {
  NEW = "New",
  OPEN = "Open",
  CLOSED = "Closed",
}

export interface IReviewGrade {
  id: string;
  studentId: string;
  name: string;
  grade: number;
  isFinalize: boolean;
  reportStatus: ReportStatus;
  expectedGrade: number;
  message: string;
  classroomId: string;
  userId: string | null;
}

export interface IReview {
  gradeStructure: IGradeStructure;
  grade: IReviewGrade;
}

export const getReviews = async (classId: string) => {
  const { data } = await request.get<IReview[]>(
    `/grade/${classId}/request-review`,
    getAuthorization()
  );
  return data;
};
