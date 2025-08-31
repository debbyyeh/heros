import styled from "styled-components";

export const Button = styled.button<{ $cancel?: boolean }>`
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background-color: ${({ $cancel }) => ($cancel ? "#ccc" : "#646cff")};
  color: ${({ $cancel }) => ($cancel ? "#333" : "#fff")};
`;

interface AddButtonProps {
    size: number; 
}
  
export const AddButton = styled(Button)<AddButtonProps>`
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background-color:rgba(142, 154, 172, 0.345);

    &:hover {
        background-color: black;
        color: white;
    }

    &:disabled{
        opacity:0.2;
    }
`;

export const SaveBtn = styled.button<{$waiting:boolean}>`
    background-color: ${({ $waiting }) => ($waiting ? "#ccc" : "#646cff")};
    cursor: ${({ $waiting }) => ($waiting ? "not-allowed" : "pointer")};
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    margin-top: 12px;
    &:hover {
        background-color: #535bf2;
    }
    &:disabled {
        opacity: 0.2;
        cursor: not-allowed;
    }
`