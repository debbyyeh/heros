import { create } from "zustand";

export type Hero = {
    id:string,
    name:string
    image:string
}

export type HeroProfile = {
    str:number,
    int:number,
    agi:number,
    luk:number
}

export const useHeroStore = create<{
    heroesList: Hero[],
    heroProfile: HeroProfile,
    setHeroesData: (heroes: Hero[]) => void
}>((set) => ({
    heroesList: [],
    heroProfile: {str:0, int:0, agi:0, luk:0},
    setHeroesData: (heroesList) => set({ heroesList })
}));