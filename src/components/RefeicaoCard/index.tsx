import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { styles } from './styles';
import { Refeicao } from '@/types/Refeicao';

type Props = TouchableOpacityProps & {
  refeicao: Refeicao;
};

export function RefeicaoCard({ refeicao, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Text style={styles.hora}>{refeicao.hora}</Text>
      <View style={styles.separator} />
      <Text style={styles.nome} numberOfLines={1}>{refeicao.nome}</Text>
      <View style={refeicao.dentroODieta ? styles.statusDotSim : styles.statusDotNao} />
    </TouchableOpacity>
  );
}
