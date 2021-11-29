import styled from "styled-components";
import { PageContainer } from "../../../components/style";
import InfoNotify from "../../details/components/InfoNotify";

export const GradeStructurePageStyle = styled(PageContainer)`
  max-width: 760px;
  .page-container {
    border: 1px solid #ddd;
    padding: 24px;
    border-radius: 8px;
  }

  .add-btn {
    background-color: teal;
    border: 0;
    &:hover {
      opacity: 0.95;
      transition: background-color 0.3s linear;
    }
  }
`;

export const GradeItemStyle = styled(InfoNotify)`
  background-color: inherit !important;
`;
