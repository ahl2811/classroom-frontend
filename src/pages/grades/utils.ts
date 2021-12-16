import { jsonToCSV } from "react-papaparse";

export const STUDENT_ID = "studentId";

export const createTemplate = (id: string) => {
  return [{ [`${STUDENT_ID}`]: "", [`${id}`]: "" }];
};

export const exportData = (data: any[], id: string) => {
  const newData = data.map((d) => ({
    [`${STUDENT_ID}`]: d[`${STUDENT_ID}` as typeof d],
    [`${id}`]: d[`${id}` as typeof d],
  }));
  const res = jsonToCSV(newData);
  return res;
};
