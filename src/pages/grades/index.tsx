import { useMemo, useState } from "react";
import { CSVDownloader } from "react-papaparse";
import { HeaderGroup, useTable } from "react-table";
import Options from "../../components/options";
import { OptionItem } from "../../components/options/style";
import CSVUploader from "./components/CSVUploader";
import { GradesPageStyle, GradeTable } from "./style";
import { createTemplate, exportData, NAME, STUDENT_ID } from "./utils";

const initialObject = { [`${STUDENT_ID}`]: "", [`${NAME}`]: "", "Grade 1": "" };

const GradesPage = () => {
  const [grades, setGrades] = useState<any[] | undefined>();

  const keysOfGrade = useMemo(
    () => [...Object.keys(grades ? grades[0] : initialObject)],
    [grades]
  );
  console.log(keysOfGrade);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const columns = useMemo(
    () =>
      keysOfGrade.map((key) => ({
        Header: key.toUpperCase(), //gradestruct.name
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
              <th {...column.getHeaderProps()} className="position-relative">
                {column.render("Header")}
                {column.id !== STUDENT_ID && (
                  <Options
                    icon={
                      <i className="bi bi-three-dots-vertical icon fs-5 fw-bold" />
                    }
                    className="position-absolute top-0 end-0 fw-normal"
                  >
                    <OptionItem onClick={() => handleClickUpload(column.id)}>
                      <i className="bi bi-upload me-3" />
                      Import{" "}
                      <span className="text-capitalize">{column.id}</span>
                    </OptionItem>
                    <OptionItem>
                      <CSVDownloader
                        filename={column.id}
                        data={exportData(grades || [{}], column.id)}
                      >
                        <i className="bi bi-cloud-download me-3" />
                        Export{" "}
                        <span className="text-capitalize">{column.id}</span>
                      </CSVDownloader>
                    </OptionItem>
                    <OptionItem>
                      <CSVDownloader
                        filename={column.id}
                        data={createTemplate(grades || [{}], column.id)}
                      >
                        <i className="bi bi-download me-3" />
                        Download Template
                      </CSVDownloader>
                    </OptionItem>
                    <hr className="border-1 border-top border-secondary my-2" />
                    <OptionItem>
                      <i className="bi bi-check2-square me-3" />
                      Mark Finalized
                    </OptionItem>
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
          onSubmitGrades={setGrades}
        />
      </thead>
    );
  };

  const BTable = ({ columns, data }: { columns: any; data: any[] }) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable({ columns, data });
    return (
      <GradeTable bordered striped size="xl" {...getTableProps()}>
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
