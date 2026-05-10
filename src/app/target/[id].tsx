import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { useMetasDatabase } from "@/database/useMetasDatabase";
import { MaterialIcons } from "@expo/vector-icons";
import { HeaderTitle } from "@react-navigation/elements";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Target() {
	const insets = useSafeAreaInsets();
	const params = useLocalSearchParams<{ id: string }>();
	const mode = params.id === "new" ? "create" : "edit";

	const { create, getById, update, remove } = useMetasDatabase();

	const [name, setName] = useState("");
	const [target, setTarget] = useState(0);

	useEffect(() => {
		if (mode === "edit") {
			getById(Number(params.id)).then((data) => {
				if (data) {
					setName(data.name);
					setTarget(data.target);
				}
			});
		}
	}, [mode, params.id]);

	async function handleNewMeta() {
		await create(name, target);
		router.navigate("/");
	}

	async function handleEditMeta() {
		await update(Number(params.id), name, target);
		router.navigate("/");
	}

	async function handleDeleteMeta() {
		await remove(Number(params.id));
		router.navigate("/");
	}

	return (
		<View style={{ flex: 1, paddingTop: insets.top + 16, paddingBottom: Math.max(insets.bottom, 16), paddingHorizontal: 24, gap: 24 }}>
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

				{mode === "edit" && (
					<Pressable onPress={handleDeleteMeta}>
						<MaterialIcons name="delete" size={24} />
					</Pressable>
				)}
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
				title="Salvar"
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
