import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { GRADE_STRUCTURE } from "../../../common/constants";
import { IErrorResponse } from "../../../common/types";
import { toastError } from "../../../common/utils";
import Options from "../../../components/options";
import { OptionItem } from "../../../components/options/style";
import { markFinalizeStudent, updateGrade } from "../api";
import { GradeInfoStyle } from "../style";

interface IProps {
  grade?: number;
  roomId: string;
  gradeName: string;
  studentId: string;
  isFinalize: boolean;
}

const GradeInfo = ({
  grade: initValue,
  roomId,
  gradeName,
  studentId,
  isFinalize,
}: IProps) => {
  const [grade, setGrade] = useState<any>(initValue || "");
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation(updateGrade, {
    onMutate: async (data) => {
      await queryClient.cancelQueries(["grades", roomId]);
      const oldData = queryClient.getQueryData<any[]>(["grades", roomId]);
      if (oldData) {
        const index = oldData.findIndex((item) => item.studentId === studentId);
        const newData = [...oldData];
        newData[index][`${gradeName}`].grade = data.grade;
        queryClient.setQueryData(["grades", roomId], newData);
      }
      return { oldData };
    },
    onError: (err: IErrorResponse, variables, context) => {
      const ct = context as any;
      if (ct?.oldData) {
        queryClient.setQueryData(["grades", roomId], ct.oldData);
      }
      toastError(err);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["grades", roomId]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([GRADE_STRUCTURE.GET, roomId]);
    },
  });

  const { mutateAsync: markFinalize } = useMutation(markFinalizeStudent, {
    onMutate: async () => {
      await queryClient.cancelQueries(["grades", roomId]);
      const oldData = queryClient.getQueryData<any[]>(["grades", roomId]);
      if (oldData) {
        const index = oldData.findIndex((item) => item.studentId === studentId);
        const newData = [...oldData];
        newData[index][`isFinalize-${gradeName}`] = true;
        queryClient.setQueryData(["grades", roomId], newData);
      }
      return { oldData };
    },
    onError: (err: IErrorResponse, variables, context) => {
      const ct = context as any;
      if (ct?.oldData) {
        queryClient.setQueryData(["grades", roomId], ct.oldData);
      }
      toastError(err);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["grades", roomId]);
      queryClient.invalidateQueries([GRADE_STRUCTURE.GET, roomId]);
    },
  });

  const handleChangeGrade = (value: string) => {
    setGrade(value);
  };

  const handleOnBlur = () => {
    const value = Number(grade);

    if (value === Number(initValue) || (!value && !initValue)) {
      return;
    }
    if (isNaN(value) || value < 0) {
      toast.error("Grade must be a positive number", {
        position: "bottom-left",
      });
      setGrade(initValue || "");
      return;
    }
    if (!String(grade).trim()) {
      setGrade("");
    }
    mutateAsync({ gradeName, roomId, grade: value, studentId });
    setGrade(value);
  };

  const handleMarkFinalize = () => {
    markFinalize({ roomId, gradeName, studentId });
  };

  return (
    <GradeInfoStyle className="d-flex flex-row align-items-center">
      <div className="grade-info d-flex flex-column justify-content-center align-items-center ps-1">
        <div>
          <input
            className="grade-info-input text-end"
            value={grade}
            onChange={(e) => handleChangeGrade(e.target.value)}
            onBlur={handleOnBlur}
          />
          /10
        </div>
        <div className="grade-status mt-1">
          {isFinalize ? "Finalized" : initValue ? "Draft" : ""}
        </div>
      </div>
      <div className="grade-info-options">
        <Options
          icon={
            <i className="bi bi-three-dots-vertical icon fs-5 fw-bold title" />
          }
          className="position-relative"
        >
          <OptionItem onClick={handleMarkFinalize}>
            <i className="bi bi-check-circle me-3" />
            Mark Finalized
          </OptionItem>
        </Options>
      </div>
    </GradeInfoStyle>
  );
};

export default GradeInfo;
