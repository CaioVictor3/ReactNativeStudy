import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '@/app/Home';
import NovaRefeicao from '@/app/NovaRefeicao';
import DetalhesRefeicao from '@/app/DetalhesRefeicao';
import Estatisticas from '@/app/Estatisticas';
import Feedback from '@/app/Feedback';

export type AppRoutes = {
  home: undefined;
  novaRefeicao: { refeicaoId?: string };
  detalhesRefeicao: { refeicaoId: string };
  estatisticas: undefined;
  feedback: { dentroODieta: boolean };
};

const Stack = createNativeStackNavigator<AppRoutes>();

export function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="novaRefeicao" component={NovaRefeicao} />
        <Stack.Screen name="detalhesRefeicao" component={DetalhesRefeicao} />
        <Stack.Screen name="estatisticas" component={Estatisticas} />
        <Stack.Screen name="feedback" component={Feedback} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
