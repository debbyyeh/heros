import type { Hero } from "../domain/heroStore";
import { useNavigate } from "react-router-dom"

export default function HeroesList({currentHeroes}: {currentHeroes:Hero[]}) {

    const navigate = useNavigate();
    function onClick(id:string){
        navigate(`/heroes/${id}`)
    }

    return (
        <ul>
            {currentHeroes.map(hero => (
                <li key={`hero_${hero.id}`} onClick={() => onClick(hero.id)}>
                    <h2>{hero.name}</h2>
                    <img src={hero.image} alt={hero.name} width={100}/>
                </li>
            ))}
        </ul>
    )
}