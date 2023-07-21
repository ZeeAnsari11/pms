import styled from "styled-components";

export const CoverPictureWrapper = styled.div`
  width: 100%;
  height: 112px;
  background-color: #80ffa1;
  position: relative;

  &:hover {
    background-color: #64838C;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url(${props => props.backgroundImage});
      filter: blur(8px);
      z-index: -1;
    }

    .uploader {
      display: block;
    }
  }

  .uploader {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;