import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppRoutes } from '@/routes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './_styles';

type RouteParams = RouteProp<AppRoutes, 'feedback'>;

export default function Feedback() {
  const navigation = useNavigation<NativeStackNavigationProp<AppRoutes>>();
  const route = useRoute<RouteParams>();
  const { dentroODieta } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={dentroODieta ? styles.titleDentro : styles.titleFora}>
        {dentroODieta ? 'Continue assim!' : 'Que pena!'}
      </Text>

      <Text style={styles.description}>
        {dentroODieta
          ? 'Você continua dentro da dieta. Continue se esforçando e mantendo o foco!'
          : 'Você saiu da dieta desta vez, mas continue tentando e não desanime!'}
      </Text>

      <Text style={styles.illustration}>{dentroODieta ? '🥗' : '🍔'}</Text>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('home')}>
        <Text style={styles.backButtonLabel}>Ir para a página inicial</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
