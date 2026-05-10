import { Button } from "@/components/Button";
import { List } from "@/components/List";
import { Progress } from "@/components/Progress";
import { Transaction } from "@/components/Transaction";
import { Meta, useMetasDatabase } from "@/database/useMetasDatabase";
import {
    Transaction as TransactionData,
    useTransactionsDatabase,
} from "@/database/useTransactionsDatabase";
import { MaterialIcons } from "@expo/vector-icons";
import { HeaderTitle } from "@react-navigation/elements";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function InProgress() {
	const insets = useSafeAreaInsets();
	const params = useLocalSearchParams<{ id: string }>();
	const metaId = Number(params.id);

	const { getById } = useMetasDatabase();
	const { listByMeta, getAccumulatedByMeta, remove } =
		useTransactionsDatabase();

	const [meta, setMeta] = useState<Meta | null>(null);
	const [current, setCurrent] = useState(0);
	const [transactions, setTransactions] = useState<TransactionData[]>([]);

	async function loadData() {
		const metaData = await getById(metaId);
		setMeta(metaData ?? null);

		const accumulated = await getAccumulatedByMeta(metaId);
		setCurrent(accumulated);

		const txList = await listByMeta(metaId);
		setTransactions(txList);
	}

	useEffect(() => {
		loadData();
	}, []);

	async function handleRemoveTransaction(id: number) {
		await remove(id);
		loadData();
	}

	const percentage = meta
		? Math.round((current / meta.target) * 100)
		: 0;

	return (
		<View style={{ flex: 1, paddingTop: insets.top + 16, paddingBottom: Math.max(insets.bottom, 16), paddingHorizontal: 24, gap: 24 }}>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<Pressable onPress={() => router.navigate("/")}>
					<MaterialIcons name="arrow-back" size={24} />
				</Pressable>

				<HeaderTitle>{meta?.name ?? "Meta"}</HeaderTitle>

				<Pressable onPress={() => router.navigate(`/target/${params.id}`)}>
					<MaterialIcons name="edit" size={24} />
				</Pressable>
			</View>

			{meta && (
				<View>
					<Progress
						percentage={percentage}
						current={current}
						target={meta.target}
					/>
				</View>
			)}

			<List
				title="Transações da meta"
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
