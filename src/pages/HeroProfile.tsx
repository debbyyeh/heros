import { useParams } from "react-router-dom"
import { useHeroStore, type HeroProfile} from "../domain/heroStore"
import { useEffect } from "react"
import { fetchHeroProfile } from "../util/apiUtil"
import { HeroProfileList } from "../components/heroProfileList"
import { Note } from "../components/heroesList/style"

export default function HeroProfile(){
    const heroesList = useHeroStore(state => state.heroesList)
    const updateHeroProfile = useHeroStore(state => state.updateHeroProfile)
    const {id} = useParams<{ id: string }>()
    const currentHero = id ? heroesList[id] : null

    useEffect(() => {
        if (id && currentHero && !currentHero.profile) {
          fetchHeroProfile(id).then(profileData => {
            updateHeroProfile(id, profileData);
          });
        }
      }, [id, currentHero])


    return(
        <>
        {currentHero!.profile ?
        <>
            <Note>{currentHero?.name} 能力值表</Note>
            <HeroProfileList id={id!}/>
        </>
        : <Note>英雄資料載入中...</Note>}
        </>
    )
}

