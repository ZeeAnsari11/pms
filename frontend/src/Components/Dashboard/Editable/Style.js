import styled from "styled-components";

export const EditableWrapper = styled.div`
  width: 100%;
  height: 100%;

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


export const EditableEdit = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  gap: 10px;
  margin-top: 15px;

  input {
    border: 2px solid #0079bf;
    border-radius: 5px;
    outline: none;
    font-size: 1rem;
    padding: 10px;
    margin-left: 20px;
    //width: 120px;
  }
`;

export const EditableEditFooter = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-direction: row-reverse;

  button {
    cursor: pointer;
    border-radius: 5px;
    outline: none;
    background-color: #f5f5f5;
    color: black;
    border: none;
    transition: 100ms ease;
    padding: 10px;
    z-index: 100;

    &:hover {
      background-color: #f5f5f5;
    }
  }
`;

export const EditableDisplay = styled.p`
  background-color: transparent;
  //font-size: 22px;
  font-size: ${props => props.fontSize || "22px"};
  font-weight: ${props => props.fontWeight || 'normal'};
  padding: ${props => props.padding || '0 0 0 0'};
  width: ${props => props.width};
  display: flex;

  &:hover {
    background-color: ${props => props.hoverBackgroundColor || '#ffffff'};
    border-radius: 5px;
  }
`;
