import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Routes } from '@/routes';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Routes />
    </SafeAreaProvider>
  );
}
