

export default function HeroListBtn({updateList}: {updateList: ()=> Promise<void>}) {

    return (
        <button onClick={()=>updateList()}>Get Heros Data</button>
    )
}