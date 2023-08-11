import styled from 'styled-components';
import {Link as LinkR} from "react-router-dom";

export const PricingContainer = styled.div`
  padding: 100px 0;
  background: #fff;
`;

export const PricingWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const PricingCard = styled.div`
  background: #fafbfc;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  margin-right: 20px;
  padding: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;
  flex: 1;

  &:hover {
    transform: scale(1.02);
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    margin-bottom: 20px;
    height: 500px; 
    padding: 20px;
  }
`;


export const PricingH1 = styled.h1`
  font-size: 2.5rem;
  color: #000;
  margin-bottom: 64px;
  text-align: center;

  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const PricingH2 = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #000;
`;


export const PricingH3 = styled.h2`
  font-size: 1rem;
  margin-bottom: 10px;
  color: #000;
  font-weight: bold;
`;
export const PricingP = styled.p`
  font-size: 1rem;
  text-align: center;
  color: #000;
`;


export const Pricingul = styled.ul`
  font-size: 1rem;
  text-align: left;
  color: #000;
  list-style: none;
  padding-left: 0;

  li {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    svg {
      margin-right: 8px;
    }
  }
`;


export const Pricingli = styled.li`
  font-size: 1rem;
  text-align: left;
  color: #000;
`;


export const PricingBtn = styled(LinkR)`
  border-radius: 5px;
  background: #1677FF;
  white-space: nowrap;
  padding: 10px 22px;
  color: #010606;
  font-size: 16px;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #000;
    color: #fff;
  }
`;