import { Card } from "react-bootstrap";
import styled from "styled-components";

export const RoomCard = styled(Card)`
  &:hover {
    box-shadow: 0px 0px 8px #ddd;
  }
  .title {
    max-width: 80%;
    font-size: 20px;
  }
  .body {
    height: 120px;
  }
  .owner {
    text-transform: capitalize;
    font-weight: normal;
    cursor: pointer;
  }
  .link {
    &:hover {
      text-decoration: underline;
    }
  }
`;
