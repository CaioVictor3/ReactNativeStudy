import { useSQLiteContext } from "expo-sqlite";

export type Meta = {
	id: number;
	name: string;
	target: number;
	current: number;
	percentage: number;
	created_at: string;
	updated_at: string;
};

const WITH_BALANCE = `
	SELECT
		m.id,
		m.name,
		m.target,
		m.created_at,
		m.updated_at,
		COALESCE(SUM(CASE WHEN t.type = 'input' THEN t.value ELSE -t.value END), 0) AS current,
		CASE
			WHEN m.target = 0 THEN 0
			ELSE ROUND(COALESCE(SUM(CASE WHEN t.type = 'input' THEN t.value ELSE -t.value END), 0) / m.target * 100)
		END AS percentage
	FROM metas m
	LEFT JOIN transactions t ON t.meta_id = m.id
`;

export function useMetasDatabase() {
	const db = useSQLiteContext();

	async function create(name: string, target: number): Promise<void> {
		await db.runAsync(
			"INSERT INTO metas (name, target) VALUES ($name, $target)",
			{ $name: name, $target: target },
		);
	}

	async function list(): Promise<Meta[]> {
		return db.getAllAsync<Meta>(
			`${WITH_BALANCE} GROUP BY m.id ORDER BY m.created_at DESC`,
		);
	}

	async function getById(id: number): Promise<Meta | null> {
		return db.getFirstAsync<Meta>(
			`${WITH_BALANCE} WHERE m.id = $id GROUP BY m.id`,
			{ $id: id },
		);
	}

	async function update(
		id: number,
		name: string,
		target: number,
	): Promise<void> {
		await db.runAsync(
			"UPDATE metas SET name = $name, target = $target, updated_at = CURRENT_TIMESTAMP WHERE id = $id",
			{ $name: name, $target: target, $id: id },
		);
	}

	async function remove(id: number): Promise<void> {
		await db.runAsync("DELETE FROM metas WHERE id = $id", { $id: id });
	}

	return { create, list, getById, update, remove };
}
