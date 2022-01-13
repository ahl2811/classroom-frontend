import { jsonToCSV } from "react-papaparse";

export const STUDENT_ID = "studentId";
export const NAME = "name";
export const TOTAL = "totalGrade";

export const createTemplate = (data: any[], id: string) => {
  const newData =
    id === NAME
      ? data.map((d) => ({
          [`${STUDENT_ID}`]: d[`${STUDENT_ID}` as typeof d],
          name: "",
        }))
      : data.map((d) => ({
          [`${STUDENT_ID}`]: d[`${STUDENT_ID}` as typeof d],
          grade: "",
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

export const exportGrade = (data: any[], id: string) => {
  const newData = data.map((d) => ({
    [`${STUDENT_ID}`]: d[`${STUDENT_ID}` as typeof d],
    [`${id}`]: d[`${id}` as typeof d].grade,
  }));
  const res = jsonToCSV(newData);
  return res;
};

export const exportGradeBoard = (data: any[]) => {
  const cloneData = JSON.parse(JSON.stringify(data));
  const newData = cloneData.map((d: any) => {
    const unUseKeys = Object.keys(d).filter((k) => k.startsWith("isFinalize-"));
    for (const key of unUseKeys) {
      delete d[key];
    }
    delete d.userId;
    return d;
  });
  return newData;
};
