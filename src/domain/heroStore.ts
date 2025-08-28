import { create } from "zustand";

export interface Hero{
    id: string;
    name: string;
    image: string;
    profile: HeroProfile | null;
}

export type HeroLists = Record<string, Hero>;

export type HeroProfile = {
    str: number;
    int: number;
    agi: number;
    luk: number;
};

export const useHeroStore = create<{
    heroesList: HeroLists,
    setHeroesData: (heroes: HeroLists) => void,
    updateHeroProfile: (id: string, profile: HeroProfile) => void
}>((set) => ({
    heroesList: {},
    setHeroesData: (heroesList) => set(
        { heroesList }
    ),
    updateHeroProfile: (id, profile) => set((state) => ({
        heroesList: {
            ...state.heroesList,
            [id]: {
                ...state.heroesList[id],
                profile
            }
        }
    }))
}));