import { useNavigate } from "react-router-dom"
import { useHeroStore, type Hero } from "../../domain/heroStore";
import { HeroCard, HeroesListContainer, HeroImageWrapper } from "./style";
import { ProfileContainer } from "../heroProfileList/style";

export default function HeroesList({allHeroes, id, children}: {allHeroes:Hero[], id:string, children: React.ReactNode}) {

    const navigate = useNavigate();
    const isEditing = useHeroStore(state => state.isEditingData(state, id));
    const setTempData = useHeroStore(state => state.setTempData);
    const heroesList = useHeroStore(state => state.heroesList);

    
    //ASK:切換頁面時假設剩餘能力點數不為0或者tempData跟原資料不同，會跳出警告視窗，並且不儲存修改內容
    const handleLeaveHero = (linkHeroId:string) => {
        if (isEditing) {
          const confirmLeave = window.confirm("你有未儲存的修改，確定要離開嗎？");
          if (!confirmLeave) {
            return;
          }
        }
        if (id && heroesList[id]?.profile){
            setTempData(id, heroesList[id].profile!);
        }
        navigate(`/heroes/${linkHeroId}`);
    };

    return (
        <HeroesListContainer>
            {allHeroes.map((hero, index) => {
                const isSelected = id === hero.id;
                return(
                    <div key={`card_${hero.id}`} style={{position:'relative'

                    }}>
                        <HeroCard key={`hero_${hero.id}`} 
                            onClick={() => {handleLeaveHero(hero.id)}}
                            $showAll={id === undefined}
                            $selected={id === hero.id}
                        >
                            <HeroImageWrapper $selected={id === hero.id}>
                                <img src={hero.image} alt={hero.name} />
                            </HeroImageWrapper>
                            <h2>{hero.name}</h2>
                        </HeroCard>
                        {/* extendToRight profile 方框延伸的方向 */}
                        <ProfileContainer $selected={id === hero.id} $extendToRight={index === 0 || index === 1}>
                          { isSelected && children}
                        </ProfileContainer>
                    </div>
                )
            })}
        </HeroesListContainer>
    )
}