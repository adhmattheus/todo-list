import styled from "styled-components";

export const ModalWrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #45C4B0;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20%;
`;

export const InputField = styled.input`
    padding: 8px;     
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    width: 100%;
`;

export const OptionButton = styled.div`
    padding-top: 10px;
    display: flex;
    justify-content: space-around;
    gap: 20px;
`;

export const Button = styled.button`
    padding: 6px 14px;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
    background-color: #DAFDBA;
    &:hover {
            background-color: #012030;
            color: white;
        }
    color: black;
    border: none;
`;

export const CancelButton = styled(Button)`
    background-color: #D11A2A ;
    color: white;
    &:hover {
            background-color: red;
        }
`;
