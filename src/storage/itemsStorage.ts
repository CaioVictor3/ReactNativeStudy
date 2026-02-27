import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const KEY = '@compras:items';

export type Item = {
    id: string;
    description: string;
    status: 'pending' | 'done';
};

async function getItems(): Promise<Item[]> {
    try {
        const data = await AsyncStorage.getItem(KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.log(error);
        Alert.alert('Erro', 'Não foi possível carregar os itens.');
        return [];
    }
}

async function saveItems(items: Item[]): Promise<void> {
    try {
        const jsonValue = JSON.stringify(items);
        await AsyncStorage.setItem(KEY, jsonValue);
    } catch (error) {
        console.log(error);
        Alert.alert('Erro', 'Não foi possível salvar os itens.');
    }
}

async function addItem(description: string): Promise<void> {
    try {
        const items = await getItems();
        const newItem: Item = {
            id: Date.now().toString(),
            description,
            status: 'pending',
        };
        const updatedItems = [...items, newItem];
        await saveItems(updatedItems);
    } catch (error) {
        console.log(error);
        Alert.alert('Erro', 'Não foi possível adicionar o item.');
    }
}

async function deleteItem(id: string): Promise<void> {
    const items = await getItems();
    const filtered = items.filter(item => item.id !== id)
    await saveItems(filtered);
}

export const itemStorage = {
    getItems,
    addItem,
    deleteItem,
}