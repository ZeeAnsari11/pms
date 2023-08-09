import React, {useState} from 'react';
import {
    CoverContainer,

    CoverContent,
    CoverH1,
    CoverP,
    CoverBtnWrapper,
    ArrowForward,
    ArrowRight
} from './CoverElements';
import {Button} from '../ButtonElements';

const CoverSection = () => {
    const [hover, setHover] = useState(false);

    const onHover = () => {
        setHover(!hover);
    };

    return (
        <CoverContainer>
            <CoverContent>
                <CoverH1>ProjeX - A project Management Application</CoverH1>
                <CoverP>Sign up for a new account today and consume awesome features from our website.</CoverP>
                <CoverBtnWrapper>
                    <Button to="signup" onMouseEnter={onHover} onMouseLeave={onHover} primary='true' dark='true'>
                        Get started {hover ? <ArrowForward/> : <ArrowRight/>}
                    </Button>
                </CoverBtnWrapper>
            </CoverContent>
        </CoverContainer>
    );
};

export default CoverSection;
