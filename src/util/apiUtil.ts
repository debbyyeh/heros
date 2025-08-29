
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

export async function editHeroProfile(id:string, profile: HeroProfileRes) {
    const url = `https://hahow-recruit.herokuapp.com/heroes/${id}/profile`

    try {
        const response = await fetch(url, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profile),
        })
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

      } catch (err) {
        alert('更新失敗，請稍後再試')
      }
    }