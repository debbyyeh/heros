import { create } from "zustand";

export type Hero = {
    id:string,
    name:string
    image:string
}

export type HeroProfile = {
    str: number;
    int: number;
    agi: number;
    luk: number;
  };
  
export type ProfileProps = {
    profile: HeroProfile;
  };

export const useHeroStore = create<{
    heroesList: Hero[],
    heroProfile: {
        profile: HeroProfile
    },
    setHeroesData: (heroes: Hero[]) => void
}>((set) => ({
    heroesList: [],
    heroProfile: {
        profile: {
            str: 0,
            int: 0,
            agi: 0,
            luk: 0
        }
    },
    setHeroesData: (heroesList) => set({ heroesList })
}));