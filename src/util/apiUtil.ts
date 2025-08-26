import type { Hero } from "../domain/heroStore"


export async function fetchHeros(): Promise<Hero[]> {
    const res = await fetch('https://hahow-recruit.herokuapp.com/heroes')
    const data = await res.json()
    return data
}