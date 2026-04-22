import { useCallback, useState } from 'react';
import { SectionList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Plus, ArrowUpRight } from 'lucide-react-native';

import { AppRoutes } from '@/routes';
import { Refeicao } from '@/types/Refeicao';
import { RefeicaoStorage } from '@/storage/refeicaoStorage';
import { RefeicaoCard } from '@/components/RefeicaoCard';
import { THEME } from '@/theme';
import {
  Container,
  Header,
  HeaderLogo,
  UserAvatar,
  PercentageCard,
  PercentageArrow,
  PercentageNumber,
  PercentageLabel,
  ListContainer,
  AddButton,
  AddButtonLabel,
  SectionTitle,
  EmptyText,
} from './styles';

type Section = { title: string; data: Refeicao[] };

function calcularPercentual(refeicoes: Refeicao[]): number {
  if (refeicoes.length === 0) return 0;
  const dentro = refeicoes.filter(r => r.dentroODieta).length;
  return Math.round((dentro / refeicoes.length) * 10000) / 100;
}

function parseDateHour(data: string, hora: string): Date {
  const [d, m, y] = data.split('/').map(Number);
  const [h, min] = hora.split(':').map(Number);
  return new Date(y, m - 1, d, h, min);
}

function agruparPorData(refeicoes: Refeicao[]): Section[] {
  const sorted = [...refeicoes].sort(
    (a, b) =>
      parseDateHour(b.data, b.hora).getTime() -
      parseDateHour(a.data, a.hora).getTime()
  );
  const mapa: Record<string, Refeicao[]> = {};
  for (const r of sorted) {
    if (!mapa[r.data]) mapa[r.data] = [];
    mapa[r.data].push(r);
  }
  return Object.entries(mapa).map(([title, data]) => ({ title, data }));
}

export default function Home() {
  const [refeicoes, setRefeicoes] = useState<Refeicao[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<AppRoutes>>();

  useFocusEffect(
    useCallback(() => {
      RefeicaoStorage.getAll().then(setRefeicoes);
    }, [])
  );

  const percentual = calcularPercentual(refeicoes);
  const isPositivo = percentual >= 50;
  const sections = agruparPorData(refeicoes);

  return (
    <Container>
      <Header>
        <HeaderLogo>Daily Diet</HeaderLogo>
        <UserAvatar source={{ uri: 'https://i.pravatar.cc/100' }} />
      </Header>

      <PercentageCard
        $isPositivo={isPositivo}
        onPress={() => navigation.navigate('estatisticas')}
      >
        <PercentageArrow>
          <ArrowUpRight
            size={24}
            color={isPositivo ? THEME.COLORS.GREEN_DARK : THEME.COLORS.RED_DARK}
          />
        </PercentageArrow>
        <PercentageNumber $isPositivo={isPositivo}>
          {percentual.toFixed(2).replace('.', ',')}%
        </PercentageNumber>
        <PercentageLabel>das refeições dentro da dieta</PercentageLabel>
      </PercentageCard>

      <ListContainer>
        <AddButton onPress={() => navigation.navigate('novaRefeicao', {})}>
          <Plus size={18} color={THEME.COLORS.WHITE} />
          <AddButtonLabel>Nova refeição</AddButtonLabel>
        </AddButton>

        <SectionList
          sections={sections}
          keyExtractor={item => item.id}
          renderSectionHeader={({ section }) => (
            <SectionTitle>{section.title}</SectionTitle>
          )}
          renderItem={({ item }) => (
            <RefeicaoCard
              refeicao={item}
              onPress={() =>
                navigation.navigate('detalhesRefeicao', { refeicaoId: item.id })
              }
            />
          )}
          ListEmptyComponent={
            <EmptyText>
              {'Nenhuma refeição cadastrada.\nAdicione sua primeira refeição!'}
            </EmptyText>
          }
          showsVerticalScrollIndicator={false}
        />
      </ListContainer>
    </Container>
  );
}
