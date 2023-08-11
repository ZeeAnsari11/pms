import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';
import { Link as LinkS } from 'react-scroll';
import {Modal} from "antd";

export const Nav = styled.nav`
  background: ${({ scrollNav }) => (scrollNav ? '#FAFBFC' : '#FAFBFC')};;
  height: 80px;
  margin-top: -80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 15px;
  max-width: 1100px;
`;

export const StyleModal = styled(Modal)`
  padding: unset;
`;

export const NavLogo = styled(LinkR)`
  color: #000;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 2.0rem;
  display: flex;
  align-items: center;
  margin-left: 5px;
  font-weight: bold;
  text-decoration: none;
`;

export const LogoImage = styled.img`
  max-width: 200px;
  margin-left: -8px;
  height: auto;
  cursor: pointer;
`;

export const Logo = styled.img`
  margin: 4px 5px 3px 5px;
  max-width: 100px;
  height: auto;
  cursor: pointer;
`;

export const MenuIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #fff;
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  /* margin-right: -22px; */

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.li`
  height: 80px;
`;

export const NavLink = styled(LinkS)`
  color: #000;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &.active {
    border-bottom: 3px solid #1677FF;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(LinkR)`
  border-radius: 50px;
  background: #1677FF;
  white-space: nowrap;
  padding: 10px 22px;
  color: #010606;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #000;
    color: #fff;
  }
`;

export const CustomModal = styled(Modal)`
  .ant-modal-content {
    padding: 0px;
  }
`;

