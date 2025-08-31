import { useCallback, useMemo, useState } from "react";
import { useHeroStore} from "../../domain/heroStore";
import { editHeroProfile } from "../../util/apiUtil";
import { PointInfo, ProfileContainer, ProfileContent, ProfileInfo, Warning} from "./style"
import ProfileInfoState from "../profileInfo";
import { SaveBtn } from "../common/Button";


export const HeroProfileList = ({id}:{id:string})=>{
    const { heroesList, updateHeroProfile, tempData, setTempData } = useHeroStore();
    const isEditing = useHeroStore(state => state.isEditingData(state, id));
    const [savingData, setSavingData] = useState<boolean>(false);
    const hero = heroesList[id!];

    const [remainingPoints, setRemainingPoints] = useState<number>(0);
    const [warning, setWarning] = useState<string>('');

    //NOTE:當tempData跟 hero.profile 值不一樣的時候，顯示tempData的值，代表正在被修改
    const profile = useMemo(() => {
        return isEditing ? tempData[id] : hero.profile;
    }, [isEditing, tempData, id, hero.profile]);

    function calcNewStatValue(current: number, delta: number) {
        return Math.max(0, current + delta);
    }

    const validateRemainingPoints = (remainingPoints: number) => {
        if(remainingPoints !== 0){
            setWarning('請將剩餘點數分配完畢')
            return false;
        }
        setWarning('');
        return true;
    }

    const updateProfileValue = useCallback(
        (key: string, deltaOrValue: number | "", fromInput: boolean = false) => {
          if (!profile) return;

          let newValue: number | "" = deltaOrValue;
      
          const current: number = profile[key as keyof typeof profile];
          
      
          if (!fromInput) {
            newValue = calcNewStatValue(current, deltaOrValue as number);
          } else {
            newValue = deltaOrValue === "" ? "" : Math.max(0, deltaOrValue as number);
          }
          const delta = (newValue === "" ? 0 : newValue) - current;
          const newRemainingPoints = remainingPoints - delta;
          setRemainingPoints(newRemainingPoints);
          validateRemainingPoints(newRemainingPoints);
      
          setTempData(id, {
            ...profile,
            [key]: newValue,
          });
        },
        [profile, id, setTempData, remainingPoints]
    );
      

    const sendUpdatedProfile = async() =>{
        
        if(!validateRemainingPoints(remainingPoints!)) return;

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

    return(
        <ProfileContainer $selected={id === heroesList[id!].id} >
            <ProfileContent>
                <ProfileInfo>
                    {Object.keys(profile!).map((key)=>
                        <ProfileInfoState
                            key={key}
                            label={key.toUpperCase()}
                            value={profile ? profile[key as keyof typeof profile] : 0}
                            onIncrease={() => updateProfileValue(key, +1)}
                            onDecrease={() => updateProfileValue(key, -1)}
                            onChange={(newValue) => updateProfileValue(key, newValue, true)}
                        />
                    )}
                </ProfileInfo>
                <PointInfo>
                    <div>能力總和：{hero.points}</div>
                    <div>剩餘點數：{remainingPoints}</div>
                    <SaveBtn onClick={sendUpdatedProfile} disabled={savingData || remainingPoints !== 0} $waiting={savingData!}
                    >儲存</SaveBtn>
                </PointInfo>
                
            </ProfileContent>
            <Warning>{warning}</Warning>
        </ProfileContainer>
    )
}