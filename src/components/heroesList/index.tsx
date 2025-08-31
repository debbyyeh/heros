import { useNavigate } from "react-router-dom"
import { useHeroStore, type Hero,  } from "../../domain/heroStore";
import { HeroCard, HeroesListContainer, HeroImageWrapper } from "./style";
import {  useEffect, useState } from "react";
import Popup from "../popup";

export default function HeroesList({allHeroes, id, children}: {allHeroes:Hero[], id:string, children: React.ReactNode}) {

    const navigate = useNavigate();
    const isEditing = useHeroStore(state => state.isEditingData(state, id));
    const setTempData = useHeroStore(state => state.setTempData);
    const heroesList = useHeroStore(state => state.heroesList);
    const [showConfirm, setShowConfirm] = useState(false);
    const [directToHeroId, setDirectToHeroId] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
    

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 767);
            window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    const handleConfirm = (linkHeroId: string) => {
        if (id && heroesList[id]?.profile){
            setTempData(id, heroesList[id].profile!);
        }

        setShowConfirm(false);
        navigate(`/heroes/${linkHeroId}`);
    };

    const handleCancel = () => {
        setShowConfirm(false);
    };

    const handleLeaveHero = (linkHeroId:string) => {
        if (linkHeroId === id) return;
        setDirectToHeroId(linkHeroId);

        if (isEditing) {
            setShowConfirm(true);
            return;
        }
        
        navigate(`/heroes/${linkHeroId}`);
    };


    return (
        <>
        <HeroesListContainer>
            {allHeroes.map((hero) => {
                return(
                    <div key={`card_${hero.id}`} style={{position:'relative'

                    }}>
                        <HeroCard key={`hero_${hero.id}`} 
                            onClick={() => 
                                handleLeaveHero(hero.id)
                            }
                            $showAll={id === undefined}
                            $selected={id === hero.id}
                        >
                            <HeroImageWrapper $selected={id === hero.id}>
                                <img src={hero.image} alt={hero.name} />
                            </HeroImageWrapper>
                            <h2>{hero.name}</h2>
                            
                        </HeroCard>
                        {(id === hero.id && isMobile) ? children : null}
                    </div>
                )
            })}
            </HeroesListContainer>
            {!isMobile && children}
            {showConfirm ? (
                <Popup
                    isOpen={showConfirm}
                    message="你有未儲存的修改，確定要離開嗎？"
                    onConfirm={()=>handleConfirm(directToHeroId!)}
                    onCancel={handleCancel}
                />
            ): null}
        </>
    )
}