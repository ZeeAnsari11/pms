import styled from "styled-components";

export const ForgotPasswordContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--primary-color);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 10px;
    border: 2px solid var(--primary-color);
    padding: 20px;
    width: 510px;
    height: 300px;
`;

export const Button = styled.button`
    width: 255px;
    border: none;
    border-radius: 20px;
    background-color: var(--primary-color);
    cursor: pointer;
    transition: all 0.3s ease-in-out 0s;
    font-size: 13px;
    font-weight: bolder;
    padding: 12px 49px;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-right: 55px;

    &:last-child {
        margin-left: 54px;
    }

    &:hover {
        background-color: #000000;
        color: #ffffff;
        border-color: whitesmoke;
    }
`;