import styled from "styled-components";

export const CardContainer = styled.div`
  position: relative;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #fff;
  border-radius: 10px;
`;

export const CardTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

export const CardTopMore = styled.div`
  width: 30px;
  height: 20px;
  transform: translateX(15px);
  flex: 1;
  float: right;
  cursor: pointer;
  opacity: 0;
  transition: 200ms;
  text-align: right;
  margin-right: 10px;

  &:hover {
    opacity: 1;
  }
`;


export const CardTitle = styled.div`
  flex: 1;
  font-weight: bold;
  font-size: 1rem;
  line-height: 1.4rem;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    font-weight: 700;
    font-size: 1rem;
    color: gray;
    text-transform: uppercase;
    cursor: pointer;
  }
`;

export const CardProfile = styled.div`
  text-align: end;
  z-index: 1;
  margin-left: 175px;
  margin-top: -60px;

  &:hover .card_profile_name {
    opacity: 1;
  }
`;

export const CardProfileName = styled.div`
  opacity: 0;
`;