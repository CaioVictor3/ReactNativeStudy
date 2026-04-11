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
import { Check, Plus, Search, SlidersHorizontal, X } from 'lucide-react-native';
import { OrcamentoStorage } from '@/storage/orcamentoStorage';
import { StatusOrcamento } from '@/types/StatusOrcamento';
import { NovoOrcamento } from '@/app/NovoOrcamento';
import VisualizarOrcamento from '../VisualizarOrcamento';
import { OrcamentoIcon } from '@/components/OrcamentoIcon';

const STATUS_ORCAMENTO: StatusOrcamento[] = [StatusOrcamento.RASCUNHO, StatusOrcamento.ENVIADO, StatusOrcamento.APROVADO, StatusOrcamento.RECUSADO, StatusOrcamento.TODOS];
const STATUS_FILTRO: StatusOrcamento[] = [StatusOrcamento.RASCUNHO, StatusOrcamento.ENVIADO, StatusOrcamento.APROVADO, StatusOrcamento.RECUSADO];
type Ordenacao = 'recente' | 'antigo' | 'maior' | 'menor';

export default function Home() {
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);
  const [busca, setBusca] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOrcamento, setModalOrcamento] = useState<Orcamento | null>(null);
  const [modalOrcamentoVisible, setModalOrcamentoVisible] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState<StatusFilter>();

  // Filtro avançado
  const [filtroModalVisible, setFiltroModalVisible] = useState(false);
  const [filtroStatusTemp, setFiltroStatusTemp] = useState<StatusOrcamento[]>([]);
  const [filtroOrdenacao, setFiltroOrdenacao] = useState<Ordenacao>('recente');

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

  function toggleStatusFiltro(status: StatusOrcamento) {
    setFiltroStatusTemp(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  }

  async function handleAplicarFiltro() {
    const todos = await OrcamentoStorage.getOrcamento();

    let resultado = filtroStatusTemp.length > 0
      ? todos.filter(o => filtroStatusTemp.includes(o.status))
      : todos;

    const getTotal = (o: Orcamento) => {
      const sub = o.itens.reduce((acc, it) => acc + it.precoUnitario * it.quantidade, 0);
      return sub - (o.percentualDesconto ? sub * o.percentualDesconto / 100 : 0);
    };

    switch (filtroOrdenacao) {
      case 'antigo':
        resultado = [...resultado].sort((a, b) => a.dataCriacao.localeCompare(b.dataCriacao));
        break;
      case 'maior':
        resultado = [...resultado].sort((a, b) => getTotal(b) - getTotal(a));
        break;
      case 'menor':
        resultado = [...resultado].sort((a, b) => getTotal(a) - getTotal(b));
        break;
      case 'recente':
      default:
        resultado = [...resultado].sort((a, b) => b.dataCriacao.localeCompare(a.dataCriacao));
    }

    setOrcamentos(resultado);
    setFiltroModalVisible(false);
  }

  function handleResetarFiltros() {
    setFiltroStatusTemp([]);
    setFiltroOrdenacao('recente');
  }

  const ORDENACOES: { key: Ordenacao; label: string }[] = [
    { key: 'recente', label: 'Mais recente' },
    { key: 'antigo', label: 'Mais antigo' },
    { key: 'maior', label: 'Maior valor' },
    { key: 'menor', label: 'Menor valor' },
  ];

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
        <TouchableOpacity style={styles.sortButton} onPress={() => setFiltroModalVisible(true)}>
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
            onPress={() => {
              setModalOrcamento(item);
              setModalOrcamentoVisible(true);
            }}
          />
        )}
      />

      {/* Modal novo orçamento */}
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

      {/* Modal visualizar orçamento */}
      <Modal
        visible={modalOrcamentoVisible}
        animationType="slide"
        onRequestClose={() => setModalOrcamentoVisible(false)}
      >
        <VisualizarOrcamento
          item={modalOrcamento!}
          onClose={() => setModalOrcamentoVisible(false)}
          onDelete={() => {
            setOrcamentos(prev => prev.filter(o => o.id !== modalOrcamento?.id));
            setModalOrcamentoVisible(false);
          }}
          onUpdate={(updated) => {
            setOrcamentos(prev => prev.map(o => o.id === updated.id ? updated : o));
            setModalOrcamento(updated);
          }}
        />
      </Modal>

      {/* Modal filtrar e ordenar */}
      <Modal
        visible={filtroModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFiltroModalVisible(false)}
      >
        <View style={styles.filtroOverlay}>
          <View style={styles.filtroContainer}>
            <View style={styles.filtroHeader}>
              <Text style={styles.filtroTitle}>Filtrar e ordenar</Text>
              <TouchableOpacity onPress={() => setFiltroModalVisible(false)}>
                <X size={22} color="#444444" />
              </TouchableOpacity>
            </View>

            <Text style={styles.filtroSectionLabel}>Status</Text>
            {STATUS_FILTRO.map(status => (
              <TouchableOpacity
                key={status}
                style={styles.filtroCheckRow}
                onPress={() => toggleStatusFiltro(status)}
              >
                <View style={[styles.checkbox, filtroStatusTemp.includes(status) && styles.checkboxActive]}>
                  {filtroStatusTemp.includes(status) && <Check size={12} color="#ffffff" />}
                </View>
                <OrcamentoIcon status={status} />
              </TouchableOpacity>
            ))}

            <Text style={[styles.filtroSectionLabel, { marginTop: 20 }]}>Ordenação</Text>
            {ORDENACOES.map(({ key, label }) => (
              <TouchableOpacity
                key={key}
                style={styles.filtroRadioRow}
                onPress={() => setFiltroOrdenacao(key)}
              >
                <View style={[styles.radio, filtroOrdenacao === key && styles.radioActive]}>
                  {filtroOrdenacao === key && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.filtroRadioLabel}>{label}</Text>
              </TouchableOpacity>
            ))}

            <View style={styles.filtroActions}>
              <TouchableOpacity style={styles.resetarButton} onPress={handleResetarFiltros}>
                <Text style={styles.resetarText}>Resetar filtros</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.aplicarButton} onPress={handleAplicarFiltro}>
                <Check size={16} color="#ffffff" />
                <Text style={styles.aplicarText}>Aplicar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}
