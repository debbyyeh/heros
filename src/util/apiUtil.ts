
interface HeroResponse {
    id: string;
    name: string;
    image: string;
}

interface HeroProfileRes {
    str: number;
    int: number;
    agi: number;
    luk: number;
}

export async function fetchHeros(): Promise<HeroResponse[]> {
    const res = await fetch('https://hahow-recruit.herokuapp.com/heroes')
    const data = await res.json()
    return data
}

export async function fetchHeroProfile(id: string): Promise<HeroProfileRes> {
    const res = await fetch(`https://hahow-recruit.herokuapp.com/heroes/${id}/profile`)
    const data = await res.json()
    return data
}