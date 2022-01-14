import React, { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import { IErrorResponse } from "../../../common/types";
import { toastError } from "../../../common/utils";
import { comment, IComment } from "../api";

interface IProps {
  gradeId: string;
}

export const CommentInput = ({ gradeId }: IProps) => {
  const [text, setText] = useState<string>();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation("post-comment", comment, {
    onSuccess: (comment) => {
      console.log("res comment", comment);
      queryClient.setQueryData<IComment[]>(
        ["comments", gradeId],
        (oldQueryData) => {
          if (oldQueryData) {
            return [...oldQueryData, comment];
          }
          return [comment];
        }
      );
    },
    onError: (err: IErrorResponse) => {
      toastError(err);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text?.trim()) return;
    mutateAsync({ gradeId, message: text });
    setText("");
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <InputStyle
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  );
};

export const InputStyle = styled.input`
  min-height: 40px;
  background: transparent;
  border: solid 1px #ccc;
  border-radius: 20px;
  padding: 0px 16px;
  font-size: 14px;
  width: 100%;
  outline: none !important;

  &:focus {
    border: solid 1px #6dd5ed;
  }
`;
