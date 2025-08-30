import styled from "styled-components";
import { Button as BaseButton } from "../popup/style.tsx";

interface ProfileContainerProps {
  $selected?: boolean;
  $extendToRight?: boolean;
}

export const ProfileContainer = styled.div<ProfileContainerProps>`
    border: 2px solid #ccc;
    padding: 16px;

    margin: 20px auto 0; 
    transform-origin: top;
    transform: ${({ $selected }) => ($selected ? "scaleY(1)" : "scaleY(0)")};    
    transition: transform 0.3s ease;
    max-height: ${({ $selected }) => ($selected ? "400px" : "0")};
    position: absolute;
    width: 150%;
    right: 0;
    ${({ $extendToRight }) =>
        $extendToRight &&
        `
            left: 0;
            right: auto;
        `}

    

    &::before {
        content:'';
        position: absolute;
        top:-15px;
        right:10px;
        ${({ $extendToRight }) =>
            $extendToRight
                ? `
                    right: auto;
                    left: 10px;
                `
                : ''}
        width: 0;
        height: 0;
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
        border-bottom: 15px solid #ccc;
    }

    @media (max-width: 767px) {
        position: static;
        width: auto;
        margin-top: 12px;

        &::before{
            left: 10px;
            right: auto;
        }
    }
`

export const ProfileContent = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    @media (max-width: 600px) {
        flex-direction: column;
        align-items: center;
        width: 100%;
    }
`

export const PopupMsg = styled.div`
  min-height: 300px;
`

export const ProfileInfo = styled.div`
    width: 55%;
    @media (max-width: 600px) {
        width: 100%;
    }
    
`

export const PointInfo = styled.div`
    width: 40%;
    margin-top: 12px;

    @media (max-width: 600px) {
        width: 100%;
        margin-top: 24px;
    }
`


export const ProfileInfoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:not(:last-child){
    margin-bottom: 12px;
  }
`

interface AddButtonProps {
    size: number; 
  }
  
  export const AddButton = styled(BaseButton)<AddButtonProps>`
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
        background-color: #ccc;
        cursor: not-allowed;
    }
`

export const ItemTitle = styled.div`
    font-size: 20px;
    min-width: 40px;
    flex: 1;
`

export const ItemValue = styled.input`
    min-width: 24px;
    font-size: 18px;
    height: auto;
    font-size: 22px;
    margin: 10px;
    caret-color: #646cff;
    outline: none;
    border: none;
    text-align: center;
    background-color: #242424;
    border-bottom: 1px solid #ccc;
    flex:2;
    appearance: textfield; /* Standard property for compatibility */
    -moz-appearance: textfield; /* Firefox 移除箭頭 */
  
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none; /* Chrome, Safari, Edge 移除箭頭 */
        margin: 0;
    }
`

export const Warning = styled.p`
    font-size: 18px;
    color: #ff4d4f;
    margin: 12px auto 0;

    @media (max-width: 768px) {
        font-size: 14px;
        margin: 12px auto ;
    }
`