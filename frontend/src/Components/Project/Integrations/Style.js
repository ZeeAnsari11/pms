import styled from "styled-components";
import { Form } from "antd";
import { color } from "../../Dashboard/Sidebar/utils/styles";

export const PageContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const SummaryHeading = styled.p`
  font-size: 26px;
  color: black;
  margin-left: 40px;
  font-weight: bolder;
  margin-top: 70px;

  @media (max-width: 768px) {
    margin: 5px 0;
  }
`;

export const SubHeadingForNotificationMethods = styled.p`
  margin-left: 10px;
  font-size: 16px;
  color: black;
  font-weight: bolder;
  width: 250px;

  @media (max-width: 768px) {
    margin: 5px 0;
  }
`;

export const ContentWrapper = styled.div`
  flex: 1;
  overflow-x: auto;
  padding: 0px 20px 0px 20px;
  margin-left: 200px;
  margin-bottom: -10px;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const HeadingWrapper = styled.div`
  width: 100%;
`;

export const IconWrapperDiv = styled.div`
  width: 40px;
  height: 40px;
  margin-left: 10px;
`;

export const IconName = styled.p`
  margin-left: 43px;
  margin-top: -40px;
  font-size: 21px;
  width: 200px;
`;

export const NotificationContainerForSlack = styled.div`
  margin-top: 25px;
  background-color: #EBEBEB;
  border-radius: 5px;
  height: 420px;
  width: 100%;
  box-shadow: var(--ds-shadow-raised, 0 1px 1px rgba(9, 30, 66, 0.25), 0 0 1px 1px rgba(9, 30, 66, 0.13));

  &:hover {
    transform: scale(1.005);
    transition: transform 0.5s ease;
  }
`;

export const NotificationContainerForGmail = styled.div`
  margin-top: 25px;
  background-color: #EBEBEB;
  border-radius: 5px;
  height: 600px;
  width: 100%;
  box-shadow: var(--ds-shadow-raised, 0 1px 1px rgba(9, 30, 66, 0.25), 0 0 1px 1px rgba(9, 30, 66, 0.13));

  &:hover {
    transform: scale(1.005);
    transition: transform 0.5s ease;
  }
`;

export const NotificationWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
`;

export const StyledFormItem = styled(Form.Item)`
  float: right;
  margin-top: -56px;
  margin-right: 230px;
`;

export const Divider = styled.div`
  margin-top: 17px;
  border-top: 1px solid ${color.borderLight};
`;

export const InnerNotificationWrapper = styled.div`
  margin: 10px;
  border-radius: 5px;
  width: 98%;
  height: 80%;
`;

export const FormWrapper = styled.div`
  width: 500px;
`;

export const ParagraphNote = styled.p`
  font-size: 10px;
  margin-top: -25px;
  margin-left: 140px
`;
