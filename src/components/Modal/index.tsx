/* eslint-disable @next/next/no-img-element */
import { ReactNode } from 'react';
import { Button } from '../Button';
import { Container, StyledModal } from './styles';

type ModalProps = {
  modalVisibility: boolean,
  setVisibility: () => void,
  handleConfirme: () => void,
  children?: ReactNode,
}

export const Modal = ({ modalVisibility, setVisibility, handleConfirme, children }: ModalProps) => {
  return (
    <StyledModal
      isOpen={modalVisibility}
      onEscapeKeydown={setVisibility}
      onBackgroundClick={setVisibility}
    >
      <Container>
        <img src={'/images/alert.svg'} alt="alert" />
        <h2>{children}</h2>
        <span>Essa ação não pode ser desfeita.</span>
        <div>
          <Button
            btnType="outline"
            onClick={setVisibility}
          >
            Cancelar
          </Button>
          <Button
            btnType="fill"
            onClick={handleConfirme}
          >
            Confirmar
          </Button>
        </div>
      </Container>
    </StyledModal>
  )
}
