import styled from "styled-components";
import {Link} from "react-router-dom";

export const NavbarContainer = styled.nav`
  position: fixed;
  width: 100%;
  height: ${(props) => (props.extendNavbar ? "100vh" : "80px")};
  background-color: #FAFBFC;
  display: flex;
  flex-direction: column;
  @media (min-width: 700px) {
    height: 45px;
  }
  border: 1px solid black;
  z-index: 1;
`;

export const Button = styled.button`
  padding: 8px 20px;
  border-radius: 4px;
  margin-left: 10px;
  outline: none;
  border: none;
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
  color: white;
  cursor: pointer;
  background-color: #1E64D1;
`;

export const LeftContainer = styled.div`
  flex: 70%;
  display: flex;
  align-items: center;
`;

export const RightContainer = styled.div`
  flex: 30%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 30px;
`;

export const NavbarInnerContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
`;

export const NavbarLinkContainer = styled.div`
  display: flex;
`;

export const NavbarLink = styled(Link)`
  color: white;
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  font-weight: 400;
  margin: 10px;
  @media (max-width: 700px) {
    display: none;
  }
`;

export const NavbarLinkExtended = styled(Link)`
  color: white;
  font-size: x-large;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin: 10px;
`;

export const Logo = styled.img`
  max-width: 100px;
  height: auto;
  cursor: pointer;
`;

export const OpenLinksButton = styled.button`
  width: 70px;
  height: 50px;
  background: none;
  border: none;
  color: white;
  font-size: 45px;
  cursor: pointer;
  @media (min-width: 700px) {
    display: none;
  }
`;

export const NavbarExtendedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 700px) {
    display: none;
  }
`;