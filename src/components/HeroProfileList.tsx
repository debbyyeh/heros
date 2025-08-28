import type { HeroProfile } from "../domain/heroStore";
import { ItemTitle, ItemValue, PointInfo, ProfileContent, ProfileInfo, ProfileItemContainer} from "./card"

type HeroProfileProps = {
    profile: HeroProfile | null;
};

export const HeroProfileList = ({profile}:HeroProfileProps)=>{

    return(
        profile ?
            <ProfileContent
            >
                <ProfileInfo>
                    {Object.entries(profile).map(([key, value]) => (
                        <ProfileItem key={key} name={key} value={value} />
                    ))}
                </ProfileInfo>
                <PointInfo>
                    <div>剩餘點數：0</div>
                    <button>儲存</button>
                </PointInfo>
            </ProfileContent>
        : null)
}

type ProfileItemProps = {
    name: string;
    value: number;
};
  
const ProfileItem: React.FC<ProfileItemProps> = ({ name, value }) => (
    <ProfileItemContainer>
        <ItemTitle>{name.toUpperCase()}</ItemTitle>
        <button>+</button>
        <ItemValue>{value}</ItemValue>
        <button>-</button>
    </ProfileItemContainer>
);