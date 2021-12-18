import { getAuthorization, request } from "../../../common/utils";

export interface IGradeStructure {
  id: string;
  name: string;
  grade: number;
}

export const getGradeStructures = async (id: string) => {
  const { data } = await request.get<IGradeStructure[]>(
    `/classrooms/${id}/grade-structures?edit=true`,
    getAuthorization()
  );
  return data;
};

export const getGradeStructuresInfo = async (id: string) => {
  const { data } = await request.get<IGradeStructure[]>(
    `/classrooms/${id}/grade-structures`,
    getAuthorization()
  );
  return data;
};

export const addGradeStruture = async ({
  id,
  name,
  grade,
}: {
  id: string;
  name: string;
  grade: number;
}) => {
  const { data } = await request.post<IGradeStructure>(
    `/classrooms/${id}/grade-structures`,
    {
      name,
      grade,
    },
    getAuthorization()
  );
  return data;
};

export const updateGradeStruture = async ({
  id,
  name,
  grade,
  gradeId,
}: {
  id: string;
  name: string;
  grade: number;
  gradeId: string;
}) => {
  const { data } = await request.patch<IGradeStructure>(
    `/classrooms/${id}/grade-structures/${gradeId}`,
    {
      name,
      grade,
    },
    getAuthorization()
  );
  return data;
};

export const deleteGradeStructure = async ({
  roomId,
  gradeId,
}: {
  roomId: string;
  gradeId: string;
}) => {
  const { data } = await request.delete<IGradeStructure>(
    `/classrooms/${roomId}/grade-structures/${gradeId}`,
    getAuthorization()
  );
  return data;
};

export const updateGradeOrder = async ({
  roomId,
  gradeId,
  order,
}: {
  roomId: string;
  gradeId: string;
  order: number;
}) => {
  const { data } = await request.patch<IGradeStructure>(
    `/classrooms/${roomId}/grade-structures/${gradeId}`,
    {
      order,
    },
    getAuthorization()
  );
  return data;
};
