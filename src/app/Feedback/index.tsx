import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppRoutes } from '@/routes';
import {
  Container,
  Title,
  Description,
  Illustration,
  BackButton,
  BackButtonLabel,
} from './styles';

type RouteParams = RouteProp<AppRoutes, 'feedback'>;

export default function Feedback() {
  const navigation = useNavigation<NativeStackNavigationProp<AppRoutes>>();
  const route = useRoute<RouteParams>();
  const { dentroODieta } = route.params;

  return (
    <Container>
      <Title dentroODieta={dentroODieta}>
        {dentroODieta ? 'Continue assim!' : 'Que pena!'}
      </Title>

      <Description>
        {dentroODieta
          ? 'Você continua dentro da dieta. Continue se esforçando e mantendo o foco!'
          : 'Você saiu da dieta desta vez, mas continue tentando e não desanime!'}
      </Description>

      <Illustration>{dentroODieta ? '🥗' : '🍔'}</Illustration>

      <BackButton onPress={() => navigation.navigate('home')}>
        <BackButtonLabel>Ir para a página inicial</BackButtonLabel>
      </BackButton>
    </Container>
  );
}
