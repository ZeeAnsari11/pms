import styled from "styled-components";

export const ProfileWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
  flex-direction: column;
  align-items: center;
`;

export const ProfileHeader = styled.header`
  background-color: #0052CC;
  width: 100%;
  margin-top: 40px;
  padding: 30px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid whitesmoke;
  object-fit: cover;
  margin-right: 20px;
  margin-left: 30px;
`;

export const EditIcon = styled.i`
  margin-left: 20px;
  padding: 7px;
  background-color: #fff;
  border-radius: 50%;
  color: #0052CC;
  cursor: pointer;
  margin-right: 10px;

  @media (max-width: 768px) {
    margin-top: 20px;
    margin-left: 0;
  }
`;

export const ProfileName = styled.h2`
  font-size: 32px;
  margin-left: 20px;
  color: whitesmoke;
  margin-right: 900px;

  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;

export const ProfileEmail = styled.p`
  font-size: 18px;
  margin-top: 10px;
  color: whitesmoke;
  padding-left: 23px;


  @media (max-width: 768px) {
    margin: 0;
  }
`;

export const ProfileDetailsWrapper = styled.div`
  width: 96%;
  margin-top: 40px;

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 30px;
  }
`;

export const ProfileDetailsLabel = styled.label`
  font-size: 24px;
  font-weight: bold;
  color: #172B4D;
  display: block;
  margin-bottom: 10px;
`;

export const ProfileDetailsValue = styled.p`
  font-size: 18px;
  color: #666;
`;

export const DateValue = styled.p`
  font-size: 18px;
  color: #666;
`;

export const PersonalDetailHeading = styled.p`
  font-size: 18px;
  color: #0052CC;
  margin-right: 1000px;
  font-weight: bolder;

  @media (max-width: 768px) {
    margin: 5px 0;
  }
`;

export const HorizontalLine = styled.div`
  width: 100%;
  height: 3px;
  background-color: lightgray;
  position: relative;
  margin-bottom: 20px;

  ::before {
    content: "";
    width: 14.5%;
    height: 2px;
    background-color: #0a6cf8;
    position: absolute;
    top: 0;
    left: 0;
  }
`;
