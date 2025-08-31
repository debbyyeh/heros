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



    &::before {
        content:'';
        position: absolute;
        top:-15px;
        left:0px;
        width: 0;
        height: 0;
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
        border-bottom: 15px solid #ccc;
    }

    @media (max-width: 767px) {
        margin-top: 12px;
        max-height: ${({ $selected }) => ($selected ? "450px" : "0")};

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


export const Warning = styled.p`
    font-size: 18px;
    color: #ff4d4f;
    margin: 12px auto 0;

    @media (max-width: 768px) {
        font-size: 14px;
        margin: 12px auto ;
    }
`