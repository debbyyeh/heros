import HeroesList from "../components/HeroesList";
import { fetchHeros} from "../util/apiUtil";
import { useEffect } from "react";
import { useHeroStore} from "../domain/heroStore";


export default function HerosPage(){

    const heroesList = useHeroStore(state => state.heroesList)
    const setHeroesData = useHeroStore(state => state.setHeroesData)

    // const {id} = useParams()

    useEffect(()=>{
        fetchHeros().then(data =>{
            setHeroesData(data)
        })
    },[setHeroesData])

    
    return(
        <>
            <h1>Heros Page</h1>
            {heroesList.length === 0 ?<p>英雄集結中</p> : <HeroesList currentHeroes={heroesList}/>}
        </>
    )
}