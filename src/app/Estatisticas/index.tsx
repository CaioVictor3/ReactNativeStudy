import { useCallback, useState } from 'react';
import { ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft } from 'lucide-react-native';

import { AppRoutes } from '@/routes';
import { Refeicao } from '@/types/Refeicao';
import { RefeicaoStorage } from '@/storage/refeicaoStorage';
import { THEME } from '@/theme';
import {
  Container,
  Header,
  BackButton,
  PercentageNumber,
  PercentageLabel,
  CardsArea,
  StatCard,
  StatNumber,
  StatLabel,
  CardRow,
} from './styles';

type Stats = {
  total: number;
  dentro: number;
  fora: number;
  percentual: number;
  melhorSequencia: number;
  sequenciaAtual: number;
};

function parseDateHour(data: string, hora: string): number {
  const [d, m, y] = data.split('/').map(Number);
  const [h, min] = hora.split(':').map(Number);
  return new Date(y, m - 1, d, h, min).getTime();
}

function calcularEstatisticas(refeicoes: Refeicao[]): Stats {
  const total = refeicoes.length;
  const dentro = refeicoes.filter(r => r.dentroODieta).length;
  const fora = total - dentro;
  const percentual = total > 0 ? (dentro / total) * 100 : 0;

  const sorted = [...refeicoes].sort(
    (a, b) => parseDateHour(a.data, a.hora) - parseDateHour(b.data, b.hora)
  );

  let melhorSequencia = 0;
  let sequenciaAtual = 0;
  let contador = 0;

  for (const r of sorted) {
    if (r.dentroODieta) {
      contador++;
      if (contador > melhorSequencia) melhorSequencia = contador;
    } else {
      contador = 0;
    }
  }
  sequenciaAtual = contador;

  return { total, dentro, fora, percentual, melhorSequencia, sequenciaAtual };
}

export default function Estatisticas() {
  const navigation = useNavigation<NativeStackNavigationProp<AppRoutes>>();
  const [refeicoes, setRefeicoes] = useState<Refeicao[]>([]);

  useFocusEffect(
    useCallback(() => {
      RefeicaoStorage.getAll().then(setRefeicoes);
    }, [])
  );

  const stats = calcularEstatisticas(refeicoes);
  const isPositivo = stats.percentual >= 50;

  return (
    <Container isPositivo={isPositivo}>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <ArrowLeft
            size={24}
            color={isPositivo ? THEME.COLORS.GREEN_DARK : THEME.COLORS.RED_DARK}
          />
        </BackButton>
        <PercentageNumber isPositivo={isPositivo}>
          {stats.percentual.toFixed(2).replace('.', ',')}%
        </PercentageNumber>
        <PercentageLabel>das refeições dentro da dieta</PercentageLabel>
      </Header>

      <CardsArea>
        <ScrollView showsVerticalScrollIndicator={false}>
          <StatCard>
            <StatNumber>{stats.melhorSequencia}</StatNumber>
            <StatLabel>melhor sequência de refeições{'\n'}dentro da dieta</StatLabel>
          </StatCard>

          <StatCard>
            <StatNumber>{stats.sequenciaAtual}</StatNumber>
            <StatLabel>sequência atual de refeições{'\n'}dentro da dieta</StatLabel>
          </StatCard>

          <StatCard>
            <StatNumber>{stats.total}</StatNumber>
            <StatLabel>refeições registradas</StatLabel>
          </StatCard>

          <CardRow>
            <StatCard color="green" half>
              <StatNumber>{stats.dentro}</StatNumber>
              <StatLabel>refeições{'\n'}dentro da dieta</StatLabel>
            </StatCard>
            <StatCard color="red" half>
              <StatNumber>{stats.fora}</StatNumber>
              <StatLabel>refeições{'\n'}fora da dieta</StatLabel>
            </StatCard>
          </CardRow>
        </ScrollView>
      </CardsArea>
    </Container>
  );
}
