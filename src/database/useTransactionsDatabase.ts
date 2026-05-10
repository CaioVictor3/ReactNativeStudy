import { useSQLiteContext } from "expo-sqlite";

export type Transaction = {
	id: number;
	meta_id: number;
	title: string;
	value: number;
	type: "input" | "output";
	created_at: string;
	updated_at: string;
};

export type Summary = {
	totalInput: number;
	totalOutput: number;
};

export function useTransactionsDatabase() {
	const db = useSQLiteContext();

	async function create(
		meta_id: number,
		title: string,
		value: number,
		type: "input" | "output",
	): Promise<void> {
		await db.runAsync(
			"INSERT INTO transactions (meta_id, title, value, type) VALUES ($meta_id, $title, $value, $type)",
			{ $meta_id: meta_id, $title: title, $value: value, $type: type },
		);
	}

	async function listByMeta(meta_id: number): Promise<Transaction[]> {
		return db.getAllAsync<Transaction>(
			"SELECT * FROM transactions WHERE meta_id = $meta_id ORDER BY created_at DESC",
			{ $meta_id: meta_id },
		);
	}

	async function remove(id: number): Promise<void> {
		await db.runAsync("DELETE FROM transactions WHERE id = $id", {
			$id: id,
		});
	}

	async function summary(): Promise<Summary> {
		const result = await db.getFirstAsync<Summary>(`
			SELECT
				COALESCE(SUM(CASE WHEN type = 'input' THEN value ELSE 0 END), 0) AS totalInput,
				COALESCE(SUM(CASE WHEN type = 'output' THEN value ELSE 0 END), 0) AS totalOutput
			FROM transactions
		`);
		return result ?? { totalInput: 0, totalOutput: 0 };
	}

	return { create, listByMeta, remove, summary };
}
