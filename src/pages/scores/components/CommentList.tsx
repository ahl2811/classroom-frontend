import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getComments } from "../api";
import { Comment } from "./Comment";

interface IProps {
  gradeId: string;
}

export const CommentList = ({ gradeId }: IProps) => {
  const [showComments, setShowComments] = useState(false);
  const { data } = useQuery(["comments", gradeId], () => getComments(gradeId));

  const count = data?.length || 0;

  const Comments = () => {
    if (data && data.length !== 0) {
      return (
        <>
          {data.map(({ sender, message, id }) => (
            <Comment key={id} sender={sender} message={message} />
          ))}
        </>
      );
    }
    return <div className="text-center text-secondary">No comments found</div>;
  };

  return (
    <>
      <ButtonStyle
        variant={"light"}
        className="mb-3"
        onClick={() => setShowComments(!showComments)}
      >
        <i className="bi bi-chat-quote-fill me-2" />
        {!showComments
          ? `View ${count || ""} comments`.trim()
          : "Hide comments"}
      </ButtonStyle>

      <CommentsContainer className="small-scrollbar">
        {showComments && <Comments />}
      </CommentsContainer>
    </>
  );
};

const CommentsContainer = styled.div`
  max-height: 300px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    max-width: 8px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    display: none;
  }

  &:hover {
    &::-webkit-scrollbar-thumb {
      display: block;
      border-radius: 8px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
      background-color: #bbb;
    }
  }
`;

const ButtonStyle = styled(Button)`
  &:hover {
    opacity: 0.9;
  }
  color: #333;
`;
