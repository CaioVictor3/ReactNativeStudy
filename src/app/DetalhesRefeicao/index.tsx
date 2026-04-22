import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect, useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft, PencilLine, Trash2 } from 'lucide-react-native';

import { AppRoutes } from '@/routes';
import { Refeicao } from '@/types/Refeicao';
import { RefeicaoStorage } from '@/storage/refeicaoStorage';
import { Button } from '@/components/Button';
import { THEME } from '@/theme';
import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  StatusBadge,
  StatusText,
  Content,
  InfoSection,
  InfoLabel,
  InfoValue,
  ButtonsArea,
} from './styles';

type RouteParams = RouteProp<AppRoutes, 'detalhesRefeicao'>;

export default function DetalhesRefeicao() {
  const navigation = useNavigation<NativeStackNavigationProp<AppRoutes>>();
  const route = useRoute<RouteParams>();
  const { refeicaoId } = route.params;

  const [refeicao, setRefeicao] = useState<Refeicao | null>(null);

  useFocusEffect(
    useCallback(() => {
      RefeicaoStorage.getById(refeicaoId).then(r => setRefeicao(r ?? null));
    }, [refeicaoId])
  );

  function handleEditar() {
    navigation.navigate('novaRefeicao', { refeicaoId });
  }

  function handleExcluir() {
    Alert.alert(
      'Excluir refeição',
      'Deseja excluir esta refeição? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await RefeicaoStorage.remove(refeicaoId);
            navigation.navigate('home');
          },
        },
      ]
    );
  }

  if (!refeicao) return null;

  return (
    <Container dentroODieta={refeicao.dentroODieta}>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={THEME.COLORS.GRAY_2} />
        </BackButton>
        <HeaderTitle>Refeição</HeaderTitle>
      </Header>

      <StatusBadge dentroODieta={refeicao.dentroODieta}>
        <StatusText dentroODieta={refeicao.dentroODieta}>
          {refeicao.dentroODieta ? '● dentro da dieta' : '● fora da dieta'}
        </StatusText>
      </StatusBadge>

      <Content>
        <InfoSection>
          <InfoLabel>Nome</InfoLabel>
          <InfoValue>{refeicao.nome}</InfoValue>
        </InfoSection>

        <InfoSection>
          <InfoLabel>Descrição</InfoLabel>
          <InfoValue>{refeicao.descricao}</InfoValue>
        </InfoSection>

        <InfoSection>
          <InfoLabel>Data e hora</InfoLabel>
          <InfoValue>{refeicao.data} às {refeicao.hora}</InfoValue>
        </InfoSection>

        <ButtonsArea>
          <Button
            title="Editar refeição"
            icon={<PencilLine size={18} color={THEME.COLORS.WHITE} />}
            onPress={handleEditar}
          />
          <Button
            title="Excluir refeição"
            variant="secondary"
            icon={<Trash2 size={18} color={THEME.COLORS.GRAY_1} />}
            onPress={handleExcluir}
          />
        </ButtonsArea>
      </Content>
    </Container>
  );
}
