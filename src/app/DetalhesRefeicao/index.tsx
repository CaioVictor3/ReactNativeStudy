import { useCallback, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft, PencilLine, Trash2 } from 'lucide-react-native';

import { AppRoutes } from '@/routes';
import { Refeicao } from '@/types/Refeicao';
import { RefeicaoStorage } from '@/storage/refeicaoStorage';
import { Button } from '@/components/Button';
import { ConfirmModal } from '@/components/ConfirmModal';
import { DD_COLORS } from '@/theme/dailyDiet';
import { styles } from './_styles';

type RouteParams = RouteProp<AppRoutes, 'detalhesRefeicao'>;

export default function DetalhesRefeicao() {
  const navigation = useNavigation<NativeStackNavigationProp<AppRoutes>>();
  const route = useRoute<RouteParams>();
  const { refeicaoId } = route.params;

  const [refeicao, setRefeicao] = useState<Refeicao | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      RefeicaoStorage.getById(refeicaoId).then(r => setRefeicao(r ?? null));
    }, [refeicaoId])
  );

  function handleEditar() {
    navigation.navigate('novaRefeicao', { refeicaoId });
  }

  function handleExcluir() {
    setDeleteModalVisible(true);
  }

  async function confirmarExclusao() {
    setDeleteModalVisible(false);
    await RefeicaoStorage.remove(refeicaoId);
    navigation.navigate('home');
  }

  if (!refeicao) return null;

  return (
    <SafeAreaView style={refeicao.dentroODieta ? styles.containerDentro : styles.containerFora}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={DD_COLORS.gray2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Refeição</Text>
      </View>

      <View style={refeicao.dentroODieta ? styles.statusBadgeDentro : styles.statusBadgeFora}>
        <Text style={refeicao.dentroODieta ? styles.statusTextDentro : styles.statusTextFora}>
          {refeicao.dentroODieta ? '● dentro da dieta' : '● fora da dieta'}
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Nome</Text>
          <Text style={styles.infoValue}>{refeicao.nome}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Descrição</Text>
          <Text style={styles.infoValue}>{refeicao.descricao}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Data e hora</Text>
          <Text style={styles.infoValue}>{refeicao.data} às {refeicao.hora}</Text>
        </View>

        <View style={styles.buttonsArea}>
          <Button
            title="Editar refeição"
            icon={<PencilLine size={18} color={DD_COLORS.white} />}
            onPress={handleEditar}
          />
          <Button
            title="Excluir refeição"
            variant="secondary"
            icon={<Trash2 size={18} color={DD_COLORS.gray1} />}
            onPress={handleExcluir}
          />
        </View>
      </View>

      <ConfirmModal
        visible={deleteModalVisible}
        title="Excluir refeição"
        message="Deseja excluir esta refeição? Esta ação não pode ser desfeita."
        confirmLabel="Excluir"
        onConfirm={confirmarExclusao}
        onCancel={() => setDeleteModalVisible(false)}
      />
    </SafeAreaView>
  );
}