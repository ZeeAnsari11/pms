import styled from "styled-components";
import { Input } from "antd";

export const Wrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  margin-left: 0;
  width: 100%;
  position: relative;


  @media (max-width: 768px) {
    margin-left: 20px;
    margin-right: 20px;
  }
`;


export const SubHeading = styled.h2`
  font-size: 1.5em;
  //margin-top: 30px;
  margin-bottom: 35px;
  padding-left: 20px;

  @media (max-width: 768px) {
    font-size: 0.8em;
  }
`;

export const ImageWrapper = styled.div`
  margin-top: 10px;
  background-color: #FFFFFF;
  width: 100%;
  height: 212px;
  box-shadow: var(--ds-shadow-raised, 0 1px 1px rgba(9, 30, 66, 0.25), 0 0 1px 1px rgba(9, 30, 66, 0.13));

  @media (max-width: 768px) {
    height: 120px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

export const AboutWrapper = styled.div`
  padding-top: 20px;
  padding-left: 20px;
  margin-top: 35px;
  height: 605px;
  width: 100%;
  background-color: #FFFFFF;

  @media (max-width: 768px) {
    height: 400px;
  }

  @media (max-width: 480px) {
    height: 300px;
  }
`;

export const ContentWrapper = styled.div`
  margin-top: 60px;
  height: 100%;
  width: 100%;
  background-color: #FFFFFF;
  //border-radius: 3px;
  //box-shadow: var(--ds-shadow-raised, 0 1px 1px rgba(9, 30, 66, 0.25), 0 0 1px 1px rgba(9, 30, 66, 0.13));
`;

export const InsideContentWrapper = styled.div`
  margin: 25px;
`;

export const CoverPictureWrapper = styled.div`
  position: relative;
  width: auto;
  height: 212px;
  margin-left: 200px;
  background-color: #80ffa1;
  background-image: url('/Images/CoverBackground.jpg');
  background-size: cover;
  background-position: center;
  transition: background-color 0.9s ease-in-out 0.9s;

  &:hover {
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(9, 30, 66, 0.54);
      backdrop-filter: blur(2px);
      transition-delay: 0s;
    }

    .update-cover {
      opacity: 1;
    }
  }
`;

export const CircleImage = styled.div`
  position: absolute;
  border: #FFFFFF solid 2.5px;
  bottom: -25%;
  left: 10%;
  transform: translateX(-10%);
  width: 175px;
  height: 175px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;

  &:hover {
    transform: translateX(-30%) scale(1.1);
    transition: transform 0.4s ease-in-out;
  }

  &:hover {
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 50%;
      background-color: rgba(9, 30, 66, 0.54);
      backdrop-filter: blur(2px);
      transition-delay: 0s;
    }

    .update-cover {
      opacity: 1;
    }

`;

export const UpdateCover = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #ffffff;
  font-size: 16px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  margin-left: 40px;

  & svg {
    margin-right: 5px;
  }
`;

export const UpdateProfile = styled.div`
  position: absolute;
  top: 50%;
  left: 15%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #ffffff;
  font-size: 16px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  margin-left: 40px;

  & svg {
    margin-right: 5px;
  }
`;

export const ColumnsForAboutDetails = styled.div`
  display: flex;
  margin-left: 20px;
  align-items: center;
  height: 40px;
`;


export const LabelHeadingWrapper = styled.label`
  font-size: 14px;
  color: rgb(107, 119, 140);
  line-height: 16px;
  vertical-align: middle;
  margin-bottom: 4px;
`;

export const HeadingLabel = styled.span`
  font-weight: 600;
  padding: 0px;
  font-size: 16px;
`;



export const SectionsWrapper = styled.div`
  display: flex;
  border-radius: 3px;
  margin-left: 200px;
  box-shadow: var(--ds-shadow-raised, 0 1px 1px rgba(9, 30, 66, 0.25), 0 0 1px 1px rgba(9, 30, 66, 0.13));
`;


export const CheckboxLabel = styled.label`
  margin-bottom: 7px;
`;

export const ConfigureMessage = styled.p`
  margin-top: -5px;
  font-size: 0.9rem;
`;

export const TaskList = styled.div`
  margin: 8px 0 15px;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  margin-top: -5px;
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

export const SaveButton = styled.button`
  background-color: #0077ff;
  color: white;
  font-size: 16px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: fit-content;
  position: absolute;
  bottom: 20px;
  right: 20px;

  &:hover {
    background-color: #0066cc;
  }

  &:focus {
    outline: none;
  }
`;


export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.1rem;
  margin-right: 10px;
  width: 120px;

`;

export const StyledInput = styled(Input)`
  width: 50%;
  height: 32px;
`;