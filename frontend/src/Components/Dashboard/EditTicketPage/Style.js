import styled from "styled-components";
import {Collapse} from "antd";

const {Panel} = Collapse;


export const RightSideContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
`;


export const StyledCollapse = styled(Collapse)`
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
`;

export const StyledPanel = styled(Panel)`
  background-color: #F4F5F7;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;


export const ContentInfoTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  font-weight: 600;
  font-size: 1rem;

  span {
    display: inline-block;
    width: 100px;
  }
`;

export const Title = styled.div`
  width: fit-content;
  font-weight: 700;
  margin-bottom: 10px;
  margin-top: 5px;
  color: #727F94;
`;


export const IssueTitle = styled.div`
  font-weight: 700;
  margin-bottom: 10px;
  margin-top: 5px;
`;


export const Container = styled.div`
  display: flex;
`;

export const LeftSide = styled.div`
  width: 65%;
  padding-top: 70px;
  margin-left: 220px;
`;

export const RightSide = styled.div`
  width: 35%;
  padding-top: 80px;
  margin-right: 10px;
  margin-left: 10px;
`;

export const CardInfoBoxCustom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 10px;
`;

export const FileAttachmentsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 10px;
`;


export const CardInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ActivityButton = styled.button`
  cursor: pointer;
  border-radius: 5px;
  background-color: #F4F5F7;
  color: black;
  border: none;
  transition: 100ms ease;
  padding: 10px;
  font-size: inherit;
`;

export const CommentInput = styled.input`
  flex: 1;
  margin-right: 8px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

export const CommentButton = styled.button`
  padding: 8px 12px;
  background-color: #0052cc;
  color: #fff;
  border: none;
  border-radius: 3px;
`;

export const FormContainer = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const SaveButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #0062FF;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  z-index: 999;

  &:hover {
    background-color: #3e81ed;
    cursor: pointer;
  }
`;
