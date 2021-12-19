import React, { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import Options from "../../../components/options";
import { OptionItem } from "../../../components/options/style";
import { updateGrade } from "../api";
import { GradeInfoStyle } from "../style";

interface IProps {
  grade?: number;
  roomId: string;
  gradeName: string;
  studentId: string;
}

const GradeInfo = ({
  grade: initValue,
  roomId,
  gradeName,
  studentId,
}: IProps) => {
  const [grade, setGrade] = useState<any>(initValue || "");

  const { mutateAsync, isLoading } = useMutation(updateGrade, {});

  const handleChangeGrade = (value: string) => {
    if (value.trim() === "") return;
    setGrade(value);
  };

  const handleOnBlur = () => {
    const value = Number(grade);

    if (value === Number(initValue)) {
      return;
    }

    if (isNaN(value) || value < 0) {
      toast.error("Grade must be a positive number", {
        position: "bottom-left",
      });
      setGrade(initValue || "");
      return;
    }

    setGrade(value || "");
    mutateAsync({ gradeName, grade: value, roomId, studentId });
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
          {isLoading ? "Saving..." : initValue ? "Draft" : ""}
        </div>
      </div>
      <div className="grade-info-options">
        <Options
          icon={
            <i className="bi bi-three-dots-vertical icon fs-5 fw-bold title" />
          }
          className="position-relative"
        >
          <OptionItem>
            <i className="bi bi-upload me-3" />
            Import
          </OptionItem>
        </Options>
      </div>
    </GradeInfoStyle>
  );
};

export default GradeInfo;
