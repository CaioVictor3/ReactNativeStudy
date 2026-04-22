import AsyncStorage from '@react-native-async-storage/async-storage';
import { Refeicao } from '@/types/Refeicao';

const STORAGE_KEY = '@dailydiet:refeicoes';

async function saveAll(items: Refeicao[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export const RefeicaoStorage = {
  async getAll(): Promise<Refeicao[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  async getById(id: string): Promise<Refeicao | undefined> {
    const items = await this.getAll();
    return items.find(r => r.id === id);
  },

  async add(refeicao: Refeicao): Promise<void> {
    const items = await this.getAll();
    await saveAll([...items, refeicao]);
  },

  async update(refeicao: Refeicao): Promise<void> {
    const items = await this.getAll();
    const updated = items.map(r => (r.id === refeicao.id ? { ...refeicao } : r));
    await saveAll(updated);
  },

  async remove(id: string): Promise<void> {
    const items = await this.getAll();
    await saveAll(items.filter(r => r.id !== id));
  },
};
