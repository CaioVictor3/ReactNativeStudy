import {
  Alert,
  FlatList,
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
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { OrcamentoStorage } from '@/storage/orcamentoStorage';
import { StatusOrcamento } from '@/types/StatusOrcamento';

const STATUS_ORCAMENTO: StatusOrcamento[] = [StatusOrcamento.RASCUNHO, StatusOrcamento.ENVIADO, StatusOrcamento.APROVADO, StatusOrcamento.RECUSADO, StatusOrcamento.TODOS];

export default function Home() {
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);
  const [busca, setBusca] = useState('');
  const [titulo, setTitulo] = useState('');
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


  function handleNovoOrcamento() {
    if (!titulo.trim()) {
      return;
    }

    const novoOrcamento: Orcamento = {
      id: Date.now().toString(),
      cliente: '',
      titulo,
      itens: [],
      percentualDesconto: 0,
      status: StatusOrcamento.RASCUNHO,
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
    };

    OrcamentoStorage.addItem(novoOrcamento);
    setOrcamentos(prev => [...prev, novoOrcamento]);
    Alert.alert('Sucesso', `Orçamento criado com sucesso ${novoOrcamento.titulo}!`);
    setTitulo('');
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

      </View>
      <View style={styles.formRow}>
        <TextInput
          style={styles.tituloInput}
          placeholder="Título do orçamento"
          placeholderTextColor="#aaaaaa"
          value={titulo}
          onChangeText={setTitulo}
        />
        <TouchableOpacity style={styles.novoButton}>
          <Text style={styles.novoButtonText} onPress={handleNovoOrcamento}
          >+ Novo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.novoButton}>
          <Text style={styles.novoButtonText} onPress={limparOrcamentos}
          >Limpar</Text>
        </TouchableOpacity>
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
          />
        )}
      />
    </View>
  );
}