import { useNavigate, useParams } from "react-router-dom"
import HeroListBtn from "../components/HeroListBtn";
import { fetchHeros} from "../util/apiUtil";
import { useCallback, useEffect, useState } from "react";
import type { Hero } from "../domain/heroStore";


export default function HerosPage(){

    const [heroes, setHeroes] = useState<Hero[]>([])

    // const {id} = useParams()

    useEffect(()=>{
        fetchHeros().then(data => setHeroes(data))
    },[])

    const navigate = useNavigate();

    const refreshHeros = useCallback(async () => {
        console.log("refreshHeros")
        const newHeros = await fetchHeros()
        if (JSON.stringify(newHeros) === JSON.stringify(heroes)) {
            alert("已經是最新資料")
        } else {
            setHeroes(newHeros)
            alert("更新資料中")
        }
    }, [heroes]) 

    function onClick(id:string){
        navigate(`/heros/${id}`)
    }
    return(
        <>
            <h1>Heros Page</h1>
            <HeroListBtn updateList={refreshHeros}/>
            {heroes.length === 0 ?  <p>Loading...</p> :  
            <ul>
                {heroes.map(hero => (
                    <li key={hero.id} onClick={() => onClick(hero.id)}>
                        <h2>{hero.name}</h2>
                        <img src={hero.image} alt={hero.name} width={200}/>
                    </li>
                ))}
            </ul>}
           
        </>
        
    )
}