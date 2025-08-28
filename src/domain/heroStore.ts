import { create } from "zustand";

export type Hero = {
    id:string,
    name:string
    image:string
    profile: HeroProfile | null
}

export type HeroProfile = {
    str: number;
    int: number;
    agi: number;
    luk: number;
};

export const useHeroStore = create<{
    heroesList: Hero[],
    setHeroesData: (heroes: Hero[]) => void
}>((set) => ({
    heroesList: [],
    setHeroesData: (heroesList) => set({ heroesList })
}));