import styled from "styled-components";

interface HeroCardProps {
    $selected?: boolean;
    $showAll?: boolean;
  }

export const SubTitle = styled.h2`
    margin: 0;
    margin-bottom: 16px;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
`
export const Note = styled.p`
    font-size: 20px;
    color: #fff;
    margin: 20px auto;
`

export const HeroesListContainer = styled.div`
  display: grid;
  gap:16px;
  width: 100%;
  margin: 0 auto;
  position:relative;
  
  @media (max-width: 767px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    max-width: calc(100vw - 40px);
  }

  @media (min-width: 768px) and (max-width: 1199px) {
    grid-template-columns: repeat(4, 1fr);
    max-width: 768px;
  }
  @media (min-width: 1200px) and (max-width: 1439px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    max-width: 1200px;
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    max-width: 1280px;
  }
  
`
export const HeroCard = styled.div<HeroCardProps>`
  cursor: pointer;
  border: 3px solid ${({ $selected }) => ($selected ? "#646cff" : "#ccc")};
  opacity: ${({ $selected, $showAll }) => ($showAll || $selected ? 1 : 0.2)};
  border-radius: 8px;
  padding: 16px;
  transition: border-color 0.25s;
  text-align: center;

  &:hover {
    border-color: #646cff;
    img{
        transform: scale(1.1); 
    }
  }

  img{
    ${({ $selected }) => ($selected ? "transform: scale(1.1);" : "")}
  }
`

export const HeroImageWrapper = styled.div`
  width: 100%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
    border-radius: 8px;
  }

`

export const ProfileContainer = styled.div`
    border: 2px solid #ccc;
    padding: 16px;
    display: flex;
    align-items: flex-end;

`

export const ProfileInfo = styled.div`
    width: 50%;
`

export const PointInfo = styled.div`
    width: 50%;
    font-size: 25px;
    >button{
        margin-top: 12px;
        min-width: 160px;
    }
`

export const ProfileItemContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    gap: 8px;
`

export const ItemTitle = styled.div`
    width: 60px;    
    font-size: 22px;
`

export const ItemValue = styled.div`
    min-width: 24px;
    font-size: 18px;
`