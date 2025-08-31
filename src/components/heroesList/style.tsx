import styled from "styled-components";

interface HeroCardProps {
    $selected?: boolean;
    $showAll?: boolean;
}

export const Note = styled.p`
    font-size: 20px;
    color: #fff;
    margin: 15px auto;

    @media (max-width: 768px) {
        font-size: 16px;
        margin: 10px auto;
    }
`

export const HeroesListContainer = styled.div`
  background-color: #4a4646;
  padding: 20px;

  display: grid;
  gap:16px;
  margin: 0 auto;

  
  @media (max-width: 767px) {
    background-color: transparent;
    padding: 0;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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

  /* 手機版上讓圖片縮小，這樣就不用另外將畫面往下滑就可以調整數據 */
  @media (max-width: 767px) {
    width: ${({ $selected }) => ($selected ? "80px" : "")};
    height: ${({ $selected }) => ($selected ? "80px" : "auto")};
    border-radius: ${({ $selected }) => ($selected ? "50%" : "")};
    margin: 0 auto;

    h2 {
      display: ${({ $selected }) => ($selected ? "none" : "block")};
    }
  }

`

export const HeroImageWrapper = styled.div<HeroCardProps>`
  width: 100%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
    border-radius: 8px;
  }

  @media (max-width: 767px) {
    img{
      border-radius: ${({ $selected }) => ($selected ? "50%" : "")};
    }
   
  }

`