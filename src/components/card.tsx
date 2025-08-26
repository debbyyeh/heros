import styled from "styled-components";

export const SubTitle = styled.h2`
    margin: 0;
    margin-bottom: 16px;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
`

export const HeroesListContainer = styled.div`
  display: grid;
  gap:16px;
  width: 100%;
  margin: 0 auto;
  
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
export const HeroCard = styled.div`
  cursor: pointer;
  border: 3px solid #ccc;
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
`

export const HeroImageWrapper = styled.div`
  width: 100%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }

`