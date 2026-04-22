import { Modal } from 'react-native';
import {
  Overlay,
  Box,
  Title,
  Message,
  ButtonRow,
  CancelButton,
  CancelLabel,
  ConfirmButton,
  ConfirmLabel,
} from './styles';

type Props = {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({
  visible,
  title,
  message,
  confirmLabel = 'Confirmar',
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onCancel}>
      <Overlay>
        <Box>
          <Title>{title}</Title>
          <Message>{message}</Message>
          <ButtonRow>
            <CancelButton onPress={onCancel}>
              <CancelLabel>Cancelar</CancelLabel>
            </CancelButton>
            <ConfirmButton onPress={onConfirm}>
              <ConfirmLabel>{confirmLabel}</ConfirmLabel>
            </ConfirmButton>
          </ButtonRow>
        </Box>
      </Overlay>
    </Modal>
  );
}
