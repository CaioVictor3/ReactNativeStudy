import { TouchableOpacityProps } from 'react-native';
import { Container, Hora, Nome, Separator, StatusDot } from './styles';
import { Refeicao } from '@/types/Refeicao';

type Props = TouchableOpacityProps & {
  refeicao: Refeicao;
};

export function RefeicaoCard({ refeicao, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Hora>{refeicao.hora}</Hora>
      <Separator />
      <Nome numberOfLines={1}>{refeicao.nome}</Nome>
      <StatusDot $dentroODieta={refeicao.dentroODieta} />
    </Container>
  );
}
