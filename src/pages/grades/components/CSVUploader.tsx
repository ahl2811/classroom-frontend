import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { CSVReader } from "react-papaparse";
import { toast } from "react-toastify";
import { STUDENT_ID } from "../utils";

interface IProps {
  onClose: () => void;
  show: boolean;
  id: string;
  onSubmitGrades: (value: any[]) => void;
}

const CSVUploader = ({ onClose, show, id, onSubmitGrades }: IProps) => {
  const [listData, setListData] = useState<any[]>([]);
  const template = `[${STUDENT_ID} - ${id}]`;

  const handleClose = () => {
    setListData([]);
    onClose();
  };

  const handleSubmit = () => {
    console.log("list" + id, listData);
    onSubmitGrades(listData);
  };

  const handleOnRemoveFile = () => {
    setListData([]);
  };

  const handleOnDrop = (data: any) => {
    console.log(data);
    if (data && data.length > 0) {
      const firstData = data[0].data;
      if (STUDENT_ID in firstData && id in firstData) {
        console.log("Valid");
        setListData(data.map((d: { data: any }) => d.data));
        return;
      }
      toast(`Please upload CSV file with template ${template}`, {
        position: "bottom-left",
        type: "error",
      });
      handleOnRemoveFile();
    }
  };

  const handleOnError = (err: any) => {
    console.log(err);
  };

  const config = {
    header: true,
    skipEmptyLines: true,
  };

  return (
    <>
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

          <Button
            variant="light"
            className="mt-2"
            onClick={handleSubmit}
            disabled={listData?.length === 0}
          >
            Submit
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CSVUploader;
