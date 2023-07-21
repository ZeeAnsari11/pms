import styled from "styled-components";

export const SelectorContainer = styled.div`
    padding: 0.5rem;
    font-size: 1rem;
    margin-bottom: 2%;
    width: 380px;
    :hover {
      //background-color: #EBECF0;
    }
`;

export const SelectorLabel = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    border: 2px solid #ccc;
    border-radius: 5px;
    padding: 0 16px;
    cursor: pointer;
    background-color: #FAFBFC;
    :hover {
        background-color: ${({ isBlue }) => (isBlue ? "#0000DD" : "#EBECF0")};
    }
`;

export const SelectorArrow = styled.div`
    width: 0;
    height: 0;
    margin-left: 8px;
    border-top: 6px solid #888;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
    transform: ${(props) => (props.open ? "rotate(180deg)" : "rotate(0deg)")};
    transition: transform 0.2s ease-in-out;
`;

export const OptionsContainer = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 29%;
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0 0 4px 4px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1;
    margin-left: 453.5px;
`;

export const Option = styled.div`
    padding: 8px;
    cursor: pointer;
    background-color: ${(props) => (props.selected ? "#DEECFF" : "transparent")};
    &:hover {
        background-color: #eee;
    }
`;