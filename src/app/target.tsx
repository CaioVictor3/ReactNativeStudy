import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { HeaderTitle } from "@react-navigation/elements";
import { useState } from "react";
import { View } from "react-native";

import { metaStorage, MetaStorage } from "@/storage/MetaStorage";
import { router } from "expo-router";

export default function Target() {
	const [name, setName] = useState("");
	const [target, setTarget] = useState(0);

	function handleNewMeta() {
		const newMeta: MetaStorage = {
			id: Date.now().toString(), // Gera um ID único baseado no timestamp atual.
			name,
			target,
		};
		metaStorage
			.add(newMeta)
			.then(() => {
				router.navigate("/"); // Volta para a tela inicial após salvar a nova meta.
			})
			.catch((error) => {
				console.error("Erro ao salvar a meta:", error);
			});
	}

	return (
		<View style={{ flex: 1, padding: 24, gap: 24 }}>
			<HeaderTitle>Nova Meta</HeaderTitle>

			<Input
				label="Motivo"
				placeholder="Ex: Carro"
				value={name}
				onChangeText={setName}
			/>

			<CurrencyInput
				label="Valor (R$)"
				value={target}
				onChangeValue={(value) => {
					setTarget(value || 0);
				}}
			/>

			<Button title={`Salvar`} onPress={handleNewMeta} />
		</View>
	);
}
