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

  th,
  td {
    min-width: 140px !important;
    max-width: 14px !important;
  }

  th {
    &:last-child {
      width: 100%;
    }
    height: 72px !important;

    .title {
      color: teal;
    }
  }

  td {
    min-width: 20px !important;
    max-width: 20px !important;
    height: 64px !important;

    padding: 0;
    &.name {
      min-width: 240px !important;
    }

    &.name,
    &.studentId,
    &.totalGrade {
      padding: 8px;
      min-height: 60px !important;
      line-height: 64px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &:last-child {
      width: 100%;
    }
  }
`;

export const GradeInfoStyle = styled.div`
  width: 100%;
  height: 100%;
  .grade-info {
    flex: 1;
    padding-left: 8px;
    color: teal;

    .grade-status {
      font-size: 14px;
      color: #444;
      font-style: italic;
    }
  }

  .grade-info-options {
    width: 40px;
    visibility: collapse;
  }

  .grade-info-input {
    width: 36px;
    border: 0;
    border-bottom: solid 1px #444;
    outline: 0;
    color: teal;
  }

  &:hover {
    .grade-info-options {
      visibility: visible;
    }
  }
`;
