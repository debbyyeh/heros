import { useNavigate } from "react-router-dom"
import type { Hero } from "../../domain/heroStore";
import { HeroCard, HeroesListContainer, HeroImageWrapper } from "./style";
import { ProfileContainer } from "../heroProfileList/style";

export default function HeroesList({allHeroes, id, children}: {allHeroes:Hero[], id?:string, children: React.ReactNode}) {

    const navigate = useNavigate();
    //TODO:切換頁面時假設剩餘能力點數不為0，會跳出警告視窗，並且不儲存修改內容

    return (
        <HeroesListContainer>
            {allHeroes.map(hero => {
                const isSelected = id === hero.id;
                return(
                    <div key={`card_${hero.id}`}>
                        <HeroCard key={`hero_${hero.id}`} 
                            onClick={() => navigate(`/heroes/${hero.id}`)}
                            $showAll={id === undefined}
                            $selected={id === hero.id}
                        >
                            <HeroImageWrapper $selected={id === hero.id}>
                                <img src={hero.image} alt={hero.name} />
                            </HeroImageWrapper>
                            <h2>{hero.name}</h2>
                        </HeroCard>
                        <ProfileContainer $selected={id === hero.id}>
                          { isSelected && children}
                        </ProfileContainer>
                    </div>
                )
            })}
        </HeroesListContainer>
    )
}