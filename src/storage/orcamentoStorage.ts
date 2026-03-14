import AsyncStorage from "@react-native-async-storage/async-storage";
import { Orcamento } from "@/types/Orcamento";
import { StatusOrcamento } from "@/types/StatusOrcamento";
import { Alert } from "react-native";

const KEY = '@compras:orcamentos';

async function saveOrcamentos(items: Orcamento[]): Promise<void> {
    await AsyncStorage.setItem(KEY, JSON.stringify(items));
}

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

async function limparOrcamentos(): Promise<void> {
    try {
        await AsyncStorage.removeItem(KEY);
    } catch (error) {
        throw new Error(`ItemsStorage: clear: ${error}`);
    }
}

async function recusarOrcamento(id: string): Promise<void> {
    const items = await getOrcamento();
    const updated = items.map(item => {
        if (item.id !== id) {
            return item;
        }

        return {
            ...item,
            status: StatusOrcamento.RECUSADO,
            dataAtualizacao: new Date().toISOString(),
        };
    });

    await saveOrcamentos(updated);
}

async function atualizarStatus(id: string, status: StatusOrcamento): Promise<void> {
    const items = await getOrcamento();
    const updated = items.map(item => {
        if (item.id !== id) {
            return item;
        }

        return {
            ...item,
            status,
            dataAtualizacao: new Date().toISOString(),
        };
    });

    await saveOrcamentos(updated);
}

async function addItem(orcamento: Orcamento): Promise<void> {

    const data = await AsyncStorage.getItem(KEY);
    const updatedOrcamento = data ? [...JSON.parse(data), orcamento] : [orcamento];
    await saveOrcamentos(updatedOrcamento);
}

async function deleteItem(id: string): Promise<void> {
    const data = await getOrcamento();
    const filtered = data.filter(item => item.id !== id)
    await saveOrcamentos(filtered);
}

export const OrcamentoStorage = {
    getOrcamento,
    addItem,
    deleteItem,
    getOrcamentoByStatus,
    limparOrcamentos,
    recusarOrcamento,
    atualizarStatus,
}