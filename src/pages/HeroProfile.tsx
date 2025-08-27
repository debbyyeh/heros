import { useParams } from "react-router-dom"
import { SubTitle } from "../components/card"
import { useHeroStore, type HeroProfile} from "../domain/heroStore"
import { useEffect } from "react"
import { fetchHeroProfile } from "../util/apiUtil"
import { HeroProfileList } from "../components/HeroProfileList"

export default function HeroProfile(){
    const heroesList = useHeroStore(state => state.heroesList)
    const heroProfile = useHeroStore(state => state.heroProfile)
    const {id} = useParams<{ id: string }>()
    const currentHero = heroesList.find(hero => hero.id === id)

    useEffect(()=>{
        if(id && currentHero){
            fetchHeroProfile(id).then(data =>{
                useHeroStore.setState({ heroProfile: {profile:data}})
            })
        }
    },[id,currentHero])


    return(
        <>
        <h2>Personal Profile </h2>
        {heroProfile ?
        <>
            <SubTitle>現在選擇的是 {currentHero!.name}</SubTitle>
            <HeroProfileList profile={heroProfile.profile!}/>
        </>
        : <p>英雄資料載入中...</p>}
        </>
    )
}

