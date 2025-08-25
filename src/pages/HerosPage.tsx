import { useNavigate, useParams } from "react-router-dom"

const heros=[
    {id:'1', name:"Hero One"},
    {id:'2', name:"Hero Two"},
    {id:'3', name:"Hero Three"},
]

export default function HerosPage(){
    const {id} = useParams()
    console.log(id)

    const navigate = useNavigate();

    function onClick(id:string){
        navigate(`/heros/${id}`)
    }
    return(
        <>
            <h1>Heros Page</h1>
            {heros.map((hero, index)=>{
                return <p key={`hero_${index}`} onClick={() => onClick(hero.id)}>{hero.name}</p>
            })}
        </>
        
    )
}