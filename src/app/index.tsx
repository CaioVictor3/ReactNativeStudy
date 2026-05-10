import { Button } from "@/components/Button";
import { HomeHeader } from "@/components/HomeHeader";
import { List } from "@/components/List";
import { Meta, useMetasDatabase } from "@/database/useMetasDatabase";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";

export default function Index() {
	const metasDatabase = useMetasDatabase();
	const transactionsDatabase = useTransactionsDatabase();

	const [metas, setMetas] = useState<Meta[]>([]);
	const [summaryData, setSummaryData] = useState({
		total: "R$ 0,00",
		input: { label: "Entradas", value: "R$ 0,00" },
		output: { label: "Saídas", value: "R$ 0,00" },
	});

	async function load() {
		const [metasList, sum] = await Promise.all([
			metasDatabase.list(),
			transactionsDatabase.summary(),
		]);
		setMetas(metasList);
		setSummaryData({
			total: `R$ ${(sum.totalInput - sum.totalOutput).toFixed(2)}`,
			input: { label: "Entradas", value: `R$ ${sum.totalInput.toFixed(2)}` },
			output: { label: "Saídas", value: `-R$ ${sum.totalOutput.toFixed(2)}` },
		});
	}

	useFocusEffect(
		useCallback(() => {
			load();
		}, []),
	);

	return (
		<View style={{ flex: 1 }}>
			<HomeHeader data={summaryData} />

			<View style={{ flex: 1, paddingTop: 24 }}>
				<List
					title="Metas"
					data={metas}
					renderItem={({ item }) => (
						<Button
							title={`${item.name} • ${item.percentage}%`}
							onPress={() => router.navigate(`/in-progress/${item.id}`)}
						/>
					)}
					emptyMessage="Nenhuma meta. Toque em nova meta para criar."
					containerStyle={{ paddingHorizontal: 24 }}
				/>

				<View style={{ padding: 24, paddingBottom: 32 }}>
					<Button
						title="Nova meta"
						onPress={() => router.navigate("/target/new")}
					/>
				</View>
			</View>
		</View>
	);
}
