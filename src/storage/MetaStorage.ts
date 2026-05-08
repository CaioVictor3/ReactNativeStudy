// 1. Importamos a biblioteca padrão para persistência local no dispositivo.
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	TRANSACTION_STORAGE_KEY,
	TransactionStorage,
} from "./TransactionStorage";
// 2. Importamos o Enum/Tipo para garantir que o status seja sempre consistente (PENDING ou DONE).
// import { TransactionTypes } from "@/utils/TransactionTypes";

// 3. Definimos uma constante para a chave. O prefixo '@target:' evita conflitos com outras chaves no app.
const META_STORAGE_KEY = "@target:meta";

// 4. Definição do Tipo (Interface) para que o TypeScript nos dê autocompletar e segurança de tipos.
export type MetaStorage = {
	id: string;
	name: string;
	target: number;
	current?: number;
	percentage?: number;
};

// 5. Método Privado/Interno: Busca a string bruta no disco e converte para Objeto JS (Parse).
async function get(): Promise<MetaStorage[]> {
	try {
		const storage = await AsyncStorage.getItem(META_STORAGE_KEY);

		if (storage) {
			let metas: MetaStorage[] = JSON.parse(storage);

			const transactions = await AsyncStorage.getItem(
				TRANSACTION_STORAGE_KEY,
			);

			if (transactions) {
				let metasTransactions: TransactionStorage[] =
					JSON.parse(transactions);

				metas = metas.map((meta) => {
					const relatedTransactions = metasTransactions.filter(
						(transaction) => transaction.metaId === meta.id,
					);

					const current = relatedTransactions.reduce(
						(acc, transaction) => {
							if (transaction.type === "input") {
								return acc + transaction.value;
							} else {
								return acc - transaction.value;
							}
						},
						0,
					);

					return {
						...meta,
						current,
						percentage: Math.round((current / meta.target) * 100),
					};
				});
			} else {
				metas = metas.map((meta) => ({
					...meta,
					current: 0,
					percentage: 0,
				}));
			}

			return metas;
		}

		// 6. Se 'storage' existir, fazemos o parse; caso contrário, retornamos um array vazio.
		return [];
	} catch (error) {
		// 7. Relançamos o erro com um prefixo para facilitar o rastreamento em logs de erro.
		throw new Error("META_GET: " + error);
	}
}

async function getById(id: string): Promise<MetaStorage | null> {
	const metas = await get();
	return metas.find((meta) => meta.id === id) || null;
}

// 9. Método Privado: Pega o Objeto JS, converte em String (Serialize) e salva no disco.
async function save(items: MetaStorage[]): Promise<void> {
	try {
		await AsyncStorage.setItem(META_STORAGE_KEY, JSON.stringify(items));
	} catch (error) {
		throw new Error("META_SAVE: " + error);
	}
}

// 10. Adição: Segue o princípio da Imutabilidade. Criamos um novo array com o item novo no fim.
async function add(newItem: MetaStorage): Promise<MetaStorage[]> {
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
		await AsyncStorage.removeItem(META_STORAGE_KEY);
	} catch (error) {
		throw new Error("META_CLEAR: " + error);
	}
}

async function update(updatedItem: MetaStorage): Promise<MetaStorage[]> {
	const items = await get();
	const updatedItems = items.map((item) =>
		item.id === updatedItem.id ? updatedItem : item,
	);
	await save(updatedItems);
	return updatedItems;
}

// 18. Exportamos um objeto unificado (Design Pattern: Singleton/Namespace).
// Isso permite usar: metaStorage.add(), metaStorage.get(), etc.
export const metaStorage = {
	get,
	getById,
	add,
	remove,
	clear,
	update,
};
