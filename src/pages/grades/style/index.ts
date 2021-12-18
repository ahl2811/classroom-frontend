import { Table } from "react-bootstrap";
import styled from "styled-components";
import { PageContainer } from "../../../components/style";

export const GradesPageStyle = styled(PageContainer)`
  overflow-x: auto;
  min-height: 90vh;
  .export-btn {
    margin: 0 !important;
    &:hover {
      cursor: pointer;
    }
  }
`;

export const GradeTable = styled(Table)`
  margin-top: 12px;
  min-width: 800px;
  /* tr {
    height: 64px !important;
  }
  th,
  tr {
    line-height: 64px;
  } */
  tr {
    min-height: 60px !important;
  }
`;
