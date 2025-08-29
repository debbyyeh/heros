import { create } from "zustand";


export interface Hero{
    id: string;
    name: string;
    image: string;
    profile: HeroProfile | null;
    points?: number;
    profileNeedsRefresh?: boolean ;
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
    updateHeroProfile: (id: string, profile: HeroProfile, isEdited:boolean) => void,
    tempData: Record<string, HeroProfile>,
    setTempData: (id: string, profile: HeroProfile) => void,
}>((set) => ({
    heroesList: {},
    tempData: {},
    setHeroesData: (heroesList) => set(
        { 
            heroesList,
        }
    ),
    updateHeroProfile: (id, profile, isEdited) => set((state) => {
        const totalPoints = Object.values(profile).reduce((sum, val) => sum + val, 0);
        return{
            heroesList:{
                ...state.heroesList,
                [id]:{
                    ...state.heroesList[id],
                    profile,
                    points: totalPoints,
                    profileNeedsRefresh: isEdited
                },
            }
    }}),
    setTempData: (id, profile) => set((state) => ({
        tempData: {
            ...state.tempData,
            [id]: profile
        }
    }))
}));