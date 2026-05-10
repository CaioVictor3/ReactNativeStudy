import { Button } from "@/components/Button";
import { List } from "@/components/List";
import { Progress } from "@/components/Progress";
import { Transaction } from "@/components/Transaction";
import { metaStorage, MetaStorage } from "@/storage/MetaStorage";
import {
	TransactionStorage,
	transactionStorage,
} from "@/storage/TransactionStorage";
import { MaterialIcons } from "@expo/vector-icons";
import { HeaderTitle } from "@react-navigation/elements";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";

export default function InProgress() {
	const params = useLocalSearchParams<{ id: string }>();

	const [meta, setMeta] = useState<MetaStorage | null>(null);
	const [transactions, setTransactions] = useState<TransactionStorage[]>([]);

	useEffect(() => {
		metaStorage.getById(params.id).then((data) => {
			setMeta(data);
		});

		transactionStorage.getByMetaId(params.id).then((data) => {
			setTransactions(data);
		});
	}, []);

	function handleRemoveTransaction(id: string) {
		transactionStorage
			.remove(id)
			.then(() => {
				metaStorage.getById(params.id).then((data) => {
					setMeta(data);
				});

				transactionStorage.getByMetaId(params.id).then((data) => {
					setTransactions(data);
				});
			})
			.catch((error) => {
				console.error("Erro ao remover a transação:", error);
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
