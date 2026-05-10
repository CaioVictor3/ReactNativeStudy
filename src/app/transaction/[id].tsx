import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { TransactionType } from "@/components/TransactionType";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { HeaderTitle } from "@react-navigation/elements";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Transaction() {
	const insets = useSafeAreaInsets();
	const params = useLocalSearchParams<{ id: string }>();
	const { create } = useTransactionsDatabase();

	const [type, setType] = useState<"input" | "output">(TransactionTypes.Input);
	const [value, setValue] = useState<number | null>(0);
	const [title, setTitle] = useState("");

	async function handleNewTransaction() {
		await create(Number(params.id), title, value || 0, type);
		router.navigate(`/in-progress/${params.id}`);
	}

	return (
		<View style={{ flex: 1, paddingTop: insets.top + 16, paddingBottom: Math.max(insets.bottom, 16), paddingHorizontal: 24, gap: 24 }}>
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
