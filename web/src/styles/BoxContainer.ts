import styled from "styled-components";

interface ButtonProps {
    status: string; 
}

export const BoxContainer = styled.div`
    width: 80%;
    color: white;
    background-color: white;
    border-radius: 10px;
    margin-bottom: 10px;
`;

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 40px;
    align-items: center;
    background-color: #13678A;
    border-radius: 10px 10px 0 0      
`;

export const TasksDiv = styled.div`
    padding-left: 3%;
    font-size: 18px;
`;
export const ActionsDiv = styled.div`
    padding-right: 3%;
    font-size: 18px;
`;

export const DataContainer = styled.div`
    color: black;
    display: flex;
    height: auto;
    justify-content: space-between;
    align-items: center;
    padding: 12px;  
    
`;

export const TitleDiv = styled.div`

    
`;

export const ButtonDiv = styled.div`
    width: 35%;
    display: flex;
    justify-content: flex-end;
    gap: 20px;
    
`;

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