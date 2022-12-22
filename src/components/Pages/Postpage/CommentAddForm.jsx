import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __addComment } from "../../../redux/modules/comments";
import styled from "styled-components";
import CusttomButton from "../../Tools/CusttomButton";
import uuid from "react-uuid";

const CommentAddForm = (props) => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (content == "") return; // 아무것도 입력하지 않았을 때 dispatch 하지 않음

    let NewData = {
      id: uuid(),
      post_id: props.post_id,
      content,
      toggledisplay: true,
    };

    dispatch(__addComment(NewData));

    setContent("");
  };

  return (
    <AddWrap>
      <Form onSubmit={onSubmitHandler}>
        <Input
          type="text"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <CusttomButton>추가</CusttomButton>
      </Form>
    </AddWrap>
  );
};

const AddWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Input = styled.input`
  border: 1px solid #eee;
  height: 30px;
  width: 88%;
  border-radius: 15px;
  outline: none;
  padding: 0 20px;
`;

export default CommentAddForm;
