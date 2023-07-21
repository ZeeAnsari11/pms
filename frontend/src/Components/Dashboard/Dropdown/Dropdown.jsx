import React, {useEffect, useRef} from 'react';
import * as DropdownComponents from "./Style"


function Dropdown(props) {
    const dropdownRef = useRef();

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            // props.onClose();
            console.log("handleClickOutside Clicked")
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <DropdownComponents.StyledDropdown ref={dropdownRef} className={props.class}>
            {props.children}
        </DropdownComponents.StyledDropdown>
    );
}

export default Dropdown;
