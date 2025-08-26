import { useParams } from "react-router-dom"
import { SubTitle } from "../components/card"
import HeroesList from "../components/HeroesList"
import { useHeroStore, type HeroProfile} from "../domain/heroStore"
import { useEffect } from "react"
import { fetchHeroProfile, fetchHeros } from "../util/apiUtil"
import { HeroProfileList } from "../components/HeroProfileList"

export default function HeroProfile(){
    const heroesList = useHeroStore(state => state.heroesList)
    const setHeroesData = useHeroStore(state => state.setHeroesData)
    const heroProfile = useHeroStore(state => state.heroProfile)
    const {id} = useParams<{ id: string }>()
    const currentHero = heroesList.find(hero => hero.id === id)


    useEffect(()=>{
        if(heroesList.length === 0){
            fetchHeros().then(data =>{
                setHeroesData(data)
            })
        }
    },[setHeroesData, heroesList])

    useEffect(()=>{
        if(id && currentHero){
            fetchHeroProfile(id).then(data =>{
                useHeroStore.setState({ heroProfile: {profile:data}})
            })
        }
    },[id,currentHero])


    return(
        <>
        <h1>Hero Profile Page</h1>
        {heroesList.length === 0 ? (
            <p>英雄集結中...</p>
            ) : (
            <>
                <SubTitle>現在選擇的是 {currentHero!.name}</SubTitle>
                <HeroesList currentHeroes={heroesList} id={id}/>
                {id ? (
                    <HeroProfileList profile={heroProfile.profile!}/>
                ): null}
            </>
            )}
        </>
    )
}

