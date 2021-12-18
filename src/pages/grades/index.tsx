import { useMemo, useState } from "react";
import { CSVDownloader } from "react-papaparse";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { HeaderGroup, useTable } from "react-table";
import { IErrorResponse } from "../../common/types";
import Options from "../../components/options";
import { OptionItem } from "../../components/options/style";
import { getGradeBoard } from "./api";
import CSVUploader from "./components/CSVUploader";
import { GradesPageStyle, GradeTable } from "./style";
import { createTemplate, exportData, NAME, STUDENT_ID, TOTAL } from "./utils";
import { toastError } from "../../common/utils";

const initialObject = { [`${STUDENT_ID}`]: "", [`${NAME}`]: "" };
export const DefaultGradeKeys = [STUDENT_ID, NAME, "totalGrade", "userId"];

const GradesPage = () => {
  const { id: roomId } = useParams<{ id: string }>();
  const history = useHistory();
  const { data: grades } = useQuery(
    ["grades", roomId],
    () => getGradeBoard(roomId),
    {
      onError: (err: IErrorResponse) => {
        if (err.response.data.statusCode === 403) {
          toastError(err);
          history.push("/");
        }
      },
    }
  );

  const keysOfGrade = useMemo(
    () =>
      [...Object.keys(grades ? grades[0] : initialObject)].filter(
        (e) => e !== "userId"
      ),
    [grades]
  );
  console.log(keysOfGrade);

  const columns = useMemo(
    () =>
      keysOfGrade.map((key) => ({
        Header: key,
        accessor: key, // accessor is the "key" in the data
      })),
    [keysOfGrade]
  );

  const THead = ({ headerGroups }: { headerGroups: HeaderGroup<any>[] }) => {
    const [showUpload, setShowUpload] = useState(false);
    const [id, setId] = useState<string>("");

    const handleClickUpload = (id: string) => {
      setId(id);
      setShowUpload(!showUpload);
    };

    return (
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                className="position-relative text-capitalize"
              >
                {column.render("Header")}
                {column.id !== STUDENT_ID && (
                  <Options
                    icon={
                      <i className="bi bi-three-dots-vertical icon fs-5 fw-bold" />
                    }
                    className="position-absolute top-0 end-0 fw-normal"
                  >
                    {column.id !== TOTAL && (
                      <OptionItem onClick={() => handleClickUpload(column.id)}>
                        <i className="bi bi-upload me-3" />
                        Import {column.id}
                      </OptionItem>
                    )}
                    <OptionItem>
                      <CSVDownloader
                        filename={column.id}
                        data={exportData(grades || [{}], column.id)}
                      >
                        <i className="bi bi-cloud-download me-3" />
                        Export {column.id}
                      </CSVDownloader>
                    </OptionItem>
                    {column.id !== TOTAL && (
                      <OptionItem>
                        <CSVDownloader
                          filename={column.id}
                          data={createTemplate(grades || [{}], column.id)}
                        >
                          <i className="bi bi-download me-3" />
                          Download Template
                        </CSVDownloader>
                      </OptionItem>
                    )}
                    {!DefaultGradeKeys.includes(column.id) && (
                      <>
                        <hr className="border-1 border-top border-secondary my-2" />
                        <OptionItem>
                          <i className="bi bi-check2-square me-3" />
                          Mark Finalized
                        </OptionItem>
                      </>
                    )}
                  </Options>
                )}
              </th>
            ))}
          </tr>
        ))}
        <CSVUploader
          show={showUpload}
          onClose={() => setShowUpload(false)}
          id={id}
          roomId={roomId}
        />
      </thead>
    );
  };

  const BTable = ({ columns, data }: { columns: any; data: any[] }) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable({ columns, data });
    return (
      <GradeTable bordered striped {...getTableProps()}>
        <THead headerGroups={headerGroups} />
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      console.log("cell", cell);
                      return (
                        <td {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </GradeTable>
    );
  };

  return (
    <GradesPageStyle fluid>
      <CSVDownloader data={grades} filename="GradeBoard" className="export-btn">
        Export Grades
      </CSVDownloader>
      <BTable columns={columns} data={grades || [initialObject]} />
    </GradesPageStyle>
  );
};

export default GradesPage;
