import React from 'react';
import {Spin} from 'antd';
import styled from 'styled-components';

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Loader = ({loadingTipText}) => {
    return (
        <LoaderContainer>
            <Spin tip={loadingTipText || "Loading..."} size="large"/>
        </LoaderContainer>
    );
};

export default Loader;
