import { AddButton } from "../common/Button";
import {ItemTitle, ItemValue , ProfileInfoItem,} from "./style";

interface ProfileInfoStateProps {
    label:string;
    value:number;
    onIncrease:()=>void;
    onDecrease:()=>void;
    onChange:(newValue: number | "", key: string) => void
}


export default function ProfileInfoState({label, value, onIncrease, onDecrease, onChange}:ProfileInfoStateProps){

    return (
        <ProfileInfoItem>
            <ItemTitle>{label}</ItemTitle>
            <AddButton size={28} onClick={onIncrease}>+</AddButton>
            <ItemValue value={value} name="profileValue" type="text" 
                onChange={(e) => onChange(Number(e.target.value) || "", label)}
            />
            <AddButton size={28} onClick={onDecrease} disabled={value! <= 0}>-</AddButton>    
        </ProfileInfoItem>
    )
}