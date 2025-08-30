import { Button, Buttons, Message, Overlay, PopupContainer } from "./style";
interface ConfirmPopupProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    isOpen: boolean;
  }
  

export default function Popup({ message, onConfirm, onCancel, isOpen }:ConfirmPopupProps){
    return(
        isOpen ?
        <Overlay>
            <PopupContainer>
                <Message>{message}</Message>
                <Buttons>
                <Button onClick={onCancel} $cancel>
                    取消
                </Button>
                <Button onClick={onConfirm}>確定</Button>
                </Buttons>
            </PopupContainer>
        </Overlay> :null
    )
}