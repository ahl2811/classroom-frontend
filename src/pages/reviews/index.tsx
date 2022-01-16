import { useMemo } from "react";
import { Table } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link, useHistory, useParams } from "react-router-dom";
import { Column, TableOptions, useTable } from "react-table";
import { IErrorResponse } from "../../common/types";
import { toastError } from "../../common/utils";
import { PageContainer } from "../../components/style";
import { generateNotifyLink } from "../notifications/helpers";
import { getReviews } from "./api";

interface IReviewData {
  user: { name: string; id: string | null; studentId: string };
  name: string;
  gradeName: string;
  currentGrade: number;
  expectedGrade: number;
  message: string;
  gradeId: string;
}

function BTable({ columns, data }: TableOptions<IReviewData>) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  // Render the UI for your table
  return (
    <Table striped bordered hover size="lg" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                className="text-center text-teal"
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} className="text-center">
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

const ReviewsPage = () => {
  const { id: roomId } = useParams<{ id: string }>();
  const history = useHistory();

  const { data } = useQuery(["reviews", roomId], () => getReviews(roomId), {
    onError: (err: IErrorResponse) => {
      if (err.response.data.statusCode === 403) {
        toastError(err);
        history.push("/");
      }
    },
  });

  const columns: Column<IReviewData>[] = useMemo(
    () => [
      {
        Header: "Student Info",
        columns: [
          {
            Header: "Student ID",
            accessor: "user",
            Cell: (cell) => (
              <Link
                to={generateNotifyLink({
                  gradeId: cell.row.original.gradeId,
                  studentId: cell.value.studentId,
                  classId: roomId,
                })}
              >
                <span className="classroom-link">{cell.value.studentId}</span>
              </Link>
            ),
          },
          {
            Header: "Full Name",
            accessor: "name",
          },
        ],
      },
      {
        Header: "Review Details",
        columns: [
          {
            Header: "Grade Name",
            accessor: "gradeName",
          },
          {
            Header: "Current Grade",
            accessor: "currentGrade",
          },
          {
            Header: "Expected Grade",
            accessor: "expectedGrade",
          },
          {
            Header: "Message",
            accessor: "message",
          },
        ],
      },
    ],
    [roomId]
  );

  const reviews: IReviewData[] = useMemo(
    () =>
      data?.map(
        ({
          grade: { name, userId, studentId, grade, expectedGrade, message, id },
          gradeStructure: { name: gradeName },
        }) => ({
          user: { name, id: userId, studentId },
          gradeName,
          currentGrade: grade,
          expectedGrade,
          message,
          name,
          gradeId: id,
        })
      ) || [],
    [data]
  );

  return (
    <PageContainer>
      {reviews.length !== 0 ? (
        <div className="overflow-x">
          <BTable columns={columns} data={reviews} />
        </div>
      ) : (
        <div className="text-center text-secondary">No reviews found.</div>
      )}
    </PageContainer>
  );
};

export default ReviewsPage;
