import styled from "styled-components"

export const ProfileInfoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:not(:last-child){
    margin-bottom: 12px;
  }
`

export const ItemTitle = styled.div`
    font-size: 20px;
    min-width: 40px;
    flex: 1;
`

export const ItemValue = styled.input`
    min-width: 24px;
    font-size: 18px;
    height: auto;
    font-size: 22px;
    margin: 10px;
    caret-color: #646cff;
    outline: none;
    border: none;
    text-align: center;
    background-color: #242424;
    border-bottom: 1px solid #ccc;
    flex:2;
    appearance: textfield; /* Standard property for compatibility */
    -moz-appearance: textfield; /* Firefox 移除箭頭 */
  
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none; /* Chrome, Safari, Edge 移除箭頭 */
        margin: 0;
    }
`