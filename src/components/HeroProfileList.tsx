import type { ProfileProps } from "../domain/heroStore"
import { ItemTitle, ItemValue, PointInfo, ProfileContainer, ProfileInfo, ProfileItemContainer} from "./card"

export const HeroProfileList = ({ profile }: ProfileProps)=>{

    return(
        profile ?
            <ProfileContainer>
                <ProfileInfo>
                    {Object.entries(profile).map(([key, value]) => (
                        <ProfileItem key={key} name={key} value={value} />
                    ))}
                </ProfileInfo>
                <PointInfo>
                    <div>剩餘點數：0</div>
                    <button>儲存</button>
                </PointInfo>
            </ProfileContainer>
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