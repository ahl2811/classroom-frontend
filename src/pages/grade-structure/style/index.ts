import styled from "styled-components";
import { PageContainer } from "../../../components/style";

export const GradeStructurePageStyle = styled(PageContainer)`
  max-width: 760px;
  .page-container {
    border: 1px solid #ddd;
    padding: 24px;
    border-radius: 8px;
    background: #fafafa;
  }

  .add-btn {
    background-color: teal;
    max-height: 40px;
    border: 0;
    &:hover {
      opacity: 0.95;
      transition: background-color 0.3s linear;
    }
  }

  .grade-badge {
    font-size: 16px;
    background: teal;
  }

  .grade-item {
    padding: 8px 12px;
    margin: 20px 0px;
    color: "teal";
    border: 1px solid #ddd;
    font-size: 20px;
    border-radius: 8px;
    transition: background-color 0.3s ease;
  }

  .bi-trash {
    font-size: 20px;
  }

  .text-teal {
    color: teal;
  }

  .grade-structure {
    color: #444;
  }

  @media screen and (max-width: 425px) {
    .page-container {
      padding: 12px;
    }
    .grade-item {
      margin: 12px 0px;
    }
  }
  @media screen and (max-width: 375px) {
    .grade-structure {
      font-size: 20px;
    }
  }
`;
