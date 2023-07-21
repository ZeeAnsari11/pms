import React from 'react';
import {X} from 'react-feather';
import * as ChipComponents from "./Style"


function Chip(props) {
    return (
        <ChipComponents.StyledChip color={props.color}>
            {props.text}
            {props.close && (
                <X onClick={() => (props.onClose ? props.onClose() : '')}/>
            )}
        </ChipComponents.StyledChip>
    );
}

export default Chip;
