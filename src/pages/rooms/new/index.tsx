/* eslint-disable @next/next/no-img-element */
import { FormEvent, useState } from 'react';
import * as Styled from '../../../styles/authPages';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../../hooks/useAuth';
import { database } from '../../../services/firebase';

import { ToggleTheme } from '../../../components/ToggleTheme';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { Letmeask } from '../../../components/Letmeask';
import { Toast } from '../../../components/Toast';

const NewRoom = () => {
  const [newRoom, setNewRoom] = useState('')
  const [newRoomState, setNewRoomState] = useState('not-create');
  const router = useRouter();
  const { user } = useAuth();

  const handleCreateRoom = async (event: FormEvent) => {
    event.preventDefault();

    if (user) {
      if (newRoom.trim() === "") {
        setNewRoomState('warning');
        setTimeout(() => {
          setNewRoomState('not-create');
        }, 2000);
        return;
      };

      const roomRef = database.ref('rooms');

      try {
        const firebaseRoom = await roomRef.push({
          title: newRoom,
          authorId: user?.id,
        });
        setNewRoomState('create');
        setTimeout(() => {
          router.push(`/admin/rooms/${firebaseRoom.key}`);
        }, 2100);
      } catch {
        setNewRoomState('error');
      }
    } else {
      setNewRoomState('not-login');
      setTimeout(() => {
        router.push('/');
      }, 2100);
    }
  }

  const listRooms = () => {
    router.push(`/rooms`);
  }

  return (
    <Styled.Container>
      <Styled.Left as="aside">
        <img src={'/images/illustration.svg'} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as suas dúvidas da sua audiência em tempo-real</p>
      </Styled.Left>

      <Styled.Right as="main">
        <Styled.Content>
          <ToggleTheme />
          <Letmeask />
          <Styled.User>
            <img src={user?.avatar} alt={user?.name} />
            <h2>Eai {user?.name}, crie uma nova sala:</h2>
          </Styled.User>

          <form onSubmit={handleCreateRoom}>
            <Input
              type="text"
              placeholder="Nome da sala"
              value={newRoom}
              onChange={event => setNewRoom(event.target.value)}
            />
            <Button btnType="fill" type="submit">
              Criar nova sala
            </Button>
          </form>
          <Button btnType="outline" onClick={listRooms}>
            Verificar todas as salas
          </Button>
          <Styled.LinkRoom>Quer entrar em <Link href="/">  uma sala existente?</Link></Styled.LinkRoom>
        </Styled.Content>
      </Styled.Right>


      {newRoomState === "create" && (
        <Toast type="info">Sala criada com sucesso!</Toast>
      )}
      {newRoomState === "warning" && (
        <Toast type="warning">Digite um nome para a sala!</Toast>
      )}
      {newRoomState === "error" && (
        <Toast type="error">Houve um error ao criar a sala!</Toast>
      )}
      {newRoomState === "not-login" && (
        <Toast type="error">Você precisa fazer login para criar uma sala!</Toast>
      )}

    </Styled.Container>
  )
}
export  default NewRoom;