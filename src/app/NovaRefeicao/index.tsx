import { useState, useEffect } from 'react';
import { Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft } from 'lucide-react-native';

import { AppRoutes } from '@/routes';
import { Refeicao } from '@/types/Refeicao';
import { RefeicaoStorage } from '@/storage/refeicaoStorage';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { THEME } from '@/theme';
import {
  Container,
  Header,
  BackButton,
  Title,
  Content,
  Row,
  DietLabel,
  DietRow,
  DietOption,
  DietDot,
  DietOptionLabel,
} from './styles';

type RouteParams = RouteProp<AppRoutes, 'novaRefeicao'>;

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function maskData(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

function maskHora(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}:${digits.slice(2)}`;
}

export default function NovaRefeicao() {
  const navigation = useNavigation<NativeStackNavigationProp<AppRoutes>>();
  const route = useRoute<RouteParams>();
  const refeicaoId = route.params?.refeicaoId;
  const isEditing = !!refeicaoId;

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [dentroODieta, setDentroODieta] = useState<boolean | null>(null);

  useEffect(() => {
    if (refeicaoId) {
      RefeicaoStorage.getById(refeicaoId).then(r => {
        if (r) {
          setNome(r.nome);
          setDescricao(r.descricao);
          setData(r.data);
          setHora(r.hora);
          setDentroODieta(r.dentroODieta);
        }
      });
    }
  }, [refeicaoId]);

  async function handleSalvar() {
    if (!nome.trim() || !descricao.trim() || !data.trim() || !hora.trim() || dentroODieta === null) {
      return Alert.alert('Campos obrigatórios', 'Preencha todos os campos antes de salvar.');
    }
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(data)) {
      return Alert.alert('Data inválida', 'Use o formato DD/MM/AAAA.');
    }
    if (!/^\d{2}:\d{2}$/.test(hora)) {
      return Alert.alert('Hora inválida', 'Use o formato HH:MM.');
    }

    try {
      if (isEditing) {
        const existing = await RefeicaoStorage.getById(refeicaoId!);
        if (existing) {
          await RefeicaoStorage.update({ ...existing, nome, descricao, data, hora, dentroODieta });
          navigation.goBack();
        }
      } else {
        const nova: Refeicao = {
          id: generateId(),
          nome,
          descricao,
          data,
          hora,
          dentroODieta: dentroODieta!,
          criadoEm: new Date().toISOString(),
        };
        await RefeicaoStorage.add(nova);
        navigation.navigate('feedback', { dentroODieta: dentroODieta! });
      }
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar a refeição.');
    }
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={THEME.COLORS.GRAY_2} />
        </BackButton>
        <Title>{isEditing ? 'Editar refeição' : 'Nova refeição'}</Title>
      </Header>

      <Content>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Input label="Nome" value={nome} onChangeText={setNome} placeholder="Nome da refeição" />
          <Input
            label="Descrição"
            value={descricao}
            onChangeText={setDescricao}
            placeholder="Descreva a refeição"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <Row>
            <Input
              label="Data"
              value={data}
              onChangeText={v => setData(maskData(v))}
              placeholder="DD/MM/AAAA"
              keyboardType="numeric"
              maxLength={10}
              containerStyle={{ flex: 1, marginRight: 20 }}
            />
            <Input
              label="Hora"
              value={hora}
              onChangeText={v => setHora(maskHora(v))}
              placeholder="HH:MM"
              keyboardType="numeric"
              maxLength={5}
              containerStyle={{ flex: 1 }}
            />
          </Row>

          <DietLabel>Está dentro da dieta?</DietLabel>
          <DietRow>
            <DietOption
              $selected={dentroODieta === true}
              $dietType="sim"
              onPress={() => setDentroODieta(true)}
            >
              <DietDot $dietType="sim" />
              <DietOptionLabel>Sim</DietOptionLabel>
            </DietOption>
            <DietOption
              $selected={dentroODieta === false}
              $dietType="nao"
              onPress={() => setDentroODieta(false)}
            >
              <DietDot $dietType="nao" />
              <DietOptionLabel>Não</DietOptionLabel>
            </DietOption>
          </DietRow>

          <Button
            title={isEditing ? 'Salvar alterações' : 'Cadastrar refeição'}
            onPress={handleSalvar}
          />
        </ScrollView>
      </Content>
    </Container>
  );
}
