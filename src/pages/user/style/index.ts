import styled from "styled-components";
import { PageContainer } from "../../../components/style";

export const ProfilePageStyle = styled(PageContainer)`
  .profile-container {
    max-width: 600px;
    padding: 0;
    padding-bottom: 60px;
    border: 0;
    border-bottom: solid 1px #ddd;
    border-radius: 16px;
    margin: 0 auto;
  }

  .profile-banner {
    border-radius: 16px 16px 0 0;
    background: linear-gradient(to right, #2193b0, #6dd5ed);
    text-align: center;
    padding-top: 160px;
    margin-bottom: 52px;
  }

  .profile-avatar {
    outline: solid 6px white;
    position: absolute;
    transform: translate(-50%, -50%);
  }

  .profile-email {
    color: #333;
  }

  .profile-student-id {
    color: #2193b0;
    min-height: 40px;
    background: #fafafa;
    border: solid 1px transparent;
    border-radius: 20px;
    padding: 8px;
    font-size: 15px;
    text-align: center;

    &:focus {
      outline: none !important;
      border: solid 1px #6dd5ed;
    }
  }

  .profile-name {
    min-height: 40px;
    background: transparent;
    border: solid 1px transparent;
    border-radius: 20px;
    padding: 0px 8px;
    font-size: 32px;
    text-align: center;
    max-width: 100%;

    &:hover {
      background: #fafafa;
    }

    &:focus {
      outline: none !important;
      border: solid 1px #6dd5ed;
    }
  }

  .classroom-btn {
    border-radius: 20px;
    padding: 8px 20px;
    margin-top: 28px;
  }
`;
