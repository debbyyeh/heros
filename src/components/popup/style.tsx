import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const PopupContainer = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 12px;
  max-width: 300px;
  text-align: center;
`;

export const Message = styled.div`
color: #333;
  margin-bottom: 16px;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const Button = styled.button<{ $cancel?: boolean }>`
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background-color: ${({ $cancel }) => ($cancel ? "#ccc" : "#646cff")};
  color: ${({ $cancel }) => ($cancel ? "#333" : "#fff")};
`;