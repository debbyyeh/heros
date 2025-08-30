import styled from "styled-components";

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

    @media (max-width: 768px) {
        position: static;
        width: auto;
        margin-top: 12px;
    }

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
  
  >button{
        padding: 8px 12px;
        font-size: 20px;
        min-width: 30px;
    }

    @media (max-width: 400px) {
        justify-content: space-around;
    }
`

export const SaveBtn = styled.button<{$waiting:boolean}>`
    background-color: ${({ $waiting }) => ($waiting ? "#ccc" : "#4caf50")};
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
`

export const ItemValue = styled.div`
    min-width: 24px;
    font-size: 18px;
`