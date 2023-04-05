import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const options = [
  { id: 1, label: "Option 1" },
  { id: 2, label: "Option 2" },
  { id: 3, label: "Option 3" },
];

const SelectorContainer = styled.div`
  padding: 0.5rem;
  font-size: 1rem;
  margin-bottom: 2%;
  width: 380px;
  :hover {
    //background-color: #EBECF0;
  }
`;

const SelectorLabel = styled.div`
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

const SelectorArrow = styled.div`
  width: 0;
  height: 0;
  margin-left: 8px;
  border-top: 6px solid #888;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  transform: ${(props) => (props.open ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.2s ease-in-out;
`;

const OptionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 29.5%;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
  margin-left: 450px;
`;

const Option = styled.div`
  padding: 8px;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#DEECFF" : "transparent")};
  &:hover {
    background-color: #eee;
  }
`;

const Selector = () => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleSelectorClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SelectorContainer ref={containerRef}>
      <SelectorLabel onClick={handleSelectorClick}>
        {selectedOption.label}
        <SelectorArrow open={isOpen} />
      </SelectorLabel>
      {isOpen && (
        <OptionsContainer>
          {options.map((option) => (
            <Option
              key={option.id}
              onClick={() => handleOptionClick(option)}
              selected={option.id === selectedOption.id}
            >
              {option.label}
            </Option>
          ))}
        </OptionsContainer>
      )}
    </SelectorContainer>
  );
};

export default Selector;
