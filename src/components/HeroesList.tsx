import type { Hero } from "../domain/heroStore";
import { useNavigate } from "react-router-dom"
import { HeroCard, HeroesListContainer, HeroImageWrapper } from "./card";

export default function HeroesList({allHeroes, id, children}: {allHeroes:Hero[], id?:string, children: React.ReactNode}) {

    const navigate = useNavigate();

    return (
        <HeroesListContainer>
            {allHeroes.map(hero => (
                <HeroCard key={`hero_${hero.id}`} 
                    onClick={() => navigate(`/heroes/${hero.id}`)}
                    $showAll={id === undefined}
                    $selected={id === hero.id}
                >
                    <HeroImageWrapper>
                        <img src={hero.image} alt={hero.name} />
                    </HeroImageWrapper>
                    <h2>{hero.name}</h2>
                </HeroCard>
            ))}
            {children}
        </HeroesListContainer>
    )
}