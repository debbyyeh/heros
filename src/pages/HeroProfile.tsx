import { useParams } from "react-router-dom"
import { Note } from "../components/card"
import { useHeroStore, type HeroProfile} from "../domain/heroStore"
import { useEffect } from "react"
import { fetchHeroProfile } from "../util/apiUtil"
import { HeroProfileList } from "../components/HeroProfileList"

export default function HeroProfile(){
    const heroesList = useHeroStore(state => state.heroesList)
    const {id} = useParams<{ id: string }>()
    const currentHero = heroesList.find(hero => hero.id === id)

    useEffect(() => {
        if (id && currentHero && !currentHero.profile) {
          fetchHeroProfile(id).then(profileData => {
            useHeroStore.setState(state => {
              const updatedHeroes = state.heroesList.map(hero =>
                hero.id === id ? { ...hero, profile: profileData } : hero
              )
              return { heroesList: updatedHeroes }
            })
          })
        }
      }, [id, currentHero])


    return(
        <>
        {currentHero!.profile ?
        <>
            <Note>英雄能力值</Note>
            <HeroProfileList profile={currentHero!.profile}/>
        </>
        : <p>英雄資料載入中...</p>}
        </>
    )
}

