import { useSQLiteContext } from "expo-sqlite";

export type UserDatabase = {
    id: number;
    name: string;
    
}

export function useUserDatabase() {
    const database = useSQLiteContext();

    async function create(data: Omit<UserDatabase, "id">) {
        const statement = await database.prepareAsync(
            "INSERT INTO users (name) VALUES ($name)"
        );

        try {
            const result = await statement.executeAsync({
                $name: data.name
            });

            const insertRowId = result.lastInsertRowId.toLocaleString();

            return { insertRowId };
        } catch (error) {
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }


 

    // Função para buscar usuários pelo nome
    async function searchByName(name: string) {
        try {
            const query = "SELECT * FROM users WHERE name LIKE ?";
            const response = await database.getAllAsync<UserDatabase>(
                query,
                `%${name}%`
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Função para remover um usuário
    async function remove(id: number) {
        try {
            await database.execAsync("DELETE FROM users WHERE id = " + id);
        } catch (error) {
            throw error;
        }
    }

    return { create, searchByName, remove};
}
