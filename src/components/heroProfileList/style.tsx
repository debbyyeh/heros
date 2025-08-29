import styled from "styled-components";

interface ProfileContainerProps {
  $selected?: boolean;
}

export const ProfileContainer = styled.div<ProfileContainerProps>`
    border: 2px solid #ccc;
    padding: 16px;

    margin: 20px auto 0; 
    transform-origin: top;
    transform: ${({ $selected }) => ($selected ? "scaleY(1)" : "scaleY(0)")};    
    transition: transform 0.3s ease;
    max-height: ${({ $selected }) => ($selected ? "400px" : "0")};
    position: relative;

    &::before {
        content:'';
        position: absolute;
        top:-15px;
        left:10px;
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
    width: 50%;
    @media (max-width: 600px) {
        width: 100%;
    }
    
`

export const PointInfo = styled.div`
    width: 50%;
    margin-top: 12px;
    >button{
        margin-top: 12px;
        min-width: 80px;
    }
    @media (max-width: 600px) {
        width: 100%;
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
        padding: 8px;
        font-size: 20px;
        min-width: 30px;
    }
`

export const ItemTitle = styled.div`
    width: 60px;    
    font-size: 22px;
`

export const ItemValue = styled.div`
    min-width: 24px;
    font-size: 18px;
`