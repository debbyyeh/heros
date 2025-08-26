import { useParams } from "react-router-dom"
import { SubTitle } from "../components/card"
import HeroesList from "../components/HeroesList"
import { useHeroStore } from "../domain/heroStore"

export default function HeroProfile(){
    const heroesList = useHeroStore(state => state.heroesList)
    const {id} = useParams()

    return(
        <>
        <h1>Hero Profile Page</h1>
        {heroesList.length === 0 ?<p>英雄集結中</p> : 
            <>
                <SubTitle>點選下方按鈕幫英雄變身！</SubTitle>
                <HeroesList currentHeroes={heroesList} id={id}/>
            </>
        }
        </>
    )
}