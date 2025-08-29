import { useHeroStore, type HeroLists} from "../domain/heroStore";
import { useEffect } from "react";
import { fetchHeros } from "../util/apiUtil";
import { Outlet, useParams } from "react-router-dom";
import { Note } from "../components/heroesList/style";
import HeroesList from "../components/heroesList";


export default function HerosPage(){
    const {heroesList, setHeroesData} = useHeroStore();
    const { id } = useParams<{ id: string }>()

    useEffect(()=>{
        fetchHeros().then(data =>{
            const heroesObj: HeroLists = data.reduce((acc, hero) => {
                acc[hero.id] = { ...hero, profile: null };
                return acc;
              }, {} as HeroLists);
            
              setHeroesData(heroesObj);
        })
    },[setHeroesData])

    
    return(
        <>
            <h1>HERO LIST</h1>
            {Object.keys(heroesList).length === 0 ?<p>英雄集結中</p> : 
                <>
                    {!id && <Note>Click card to see more info!</Note>}
                    <HeroesList allHeroes={Object.values(heroesList)} id={id}>
                        <Outlet/>
                    </HeroesList>
                </>
            }
        </>
    )
}