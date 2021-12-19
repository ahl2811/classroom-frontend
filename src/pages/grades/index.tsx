import { useMemo, useState } from "react";
import { CSVDownloader } from "react-papaparse";
import { useQuery } from "react-query";
import { Link, useHistory, useParams } from "react-router-dom";
import { HeaderGroup, useTable } from "react-table";
import { IErrorResponse } from "../../common/types";
import Options from "../../components/options";
import { OptionItem } from "../../components/options/style";
import { getGradeBoard } from "./api";
import CSVUploader from "./components/CSVUploader";
import { GradesPageStyle, GradeTable } from "./style";
import {
  createTemplate,
  exportData,
  exportGradeBoard,
  NAME,
  STUDENT_ID,
  TOTAL,
} from "./utils";
import { toastError } from "../../common/utils";
import GradeInfo from "./components/GradeInfo";
import { GRADE_STRUCTURE } from "../../common/constants";
import { getGradeStructures } from "../grade-structure/api";

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

  const { data: gradeStructure } = useQuery([GRADE_STRUCTURE.GET, roomId], () =>
    getGradeStructures(roomId)
  );

  const keysOfGrade = useMemo(
    () =>
      [...Object.keys(grades ? grades[0] : initialObject)].filter(
        (e) => e !== "userId"
      ),
    [grades]
  );

  const columns = useMemo(
    () =>
      keysOfGrade.map((key) => ({
        Header: key,
        accessor: key, // accessor is the "key" in the data
        Cell: (cell: any) => {
          const id = cell.column.id;
          const values = cell.row.values;
          const value = cell.value;

          if (id === NAME) {
            return !values.userId ? (
              <Link to={`/user/${cell.row.values.userId}`}>
                <span className="classroom-link">{value}</span>
              </Link>
            ) : (
              value
            );
          }
          if (!DefaultGradeKeys.includes(id)) {
            return (
              <GradeInfo
                gradeName={id}
                grade={value || undefined}
                roomId={roomId}
                studentId={values.studentId}
              />
            );
          }
          return cell.value;
        },
      })),
    [keysOfGrade, roomId]
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
            {headerGroup.headers.map((column) => {
              const gradeStruc = gradeStructure?.find(
                (g) => g.name === column.id
              );
              return (
                <th
                  {...column.getHeaderProps()}
                  className="position-relative text-capitalize"
                >
                  <span className="title">{column.render("Header")}</span>
                  {!DefaultGradeKeys.includes(column.id) &&
                    gradeStruc?.isFinalize && (
                      <div className="text-small position-absolute top-0 start-0 mt-2 ms-2 fw-normal fst-italic">
                        Finalize
                      </div>
                    )}
                  {column.id !== STUDENT_ID && (
                    <Options
                      icon={
                        <i className="bi bi-three-dots-vertical icon fs-5 fw-bold title" />
                      }
                      className="position-absolute top-0 end-0 fw-normal"
                    >
                      {column.id !== TOTAL && (
                        <OptionItem
                          onClick={() => handleClickUpload(column.id)}
                        >
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
              );
            })}
            <th></th>
          </tr>
        ))}
        {
          <CSVUploader
            show={showUpload}
            onClose={() => setShowUpload(false)}
            id={id}
            roomId={roomId}
          />
        }
      </thead>
    );
  };

  const BTable = ({ columns, data }: { columns: any; data: any[] }) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable({ columns, data });
    return (
      <GradeTable bordered {...getTableProps()}>
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
                      return (
                        <td {...cell.getCellProps()} className={cell.column.id}>
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </td>
                      );
                    })
                  }
                  <td></td>
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
      <CSVDownloader
        data={exportGradeBoard(grades || [initialObject])}
        filename="GradeBoard"
        className="export-btn"
      >
        Export Grades
      </CSVDownloader>
      <BTable columns={columns} data={grades || [initialObject]} />
    </GradesPageStyle>
  );
};

export default GradesPage;
