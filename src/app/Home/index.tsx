import {
  Alert,
  FlatList,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './styles';
import { useEffect, useState } from 'react';
import { Orcamento } from '@/types/Orcamento';
import { StatusFilter } from '@/types/FilterStatus';
import { OrcamentoCard } from '@/components/OrcamentoCard';
import { Filter } from '@/components/Filter';
import { Plus, Search, SlidersHorizontal } from 'lucide-react-native';
import { OrcamentoStorage } from '@/storage/orcamentoStorage';
import { StatusOrcamento } from '@/types/StatusOrcamento';
import { NovoOrcamento } from '@/app/NovoOrcamento';

const STATUS_ORCAMENTO: StatusOrcamento[] = [StatusOrcamento.RASCUNHO, StatusOrcamento.ENVIADO, StatusOrcamento.APROVADO, StatusOrcamento.RECUSADO, StatusOrcamento.TODOS];

export default function Home() {
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);
  const [busca, setBusca] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState<StatusFilter>();

  const quantidadeRascunho = orcamentos.filter(o => o.status === StatusOrcamento.RASCUNHO).length;

  useEffect(() => {
    OrcamentoStorage.getOrcamento().then(setOrcamentos);
  }, []);

  async function handleFiltroStatus(status: StatusOrcamento) {
    setFiltroStatus(status);

    const todos = await OrcamentoStorage.getOrcamento();

    if (status === StatusOrcamento.TODOS) {
      setOrcamentos(todos);
      return;
    }
    else {
      const orcamentosFiltrados = await OrcamentoStorage.getOrcamentoByStatus(status);
      setOrcamentos(orcamentosFiltrados);
    }
  }


  async function handleSalvarOrcamento(orcamento: Orcamento) {
    try {
      await OrcamentoStorage.addItem(orcamento);
      setOrcamentos(prev => [...prev, orcamento]);
      setModalVisible(false);
      Alert.alert('Sucesso', `Orçamento "${orcamento.titulo}" criado com sucesso!`);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o orçamento.');
      console.log(error);
    }
  }

  async function recusarOrcamento(orcamentoId: string) {
    try {
      await OrcamentoStorage.recusarOrcamento(orcamentoId);

      const statusAtual = (filtroStatus ?? StatusOrcamento.TODOS) as StatusOrcamento;
      await handleFiltroStatus(statusAtual);
    } catch (error) {
      Alert.alert('Recusar', 'Não foi possível atualizar o status do orçamento.');
      console.log(error);
    }
  }

  function limparOrcamentos() {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja limpar todos os orçamentos? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpar',
          style: 'destructive',
          onPress: async () => {
            await OrcamentoStorage.limparOrcamentos();
            setOrcamentos([]);
            Alert.alert('Sucesso', 'Todos os orçamentos foram limpos.');
          },
        },
      ]
    );
  }


  return (
    <View style={styles.safeArea}>

      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Orçamentos</Text>
          <Text style={styles.headerSubtitle}>
            Você tem {quantidadeRascunho} item{quantidadeRascunho !== 1 ? 's' : ''} em rascunho
          </Text>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.novoButton} onPress={() => setModalVisible(true)}>
            <Plus size={18} color="#ffffff" />
            <Text style={styles.novoButtonText}>Novo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.limparButton} onPress={limparOrcamentos}>
            <Text style={styles.limparButtonText}>Limpar</Text>
          </TouchableOpacity>
        </View>

      </View>


      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <Search size={18} color="#888888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Título ou cliente"
            placeholderTextColor="#aaaaaa"
            value={busca}
            onChangeText={setBusca}
          />
        </View>
        <TouchableOpacity style={styles.sortButton}>
          <SlidersHorizontal size={20} color="#444444" />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersScrollView}
        contentContainerStyle={styles.filtersScroll}
      >
        {STATUS_ORCAMENTO.map(status => (
          <Filter
            key={status}
            status={status}
            isActive={filtroStatus === status}
            onPress={() => handleFiltroStatus(status)}
          />
        ))}
      </ScrollView>

      <FlatList
        data={orcamentos}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum orçamento encontrado.</Text>
        }
        renderItem={({ item }) => (
          <OrcamentoCard
            orcamento={item}
            onReject={recusarOrcamento}
          />
        )}
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <NovoOrcamento
          onSave={handleSalvarOrcamento}
          onClose={() => setModalVisible(false)}
        />
      </Modal>
    </View>
  );
}