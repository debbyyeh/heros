import type { Hero } from "../domain/heroStore";
import { useNavigate } from "react-router-dom"
import { HeroCard, HeroesListContainer, HeroImageWrapper } from "./card";

export default function HeroesList({currentHeroes}: {currentHeroes:Hero[]}) {

    const navigate = useNavigate();
    function onClick(id:string){
        navigate(`/heroes/${id}`)
    }

    return (
        <HeroesListContainer>
            {currentHeroes.map(hero => (
                <HeroCard key={`hero_${hero.id}`} onClick={() => onClick(hero.id)}>
                    <HeroImageWrapper>
                        <img src={hero.image} alt={hero.name} />
                    </HeroImageWrapper>
                    <h2>{hero.name}</h2>
                </HeroCard>
            ))}
        </HeroesListContainer>
    )
}