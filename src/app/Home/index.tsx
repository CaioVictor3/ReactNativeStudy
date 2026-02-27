import {
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
import { Orcamentotorage } from '@/storage/orcamentoStorage';

const STATUS_FILTERS: StatusFilter[] = ['Todos', 'Rascunho', 'Enviado', 'Aprovado', 'Recusado'];

export default function Home() {
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);
  const [busca, setBusca] = useState('');
  const [titulo, setTitulo] = useState('');


  const quantidadeRascunho = orcamentos.filter(o => o.status === 'Rascunho').length;

  useEffect(() => {
    Orcamentotorage.getOrcamento().then(setOrcamentos);
  }, []);


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
      status: 'Rascunho',
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
    };

     Orcamentotorage.addItem(novoOrcamento);
    setOrcamentos(prev => [...prev, novoOrcamento]);
    setTitulo('');
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
        {STATUS_FILTERS.map(status => (
          <Filter
            key={status}
            status={status}
            isActive={'Todos' === status}
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