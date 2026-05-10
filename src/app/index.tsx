import { Button } from "@/components/Button";
import { HomeHeader } from "@/components/HomeHeader";
import { List } from "@/components/List";
import { router } from "expo-router";
import { View } from "react-native";

const summary = {
	total: "R$ 2.680,00",
	input: { label: "Entradas", value: "R$ 6.184,90" },
	output: { label: "Saídas", value: "-R$ 883,65" },
};

import { metaStorage } from "@/storage/MetaStorage";
import { transactionStorage } from "@/storage/TransactionStorage";
import { useEffect, useState } from "react";

export default function Index() {
	const [targets, setTargets] = useState<any[]>([]);

	const [summaryData, setSummaryData] = useState({
		total: "R$ 0,00",
		input: { label: "Entradas", value: "R$ 0,00" },
		output: { label: "Saídas", value: "R$ 0,00" },
	});

	async function calculateSummary() {
		let transactions = await transactionStorage.get();
		console.log("transactions:", transactions);
		let totalInput = 0;
		let totalOutput = 0;
		transactions.forEach((transaction) => {
			if (transaction.type === "input") {
				totalInput += transaction.value;
			} else {
				totalOutput += transaction.value;
			}
		});
		return {
			total: `R$ ${(totalInput - totalOutput).toFixed(2)}`,
			input: { label: "Entradas", value: `R$ ${totalInput.toFixed(2)}` },
			output: { label: "Saídas", value: `-R$ ${totalOutput.toFixed(2)}` },
		};
	}

	useEffect(() => {
		metaStorage
			.get()
			.then((data) => {
				console.log("Metas carregadas:", data);
				setTargets(data);
			})
			.catch(console.error);
	}, []);

	useEffect(() => {
		calculateSummary().then(setSummaryData);
	}, [targets]);

	return (
		<View style={{ flex: 1 }}>
			<HomeHeader data={summaryData} />

			<View style={{ flex: 1, paddingTop: 24 }}>
				<List
					title="Metas"
					data={targets}
					renderItem={({ item }) => (
						<Button
							title={`${item.name} • ${item.percentage}%`}
							onPress={() =>
								router.navigate(`/in-progress/${item.id}`)
							}
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
