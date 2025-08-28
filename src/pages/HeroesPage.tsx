import HeroesList from "../components/HeroesList";
import { useHeroStore, type HeroLists} from "../domain/heroStore";
import { SubTitle } from "../components/card";
import { useEffect } from "react";
import { fetchHeros } from "../util/apiUtil";
import { Outlet, useParams } from "react-router-dom";


export default function HerosPage(){
    const heroesList = useHeroStore(state => state.heroesList)
    const setHeroesData = useHeroStore(state => state.setHeroesData)
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
            <h1>Heros Page</h1>
            {Object.keys(heroesList).length === 0 ?<p>英雄集結中</p> : 
                <>
                    <SubTitle>Hero Lists: click to see more info!</SubTitle>
                    <HeroesList allHeroes={Object.values(heroesList)} id={id}>
                        <Outlet/>
                    </HeroesList>
                </>
            }
        </>
    )
}