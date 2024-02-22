import styled from "styled-components";

export const ContainerForm = styled.form`
    display: flex;
    justify-content: center;
    gap: 20px;
    width: 80%;
    padding-bottom: 20px;
    padding-top: 20px;

    input[type="text"] {
        padding: 8px;
        margin-right: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;

        &:focus{
            outline: 2px solid #13678A;
        }
    }   
`;

export const ButtonSubmit = styled.button`
   
        padding: 8px 16px;
        background-color: #13678A;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        outline: none;

        &:hover {
            background-color: #9AEBA3;
        }
`;