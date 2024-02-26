import styled from "styled-components";

interface ButtonProps {
    status: string;
}


export const BaseButton = styled.button`
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 4px;
    width: 50px; 
    font-size: 15px;
`;

export const CompleteButton = styled(BaseButton) <ButtonProps>`
    background-color: ${({ status }) => status === 'open' ? '#45C4B0' : '#012030'};

    &:hover {
        background-color: ${({ status }) => status === 'open' ? '#3a9a87' : '#014457'};
    }
`;

export const DeleteButton = styled(BaseButton)`
    background-color: #D11A2A ;
    &:hover {
            background-color: red;
        };   
`;

export const EditButton = styled(BaseButton)`
    background-color: #9AEBA3;
    &:hover {
            background-color: #DAFDBA;
        }
`;