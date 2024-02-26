import { Button, Form } from "antd";
import styled from "styled-components";

export const DivForm = styled(Form)`
    display: flex;
    flex-direction: row;    
`;

export const ButtonSubmit = styled(Button)`
                padding: 8px 16px !important;
        background-color: #13678A !important;
        color: #fff !important;
        border: none !important;
        border-radius: 4px !important;
        cursor: pointer !important;
        outline: none !important;

        :hover {
            background-color: #9AEBA3;
        }
`;