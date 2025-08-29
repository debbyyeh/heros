import { useState } from "react";
import { useHeroStore, type HeroProfile} from "../../domain/heroStore";
import { editHeroProfile } from "../../util/apiUtil";
import { ItemTitle, ItemValue, PointInfo, ProfileContent, ProfileInfo, ProfileInfoItem, SaveBtn} from "./style"


export const HeroProfileList = ({id}:{id:string})=>{
    const heroesList = useHeroStore(state => state.heroesList);
    const updateHeroProfile = useHeroStore(state => state.updateHeroProfile);
    const tempData = useHeroStore(state => state.tempData);
    const setTempData = useHeroStore(state => state.setTempData);
    const hero = heroesList[id!];

    //當tempData跟 hero.profile 值不一樣的時候，顯示tempData的值，代表正在被修改
    const profile = tempData[id] && 
    Object.entries(tempData[id]).some(
        ([key, value]) => value !== hero.profile![key as keyof HeroProfile]
    )
    ? tempData[id] 
    : hero.profile;

    const [remainingPoints, setRemainingPoints] = useState<number>(0);
    const [warning, setWarning] = useState<string>('');

    const updateProfileValue = (key: string, delta: number) => {
        if (!profile) return;
        if(remainingPoints - delta < 0 && delta > 0) {
            setWarning('請將剩餘點數分配完畢')
        }else{
            setWarning('')
        }
        setRemainingPoints(remainingPoints - delta);
        const newValue = Math.max(0, profile[key as keyof typeof profile] + delta);
        setTempData(id,{
            ...profile,
            [key]: newValue
        })

    };

    const sendUpdatedProfile = async(id:string, profile: HeroProfile) =>{
        if(remainingPoints !== 0){
            setWarning('請將剩餘點數分配完畢')
            return;
        }

        if(Object.values(profile).some(value => value < 0)){
            setWarning('能力值不能小於0')
            return;
        }
        
        setWarning('英雄變身中...')
        try {
            await editHeroProfile(id, profile);
            updateHeroProfile(id, profile, true);
            setWarning("英雄變身成功！");
          } catch (err) {
            setWarning("儲存失敗，請重試");
          }
    }

    return(
        profile ?
        <>
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
                    <div>能力總和：{hero.points}</div>
                    <div>剩餘點數：{remainingPoints}</div>
                    <SaveBtn onClick={()=>sendUpdatedProfile(id, tempData[id!])}>儲存</SaveBtn>
                </PointInfo>
            </ProfileContent>
            <p style={{marginTop:'15px'}}>{warning}</p>
            </>
        : null
        )
}
