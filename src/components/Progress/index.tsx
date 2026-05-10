import { colors } from "@/theme/colors";
import { Text, View } from "react-native";

type Props = {
	percentage: number;
	current?: number;
	target?: number;
};

export function Progress({ percentage, current, target }: Props) {
	const safe = Math.max(0, Math.min(percentage, 100));

	return (
		<View>
			{current && target ? (
				<View>
					<Text>Valor guardado</Text>
					<Text style={{ marginBottom: 8 }}>
						<Text
							style={{ fontWeight: "bold", fontSize: 24 }}
						>{`R$ ${current}`}</Text>
						{` de R$ ${target}`}
					</Text>
				</View>
			) : null}

			<View
				style={{
					width: "100%",
					height: 10,
					backgroundColor: colors.gray[100],
					borderRadius: 999,
				}}
			>
				<View
					style={{
						height: 10,
						width: `${safe}%`,
						backgroundColor: colors.blue[500],
						borderRadius: 999,
					}}
				/>
			</View>
		</View>
	);
}
