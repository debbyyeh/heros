import { useHeroStore} from "../../domain/heroStore";
import { ItemTitle, ItemValue, PointInfo, ProfileContent, ProfileInfo, ProfileInfoItem} from "./style"



export const HeroProfileList = ({id}:{id:string})=>{
    const heroesList = useHeroStore(state => state.heroesList);
    const updateHeroProfile = useHeroStore(state => state.updateHeroProfile);
    const hero = heroesList[id!];
    const profile = hero!.profile;

    const updateProfileValue = (key: string, delta: number) => {
        if (!profile) return;
        const newValue = Math.max(0, profile[key as keyof typeof profile] + delta);
        
        updateHeroProfile(id, {
            ...profile,
            [key]: newValue,
          })
      };

    return(
        profile ?
            <ProfileContent
            >
                <ProfileInfo>
                    {Object.keys(profile!).map((key)=>{
                        const value = profile ? profile[key as keyof typeof profile] : 0;
                        return (
                            <ProfileInfoItem key={`hero_${id}_${key}`}>
                                <ItemTitle>{key.toUpperCase()}</ItemTitle>
                                <button onClick={() => updateProfileValue(key, +1)}>+</button>
                                <ItemValue>{value}</ItemValue>
                                <button onClick={() => updateProfileValue(key, -1)} disabled={value <= 0}>-</button>    
                            </ProfileInfoItem>
                        )
                    })}   
                </ProfileInfo>
                <PointInfo>
                    <div>剩餘點數：0</div>
                    <button>儲存</button>
                </PointInfo>
            </ProfileContent>
        : null
        )
}
