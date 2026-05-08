// 1. Importamos a biblioteca padrão para persistência local no dispositivo.
import AsyncStorage from "@react-native-async-storage/async-storage";
// 2. Importamos o Enum/Tipo para garantir que o status seja sempre consistente (PENDING ou DONE).
// import { TransactionTypes } from "@/utils/TransactionTypes";
import { TransactionTypes } from "@/utils/TransactionTypes";

// 3. Definimos uma constante para a chave. O prefixo '@target:' evita conflitos com outras chaves no app.
export const TRANSACTION_STORAGE_KEY = "@target:storage";

// 4. Definição do Tipo (Interface) para que o TypeScript nos dê autocompletar e segurança de tipos.
export type TransactionStorage = {
	id: string;
	title: string;
	value: number;
	type: TransactionTypes;
	metaId: string;
};

// 5. Método Privado/Interno: Busca a string bruta no disco e converte para Objeto JS (Parse).
async function get(): Promise<TransactionStorage[]> {
	try {
		const storage = await AsyncStorage.getItem(TRANSACTION_STORAGE_KEY);
		// 6. Se 'storage' existir, fazemos o parse; caso contrário, retornamos um array vazio.
		return storage ? JSON.parse(storage) : [];
	} catch (error) {
		// 7. Relançamos o erro com um prefixo para facilitar o rastreamento em logs de erro.
		throw new Error("META_GET: " + error);
	}
}

// 9. Método Privado: Pega o Objeto JS, converte em String (Serialize) e salva no disco.
async function save(items: TransactionStorage[]): Promise<void> {
	try {
		await AsyncStorage.setItem(
			TRANSACTION_STORAGE_KEY,
			JSON.stringify(items),
		);
	} catch (error) {
		throw new Error("META_SAVE: " + error);
	}
}

// 10. Adição: Segue o princípio da Imutabilidade. Criamos um novo array com o item novo no fim.
async function add(newItem: TransactionStorage): Promise<TransactionStorage[]> {
	const items = await get();
	const updatedItems = [...items, newItem]; // 11. Spread operator (...) para não mutar o array original.
	await save(updatedItems);

	return updatedItems;
}

// 12. Remoção: Filtra todos os itens, EXCETO o que possui o ID informado.
async function remove(id: string): Promise<void> {
	const items = await get();
	const updatedItems = items.filter((item) => item.id !== id);
	await save(updatedItems);
}

// 13. Limpeza: Remove a chave inteira do storage, "resetando" o módulo.
async function clear(): Promise<void> {
	try {
		await AsyncStorage.removeItem(TRANSACTION_STORAGE_KEY);
	} catch (error) {
		throw new Error("META_CLEAR: " + error);
	}
}

async function getByMetaId(metaId: string): Promise<TransactionStorage[]> {
	const items = await get();
	return items.filter((item) => item.metaId === metaId);
}

// 18. Exportamos um objeto unificado (Design Pattern: Singleton/Namespace).
// Isso permite usar: metaStorage.add(), metaStorage.get(), etc.
export const transactionStorage = {
	get,
	add,
	remove,
	clear,
	getByMetaId,
};
