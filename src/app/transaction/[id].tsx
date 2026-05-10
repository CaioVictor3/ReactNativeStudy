import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { TransactionType } from "@/components/TransactionType";
import {
	transactionStorage,
	TransactionStorage,
} from "@/storage/TransactionStorage";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { HeaderTitle } from "@react-navigation/elements";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function Transaction() {
	const params = useLocalSearchParams<{ id: string }>();
	const [type, setType] = useState(TransactionTypes.Input);
	const [value, setValue] = useState<number | null>(0);
	const [title, setTitle] = useState("");

	function handleNewTransaction() {
		const newTransaction: TransactionStorage = {
			id: Date.now().toString(), // Gera um ID único baseado no timestamp atual.
			metaId: params.id,
			type,
			value: value || 0,
			title,
		};

		transactionStorage
			.add(newTransaction)
			.then(() => {
				router.navigate(`/in-progress/${params.id}`); // Volta para a tela de detalhes da meta após salvar a nova transação.
			})
			.catch((error) => {
				console.error("Erro ao salvar a transação:", error);
			});
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
