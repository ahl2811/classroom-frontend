import { getAuthorization, request } from "../../../common/utils";

export interface IStudenList {
  studentId: string;
  name: string;
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
