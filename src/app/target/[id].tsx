import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { HeaderTitle } from "@react-navigation/elements";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";

import { metaStorage, MetaStorage } from "@/storage/MetaStorage";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

export default function Target() {
	const params = useLocalSearchParams<{ id: string }>();
	const mode = params.id === "new" ? "create" : "edit";

	const [name, setName] = useState("");
	const [target, setTarget] = useState(0);

	useEffect(() => {
		if (mode === "edit") {
			metaStorage.getById(params.id).then((data) => {
				if (data) {
					setName(data.name);
					setTarget(data.target);
				}
			});
		}
	}, [mode, params.id]);

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

	function handleEditMeta() {
		const updatedMeta: MetaStorage = {
			id: params.id,
			name,
			target,
		};
		metaStorage
			.update(updatedMeta)
			.then(() => {
				console.log("Update successful:", updatedMeta);
				router.navigate("/"); // Volta para a tela inicial após salvar a meta.
			})
			.catch((error) => {
				console.error("Erro ao salvar a meta:", error);
			});
	}

	function handleDeleteMeta() {
		metaStorage
			.remove(params.id)
			.then(() => {
				router.navigate("/"); // Volta para a tela inicial após deletar a meta.
			})
			.catch((error) => {
				console.error("Erro ao deletar a meta:", error);
			});
	}

	return (
		<View style={{ flex: 1, padding: 24, gap: 24 }}>
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<HeaderTitle>
					{mode === "create" ? "Nova Meta" : "Editar Meta"}
				</HeaderTitle>

				<Pressable onPress={handleDeleteMeta}>
					<MaterialIcons name="delete" size={24} />
				</Pressable>
			</View>

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

			<Button
				title={`Salvar`}
				onPress={() => {
					if (mode === "create") {
						handleNewMeta();
					} else {
						handleEditMeta();
					}
				}}
			/>
		</View>
	);
}
