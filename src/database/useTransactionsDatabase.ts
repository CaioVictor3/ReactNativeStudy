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

export function useTransactionsDatabase() {
  const db = useSQLiteContext();

  async function create(
    meta_id: number,
    title: string,
    value: number,
    type: "input" | "output"
  ) {
    await db.runAsync(
      `INSERT INTO transactions (meta_id, title, value, type)
       VALUES ($meta_id, $title, $value, $type)`,
      { $meta_id: meta_id, $title: title, $value: value, $type: type }
    );
  }

  async function listByMeta(meta_id: number) {
    return db.getAllAsync<Transaction>(
      `SELECT * FROM transactions
       WHERE meta_id = $meta_id
       ORDER BY created_at DESC`,
      { $meta_id: meta_id }
    );
  }

  async function getAccumulatedByMeta(meta_id: number) {
    const result = await db.getFirstAsync<{ accumulated: number }>(
      `SELECT
         COALESCE(SUM(CASE WHEN type = 'input'  THEN value ELSE 0 END), 0) -
         COALESCE(SUM(CASE WHEN type = 'output' THEN value ELSE 0 END), 0)
         AS accumulated
       FROM transactions
       WHERE meta_id = $meta_id`,
      { $meta_id: meta_id }
    );
    return result?.accumulated ?? 0;
  }

  async function remove(id: number) {
    await db.runAsync(
      "DELETE FROM transactions WHERE id = $id",
      { $id: id }
    );
  }

  return { create, listByMeta, getAccumulatedByMeta, remove };
}
