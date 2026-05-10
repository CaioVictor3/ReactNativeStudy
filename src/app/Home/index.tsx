import { useCallback, useState } from 'react';
import { Image, SafeAreaView, SectionList, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Plus, ArrowUpRight } from 'lucide-react-native';

import { AppRoutes } from '@/routes';
import { Refeicao } from '@/types/Refeicao';
import { RefeicaoStorage } from '@/storage/refeicaoStorage';
import { RefeicaoCard } from '@/components/RefeicaoCard';
import { DD_COLORS } from '@/theme/dailyDiet';
import { styles } from './_styles';

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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerLogo}>Daily Diet</Text>
        <Image source={{ uri: 'https://i.pravatar.cc/100' }} style={styles.userAvatar} />
      </View>

      <TouchableOpacity
        style={isPositivo ? styles.percentageCardPositivo : styles.percentageCardNegativo}
        onPress={() => navigation.navigate('estatisticas')}
      >
        <View style={styles.percentageArrow}>
          <ArrowUpRight size={24} color={isPositivo ? DD_COLORS.greenDark : DD_COLORS.redDark} />
        </View>
        <Text style={isPositivo ? styles.percentageNumberPositivo : styles.percentageNumberNegativo}>
          {percentual.toFixed(2).replace('.', ',')}%
        </Text>
        <Text style={styles.percentageLabel}>das refeições dentro da dieta</Text>
      </TouchableOpacity>

      <View style={styles.listContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('novaRefeicao', {})}>
          <Plus size={18} color={DD_COLORS.white} />
          <Text style={styles.addButtonLabel}>Nova refeição</Text>
        </TouchableOpacity>

        <SectionList
          sections={sections}
          keyExtractor={item => item.id}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionTitle}>{section.title}</Text>
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
            <Text style={styles.emptyText}>
              {'Nenhuma refeição cadastrada.\nAdicione sua primeira refeição!'}
            </Text>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}