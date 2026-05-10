import { Button } from "@/components/Button";
import { List } from "@/components/List";
import { Progress } from "@/components/Progress";
import { Transaction } from "@/components/Transaction";
import { Meta, useMetasDatabase } from "@/database/useMetasDatabase";
import {
	Transaction as TransactionType,
	useTransactionsDatabase,
} from "@/database/useTransactionsDatabase";
import { MaterialIcons } from "@expo/vector-icons";
import { HeaderTitle } from "@react-navigation/elements";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";

export default function InProgress() {
	const params = useLocalSearchParams<{ id: string }>();
	const metasDatabase = useMetasDatabase();
	const transactionsDatabase = useTransactionsDatabase();

	const [meta, setMeta] = useState<Meta | null>(null);
	const [transactions, setTransactions] = useState<TransactionType[]>([]);

	async function load() {
		const metaId = Number(params.id);
		const [metaData, transactionsList] = await Promise.all([
			metasDatabase.getById(metaId),
			transactionsDatabase.listByMeta(metaId),
		]);
		setMeta(metaData);
		setTransactions(transactionsList);
	}

	useEffect(() => {
		load();
	}, []);

	async function handleRemoveTransaction(id: number) {
		await transactionsDatabase.remove(id);
		load();
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
				<HeaderTitle>{`Meta: ${meta?.id} - ${meta?.name}`}</HeaderTitle>

				<Pressable>
					<MaterialIcons
						name="edit"
						size={24}
						onPress={() => router.navigate(`/target/${params.id}`)}
					/>
				</Pressable>
			</View>

			{meta && meta.percentage ? (
				<View>
					<Progress
						percentage={meta?.percentage}
						current={meta?.current}
						target={meta?.target}
					/>
				</View>
			) : null}

			<List
				title={`Transações da meta`}
				data={transactions}
				renderItem={({ item }) => (
					<Transaction
						data={item}
						onRemove={() => handleRemoveTransaction(item.id)}
					/>
				)}
				emptyMessage="Nenhuma transação. Toque em nova transação para guardar seu primeiro dinheiro aqui."
			/>

			<Button
				title="Nova transação"
				onPress={() => router.navigate(`/transaction/${params.id}`)}
			/>
		</View>
	);
}
