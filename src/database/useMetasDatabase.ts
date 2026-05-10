import { useSQLiteContext } from "expo-sqlite";

export type Meta = {
  id: number;
  name: string;
  target: number;
  created_at: string;
  updated_at: string;
};

export function useMetasDatabase() {
  const db = useSQLiteContext();

  async function create(name: string, target: number) {
    await db.runAsync(
      "INSERT INTO metas (name, target) VALUES ($name, $target)",
      { $name: name, $target: target }
    );
  }

  async function list() {
    return db.getAllAsync<Meta>(
      "SELECT * FROM metas ORDER BY created_at DESC"
    );
  }

  async function getById(id: number) {
    return db.getFirstAsync<Meta>(
      "SELECT * FROM metas WHERE id = $id",
      { $id: id }
    );
  }

  async function update(id: number, name: string, target: number) {
    await db.runAsync(
      `UPDATE metas
       SET name = $name, target = $target, updated_at = CURRENT_TIMESTAMP
       WHERE id = $id`,
      { $id: id, $name: name, $target: target }
    );
  }

  async function remove(id: number) {
    await db.runAsync(
      "DELETE FROM metas WHERE id = $id",
      { $id: id }
    );
  }

  return { create, list, getById, update, remove };
}
