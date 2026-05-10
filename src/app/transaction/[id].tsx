import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { TransactionType } from "@/components/TransactionType";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";
import { HeaderTitle } from "@react-navigation/elements";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function Transaction() {
	const params = useLocalSearchParams<{ id: string }>();
	const transactionsDatabase = useTransactionsDatabase();
	const [type, setType] = useState<"input" | "output">("input");
	const [value, setValue] = useState<number | null>(0);
	const [title, setTitle] = useState("");

	async function handleNewTransaction() {
		await transactionsDatabase.create(
			Number(params.id),
			title,
			value || 0,
			type,
		);
		router.navigate(`/in-progress/${params.id}`);
	}

	return (
		<View style={{ flex: 1, padding: 24, gap: 24 }}>
			<HeaderTitle>Nova Transação</HeaderTitle>

			<TransactionType selected={type} onChange={setType} />

			<CurrencyInput
				label="Valor (R$)"
				value={value}
				onChangeValue={setValue}
			/>

			<Input
				label="Motivo"
				placeholder="Ex: Investir em CDB"
				value={title}
				onChangeText={setTitle}
			/>

			<Button
				title={`Salvar na meta ${params.id}`}
				onPress={handleNewTransaction}
			/>
		</View>
	);
}
