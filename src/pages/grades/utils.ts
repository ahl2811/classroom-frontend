import { jsonToCSV } from "react-papaparse";

export const STUDENT_ID = "studentId";
export const NAME = "name";
export const TOTAL = "totalGrade";

export const createTemplate = (data: any[], id: string) => {
  const newData = data.map((d) => ({
    [`${STUDENT_ID}`]: d[`${STUDENT_ID}` as typeof d],
    [`${id}`]: "",
  }));
  const res = jsonToCSV(newData);
  return res;
};

export const exportData = (data: any[], id: string) => {
  const newData = data.map((d) => ({
    [`${STUDENT_ID}`]: d[`${STUDENT_ID}` as typeof d],
    [`${id}`]: d[`${id}` as typeof d],
  }));
  const res = jsonToCSV(newData);
  return res;
};

export const exportGradeBoard = (data: any[]) => {
  const cloneData = JSON.parse(JSON.stringify(data));
  const newData = cloneData.map((d: any) => {
    delete d.userId;
    return d;
  });
  return newData;
};
