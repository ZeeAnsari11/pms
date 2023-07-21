import React, { useState, useRef, useEffect } from "react";
import * as SelectComponent from "./style"

const options = [
  { id: 1, label: "Option 1" },
  { id: 2, label: "Option 2" },
  { id: 3, label: "Option 3" },
];

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
    <SelectComponent.SelectorContainer ref={containerRef}>
      <SelectComponent.SelectorLabel onClick={handleSelectorClick}>
        {selectedOption.label}
        <SelectComponent.SelectorArrow open={isOpen} />
      </SelectComponent.SelectorLabel>
      {isOpen && (
        <SelectComponent.OptionsContainer>
          {options.map((option) => (
            <SelectComponent.Option
              key={option.id}
              onClick={() => handleOptionClick(option)}
              selected={option.id === selectedOption.id}
            >
              {option.label}
            </SelectComponent.Option>
          ))}
        </SelectComponent.OptionsContainer>
      )}
    </SelectComponent.SelectorContainer>
  );
};

export default Selector;
