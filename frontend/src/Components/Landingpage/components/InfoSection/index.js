import React, {useState} from 'react';
import {Button, ButtonfromReactRouter} from '../ButtonElements';
import {
    InfoContainer,
    InfoWrapper,
    InfoRow,
    Column1,
    Column2,
    TextWrapper,
    TopLine,
    Heading,
    Subtitle,
    BtnWrap,
    Img,
    ImgWrap,
    CustomModal
} from './InfoElements';
import Login from "../../../User/Login";

const InfoSection = ({
                         lightBg,
                         id,
                         imgStart,
                         topLine,
                         lightText,
                         headline,
                         darkText,
                         description,
                         buttonLabel,
                         img,
                         alt,
                         primary,
                         dark,
                         dark2,
                         buttonUrl,
                         scroll
                     }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const showModal = () => {
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };
    return (
        <>
            <InfoContainer lightBg={lightBg} id={id}>
                <InfoWrapper>
                    <InfoRow imgStart={imgStart}>
                        <Column1>
                            <TextWrapper>
                                <TopLine>{topLine}</TopLine>
                                <Heading lightText={lightText}>{headline}</Heading>
                                <Subtitle darkText={darkText}>{description}</Subtitle>
                                <BtnWrap>
                                    {scroll ? (
                                        <Button
                                            to={buttonUrl}
                                            smooth={true}
                                            duration={500}
                                            spy={true}
                                            exact='true'
                                            offset={-80}
                                            primary={primary ? 1 : 0}
                                            dark={dark ? 1 : 0}
                                            dark2={dark2 ? 1 : 0}
                                        >
                                            {buttonLabel}
                                        </Button>
                                    ) : (
                                        <ButtonfromReactRouter
                                            onClick={showModal}
                                        >
                                            {buttonLabel}
                                        </ButtonfromReactRouter>
                                    )}
                                </BtnWrap>
                                <CustomModal
                                    open={modalVisible}
                                    onCancel={hideModal}
                                    footer={null}
                                    width={'fit-content'}
                                    destroyOnClose
                                    maskClosable={true}
                                    closeIcon={false}
                                >
                                    <Login/>
                                </CustomModal>
                            </TextWrapper>
                        </Column1>
                        <Column2>
                            <ImgWrap>
                                <Img src={img} alt={alt}/>
                            </ImgWrap>
                        </Column2>
                    </InfoRow>
                </InfoWrapper>
            </InfoContainer>
        </>
    );
};

export default InfoSection;
