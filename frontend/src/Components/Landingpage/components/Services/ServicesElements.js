import styled from 'styled-components';

export const ServicesContainer = styled.div`
  padding: 100px 0;
  background: #fff;
`;

export const ServicesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
`;

export const ServicesCard = styled.div`
  background: #fafbfc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  max-width: 300px;
  padding: 30px;
  margin: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    cursor: pointer;
  }
`;

export const ServicesIcon = styled.img`
  height: 160px;
  width: 160px;
  margin-bottom: 10px;
`;

export const ServicesH1 = styled.h1`
  font-size: 2.5rem;
  color: #000;
  text-align: center;
  margin-bottom: 64px;

  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const ServicesH2 = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #000;
`;

export const ServicesP = styled.p`
  font-size: 1rem;
  text-align: center;
  color: #000;
`;
