import type { Hero, HeroProfile } from "../domain/heroStore"


export async function fetchHeros(): Promise<Hero[]> {
    const res = await fetch('https://hahow-recruit.herokuapp.com/heroes')
    const data = await res.json()
    return data
}

export async function fetchHeroProfile(id: string): Promise<HeroProfile> {
    const res = await fetch(`https://hahow-recruit.herokuapp.com/heroes/${id}/profile`)
    const data = await res.json()
    return data
}