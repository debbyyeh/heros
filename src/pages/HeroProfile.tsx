import HeroesList from "../components/HeroesList"
import { useHeroStore } from "../domain/heroStore"

export default function HeroProfile(){
    const heroesList = useHeroStore(state => state.heroesList)

    return(
        <>
        <h1>Hero Profile Page</h1>
        {heroesList.length === 0 ?<p>英雄集結中</p> : <HeroesList currentHeroes={heroesList}/>}
        </>
    )
}