import styled from "styled-components";

export const EditableWrapper = styled.div`
  
  .editable {
    width: 100%;
  }

  .editable_display {
    padding: 2px 8px;
    color: #000;
    cursor: pointer;
    transition: 200ms;
    text-align: center;
    border-radius: 4px;
    background-color: #f4f5f7;

    &:hover {
      background-color: #ebecf0;
    }
  }

  .editable_edit {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .editable_edit input {
    border: 2px solid #0079bf;
    border-radius: 5px;
    outline: none;
    font-size: 1rem;
    padding: 10px;
  }

  .editable_edit_footer {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-direction: row-reverse;
  }

  .editable_edit_footer button {
    cursor: pointer;
    border-radius: 5px;
    outline: none;
    background-color: #f5f5f5;
    color: black;
    border: none;
    transition: 100ms ease;
    padding: 10px;

    &:hover {
      background-color: #f5f5f5;
    }
  }

  .editable_edit_footer .closeIcon {
    cursor: pointer;
    height: 24px;
    width: 24px;
  }
`;

export const EditableK = styled.div`
  width: 30%;
  margin-left: 20px;
`;

export const EditableEditK = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;

  input {
    border: 2px solid #0079bf;
    border-radius: 5px;
    outline: none;
    font-size: 1rem;
    padding: 10px;
  }
`;


export const EditableEditFooterK = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 8px;
  align-items: center;

  button {
    cursor: pointer;
    border-radius: 5px;
    outline: none;
    background-color: #F5F5F5;
    color: black;
    border: none;
    transition: 100ms ease;
    padding: 10px;

    &:hover {
      background-color: #EBECF0;
    }
  }

  .closeIcon {
    cursor: pointer;
    height: 24px;
    width: 24px;
  }
`;

export const HoverDiv = styled.div`
  background-color: #ffffff;
  padding: 1px;
  transition: box-shadow 0.3s ease-in-out;
  margin-bottom: 15px;
  text-align: center;
  margin-right: 150px;
  border-radius: 5px;
  position: relative;

  &:hover {
    z-index: 1;
    background: #ebecf0;

    .hover-text_k {
      opacity: 1;
    }
  }
`;

export const EditableDisplay = styled.p`
  font-size: 16px;

  &:hover {
    background: #ebecf0;
  }
`;