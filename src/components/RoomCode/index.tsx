/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import * as Styled from './styles';
import { Toast } from '../Toast';

type RoomCodeProps={
  code: string,
  text?:boolean
}

export const RoomCode =(props:RoomCodeProps)=>{
  const [copied, setCopied] = useState(false);

  const copyRoomCodeToClipboard = ()=>{
    navigator.clipboard.writeText(props.code);
    setCopied(copied => !copied);

    setTimeout(()=>{
      setCopied(copied => !copied);
    },2500);
  }
  
  return (
    <>
      {copied && <Toast type="info">Copiado para o clipboard!</Toast>}
      <Styled.Button onClick={copyRoomCodeToClipboard} aria-label="Copiar código da sala" >
        <Styled.Icon>
          <img src={'/images/copy.svg'} alt="Copiar código da sala"/>
        </Styled.Icon>
        <Styled.Text>
          {props.text ? (
            'Copie o código'
          ):(
           `Sala #${props.code}`
          )}
        </Styled.Text>
      </Styled.Button>
    </>
  )
}