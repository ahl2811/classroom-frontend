import { getAuthorization, request } from "../../../common/utils";

export interface IStudenList {
  studentId: string;
  name: string;
}

export interface IGradeList {
  studentId: string;
  grade: number;
}

export const getGradeBoard = async (id: string) => {
  const { data } = await request.get<any[]>(
    `/classrooms/${id}/grade-board`,
    getAuthorization()
  );
  return data;
};

export const uploadStudentList = async (params: {
  id: string;
  list: IStudenList[];
}) => {
  const { id, list } = params;
  const { data } = await request.post<any[]>(
    `/classrooms/${id}/student-list`,
    list,
    getAuthorization()
  );
  return data;
};

export const uploadGrade = async (params: {
  roomId: string;
  gradeName: string;
  list: IGradeList[];
}) => {
  const { roomId, gradeName, list } = params;
  const { data } = await request.patch<any[]>(
    `/classrooms/${roomId}/grades/${gradeName}`,
    list,
    getAuthorization()
  );
  return data;
};

export const updateGrade = async (params: {
  grade?: number;
  roomId: string;
  gradeName: string;
  studentId: string;
}) => {
  const { grade, roomId, gradeName, studentId } = params;
  const { data } = await request.patch<any[]>(
    `/classrooms/${roomId}/grades/${gradeName}`,
    [{ studentId, grade }],
    getAuthorization()
  );
  return data;
};

export const markFinalizeColumn = async ({
  gradeName,
  roomId,
}: {
  roomId: string;
  gradeName: string;
}) => {
  const { data } = await request.patch(
    `/classrooms/${roomId}/grade-structures/${gradeName}`,
    {
      isFinalize: true,
    },
    getAuthorization()
  );
  return data;
};

export const markFinalizeStudent = async (params: {
  roomId: string;
  gradeName: string;
  studentId: string;
}) => {
  const { roomId, gradeName, studentId } = params;
  const { data } = await request.patch<any[]>(
    `/classrooms/${roomId}/grades/${gradeName}`,
    [{ studentId, isFinalize: true }],
    getAuthorization()
  );
  return data;
};
