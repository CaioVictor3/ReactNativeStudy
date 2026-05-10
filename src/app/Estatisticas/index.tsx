import { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft } from 'lucide-react-native';

import { AppRoutes } from '@/routes';
import { Refeicao } from '@/types/Refeicao';
import { RefeicaoStorage } from '@/storage/refeicaoStorage';
import { DD_COLORS } from '@/theme/dailyDiet';
import { styles } from './_styles';

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
  let contador = 0;

  for (const r of sorted) {
    if (r.dentroODieta) {
      contador++;
      if (contador > melhorSequencia) melhorSequencia = contador;
    } else {
      contador = 0;
    }
  }
  const sequenciaAtual = contador;

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
    <SafeAreaView style={isPositivo ? styles.containerPositivo : styles.containerNegativo}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={isPositivo ? DD_COLORS.greenDark : DD_COLORS.redDark} />
        </TouchableOpacity>
        <Text style={isPositivo ? styles.percentageNumberPositivo : styles.percentageNumberNegativo}>
          {stats.percentual.toFixed(2).replace('.', ',')}%
        </Text>
        <Text style={styles.percentageLabel}>das refeições dentro da dieta</Text>
      </View>

      <View style={styles.cardsArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.melhorSequencia}</Text>
            <Text style={styles.statLabel}>{'melhor sequência de refeições\ndentro da dieta'}</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.sequenciaAtual}</Text>
            <Text style={styles.statLabel}>{'sequência atual de refeições\ndentro da dieta'}</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.total}</Text>
            <Text style={styles.statLabel}>refeições registradas</Text>
          </View>

          <View style={styles.cardRow}>
            <View style={[styles.statCardGreen, { flex: 1 }]}>
              <Text style={styles.statNumber}>{stats.dentro}</Text>
              <Text style={styles.statLabel}>{'refeições dentro da dieta'}</Text>
            </View>
            <View style={[styles.statCardRed, { flex: 1 }]}>
              <Text style={styles.statNumber}>{stats.fora}</Text>
              <Text style={styles.statLabel}>{'refeições\nfora da dieta'}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}