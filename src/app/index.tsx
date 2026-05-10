import { Button } from "@/components/Button";
import { HomeHeader } from "@/components/HomeHeader";
import { List } from "@/components/List";
import { Meta, useMetasDatabase } from "@/database/useMetasDatabase";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
	const insets = useSafeAreaInsets();
	const { list } = useMetasDatabase();
	const { listAll } = useTransactionsDatabase();

	const [metas, setMetas] = useState<Meta[]>([]);
	const [summaryData, setSummaryData] = useState({
		total: "R$ 0,00",
		input: { label: "Entradas", value: "R$ 0,00" },
		output: { label: "Saídas", value: "R$ 0,00" },
	});

	async function loadData() {
		const data = await list();
		setMetas(data);

		const transactions = await listAll();
		let totalInput = 0;
		let totalOutput = 0;
		transactions.forEach((t) => {
			if (t.type === "input") totalInput += t.value;
			else totalOutput += t.value;
		});
		setSummaryData({
			total: `R$ ${(totalInput - totalOutput).toFixed(2)}`,
			input: { label: "Entradas", value: `R$ ${totalInput.toFixed(2)}` },
			output: { label: "Saídas", value: `-R$ ${totalOutput.toFixed(2)}` },
		});
	}

	useEffect(() => {
		loadData();
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<HomeHeader data={summaryData} />

			<View style={{ flex: 1, paddingTop: 24 }}>
				<List
					title="Metas"
					data={metas}
					renderItem={({ item }) => (
						<Button
							title={item.name}
							onPress={() =>
								router.navigate(`/in-progress/${item.id}`)
							}
						/>
					)}
					emptyMessage="Nenhuma meta. Toque em nova meta para criar."
					containerStyle={{ paddingHorizontal: 24 }}
				/>

				<View style={{ padding: 24, paddingBottom: Math.max(insets.bottom, 16) + 16 }}>
					<Button
						title="Nova meta"
						onPress={() => router.navigate("/target/new")}
					/>
				</View>
			</View>
		</View>
	);
}
