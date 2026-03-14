import AsyncStorage from "@react-native-async-storage/async-storage";
import { Orcamento } from "@/types/Orcamento";
import { StatusOrcamento } from "@/types/StatusOrcamento";
import { Alert } from "react-native";

const KEY = '@compras:orcamentos';

async function getOrcamento(): Promise<Orcamento[]> {
    try {
        const data = await AsyncStorage.getItem(KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.log(error);
        Alert.alert('Erro', 'Não foi possível carregar os itens.');
        return [];
    }
}

async function getOrcamentoByStatus(status: StatusOrcamento): Promise<Orcamento[]> {
    const item = await getOrcamento()
    return item.filter(i => i.status === status);
}


async function addItem(orcamento: Orcamento): Promise<void> {

        const data = await AsyncStorage.getItem(KEY);
        const updatedOrcamento = data ? [...JSON.parse(data), orcamento] : [orcamento];
        await AsyncStorage.setItem(KEY, JSON.stringify(updatedOrcamento));
}

async function deleteItem(id: string): Promise<void> {
    const data = await getOrcamento();
    const filtered = data.filter(item => item.id !== id)
    await AsyncStorage.setItem(KEY, JSON.stringify(filtered));
}

export const Orcamentotorage = {
    getOrcamento,
    addItem,
    deleteItem,
    getOrcamentoByStatus
}