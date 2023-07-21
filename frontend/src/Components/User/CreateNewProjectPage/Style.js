import styled from "styled-components";
import ReactQuill from "react-quill";

export const PageWrapper = styled.div`
    background-color: #fff;
    height: 100vh;
    padding: 0 20% 0 20%;
`;

export const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
`;

export const Details = styled.h1`
    margin-top: 50px;
`;


export const Input = styled.input`
    border: 2px solid #ccc;
    border-radius: 5px;
    padding: 0.5rem;
    font-size: 1rem;
    //width: 40%;
    margin-bottom: 2%;
    background-color: #FAFBFC;
    width: 359px;

    :hover {
        background-color: #EBECF0;
    }
`;


export const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
`;

export const LabelForProject = styled.label`
    font-weight: bold;
    margin-bottom: 0.5rem;
    margin-right: 305px;
`;

export const LabelForDescriptionBoc = styled.label`
    font-weight: bold;
    margin-bottom: 0.5rem;
    margin-right: 270px;
`;

export const LabelforLead = styled.label`
    font-weight: bold;
    margin-bottom: 0.5rem;
    margin-top: 10px;
    margin-right: 265px;
`;


export const LabelForCompany = styled.label`
    font-weight: bold;
    margin-bottom: 0.5rem;
    margin-right: 287px;
`;

export const Description = styled.p`
    font-size: 0.7rem;
    color: #555;
    //margin-top: 0.5rem;
    margin-top: 5px;
`;

export const LabelforCategory = styled.label`
    font-weight: bold;
    margin-bottom: 0.5rem;
    margin-right: 288px;
`;


export const LabelforAssignees = styled.label`
    font-weight: bold;
    margin-bottom: 0.5rem;
    margin-right: 288px;
    margin-top: 0.5rem;
`;

export const SaveButton = styled.button`
    background-color: #0062FF;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.5rem 1rem;
    margin-top: 1rem;
    margin-bottom: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    margin-right: 310px;

    &:hover {
        background-color: #3e81ed;
    }
`;

export const StyledReactQuill = styled(ReactQuill)`
    width: 55%;
    max-width: 45%;

    .ql-toolbar {
        //width: 100%;
        position: relative;
        z-index: 1;
        margin-left: -14px;
        width: 109%;
    }

    .ql-container {
        box-sizing: border-box;
        //width: 100%;
        height: 100%;
        font-size: 16px;
        line-height: 1.4;
        padding: 12px 15px;
        overflow-y: auto;
        overflow-x: hidden;
        background-color: #fff;
        border: 1px solid #ced4da;
        border-radius: 4px;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        margin-left: -14px;
        width: 109%;

    &:focus {
        outline: 0;
        border-color: #80bdff;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    } 
    }

    @media (max-width: 768px) {
        width: 100%;
    }
    padding-bottom: 10px;
`;
