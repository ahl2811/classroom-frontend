import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { CSVReader } from "react-papaparse";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { GRADE_STRUCTURE } from "../../../common/constants";
import { IErrorResponse } from "../../../common/types";
import { toastError } from "../../../common/utils";
import LoadingButton from "../../../components/LoadingButton";
import { uploadStudentList } from "../api";
import { STUDENT_ID } from "../utils";

interface IProps {
  onClose: () => void;
  show: boolean;
  id: string;
  roomId: string;
}

const StudentListUploader = ({ onClose, show, id, roomId }: IProps) => {
  const [listData, setListData] = useState<any[]>([]);
  const template = `[${STUDENT_ID} - ${id}]`;
  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation(
    "upload-student-list",
    uploadStudentList,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["grades", roomId]);
        queryClient.invalidateQueries([GRADE_STRUCTURE.GET, roomId]);
      },
      onError: (err: IErrorResponse) => {
        toastError(err);
      },
    }
  );

  const handleClose = () => {
    setListData([]);
    onClose();
  };

  const handleSubmit = () => {
    mutateAsync({ id: roomId, list: listData });
  };

  const handleOnRemoveFile = () => {
    setListData([]);
  };

  const handleOnDrop = (data: any) => {
    if (data && data.length > 0) {
      const firstData = data[0].data;
      if (STUDENT_ID in firstData && "name" in firstData) {
        const csvData = data.map((d: { data: any }) => d.data);
        const gradeData = csvData.map((d: any) => ({
          [`${STUDENT_ID}`]: d[`${STUDENT_ID}`],
          name: d["name"],
        }));
        console.log("data", data);
        console.log("name", gradeData);
        setListData(gradeData);
        return;
      }
      toast(`Please upload CSV file with template ${template}`, {
        position: "bottom-left",
        type: "error",
      });
      handleOnRemoveFile();
      return;
    }
    toast(`No data in CSV file with template ${template}`, {
      position: "bottom-left",
      type: "error",
    });
    handleOnRemoveFile();
  };

  const handleOnError = (err: any) => {
    console.log(err);
  };

  const config = {
    header: true,
    skipEmptyLines: true,
    encoding: "ISO-8859-1",
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="bottom"
      style={{ height: 400 }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Upload {template}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="text-center">
        <CSVReader
          accept=".csv"
          onDrop={handleOnDrop}
          onError={handleOnError}
          addRemoveButton
          onRemoveFile={handleOnRemoveFile}
          config={config}
          style={{
            dropArea: {
              height: 240,
            },
            dropFile: {
              minWidth: 160,
              height: 160,
              background: "#ccc",
            },
          }}
        >
          <span>Drop CSV file here or click to upload.</span>
        </CSVReader>

        <LoadingButton
          variant="light"
          className="mt-2"
          onClick={handleSubmit}
          disabled={listData?.length === 0}
          isLoading={isLoading}
        >
          Submit
        </LoadingButton>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default StudentListUploader;
