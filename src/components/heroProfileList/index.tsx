import { useCallback, useMemo, useState } from "react";
import { useHeroStore} from "../../domain/heroStore";
import { editHeroProfile } from "../../util/apiUtil";
import { ItemTitle, ItemValue, PointInfo, ProfileContent, ProfileInfo, ProfileInfoItem, SaveBtn, Warning} from "./style"


export const HeroProfileList = ({id}:{id:string})=>{
    const { heroesList, updateHeroProfile, tempData, setTempData } = useHeroStore();
    const isEditing = useHeroStore(state => state.isEditingData(state, id));
    const [savingData, setSavingData] = useState<boolean>(false);

    const hero = heroesList[id!];

    const [remainingPoints, setRemainingPoints] = useState<number>(0);
    const [warning, setWarning] = useState<string>('');

    //當tempData跟 hero.profile 值不一樣的時候，顯示tempData的值，代表正在被修改
    const profile = useMemo(() => {
        return isEditing ? tempData[id] : hero.profile;
    }, [isEditing, tempData, id, hero.profile]);


    function calcRemainingPoints(current: number, delta: number) {
        return current - delta;
    }
      
    function calcNewStatValue(current: number, delta: number) {
        return Math.max(0, current + delta);
    }
    
    const updateProfileValue = useCallback((key: string, delta: number)=>{
        if (!profile) return;
        
        const newRemainingPoints = calcRemainingPoints(remainingPoints, delta); 
        const newValue = calcNewStatValue(profile[key as keyof typeof profile], delta);

        setRemainingPoints(newRemainingPoints);
        
        setTempData(id,{
            ...profile,
            [key]: newValue
        })

        validateRemainingPoints(newRemainingPoints);
    },[id, profile, remainingPoints, setTempData]);

    const sendUpdatedProfile = async() =>{
        
        validateRemainingPoints(remainingPoints!);

        if(Object.values(profile!).some(value => value <= 0)){
            setWarning('能力值不能小於0')
            return false;
        }

        if(!isEditing){
            setWarning('英雄 still the same，都還是沒有變')
            return;
        }
        setWarning('英雄變身中...')
        setSavingData(true);

        try {
            await editHeroProfile(id, profile!);
            setSavingData(false);
            updateHeroProfile(id, profile!, true);
            setWarning("英雄變身成功！");
          } catch (err) {
            setSavingData(false);
            updateHeroProfile(id, profile!, false);
            setWarning("儲存失敗，請重試");
          }
    }

    const validateRemainingPoints = (remainingPoints: number) => {
        if(remainingPoints !== 0){
            setWarning('請將剩餘點數分配完畢')
            return false;
        }
        setWarning('');
        return true;
    }

    return(
        profile ?
        <>
            <ProfileContent
            >
                 <ProfileInfo>
                    {Object.keys(profile!).map((key)=>
                        <ProfileInfoState
                            key={key}
                            label={key.toUpperCase()}
                            value={profile ? profile[key as keyof typeof profile] : 0}
                            onIncrease={() => updateProfileValue(key, +1)}
                            onDecrease={() => updateProfileValue(key, -1)}
                        />
                    )}
                </ProfileInfo>
                <PointInfo>
                    <div>能力總和：{hero.points}</div>
                    <div>剩餘點數：{remainingPoints}</div>
                    <SaveBtn onClick={sendUpdatedProfile} disabled={savingData} $waiting={savingData!}
                    >儲存</SaveBtn>
                </PointInfo>
            </ProfileContent>
            <Warning>{warning}</Warning>
            </>
        : null
        )
}



export default function ProfileInfoState({label, value, onIncrease, onDecrease}:{label?:string, value?:number, onIncrease?:()=>void, onDecrease?:()=>void}){
    return (
        <ProfileInfoItem>
            <ItemTitle>{label}</ItemTitle>
            <button onClick={onIncrease}>+</button>
            <ItemValue>{value}</ItemValue>
            <button onClick={onDecrease} disabled={value! <= 0}>-</button>    
        </ProfileInfoItem>
    )
}
