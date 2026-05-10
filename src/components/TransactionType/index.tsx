import { View } from "react-native";
import { Option } from "./option";

type Props = {
	selected: "input" | "output";
	onChange: (type: "input" | "output") => void;
};

export function TransactionType({ selected, onChange }: Props) {
	return (
		<View style={{ flexDirection: "row", gap: 12 }}>
			<Option
				title="Guardar"
				icon="arrow-upward"
				isSelected={selected === "input"}
				onPress={() => onChange("input")}
			/>

			<Option
				title="Resgatar"
				icon="arrow-downward"
				isSelected={selected === "output"}
				onPress={() => onChange("output")}
			/>
		</View>
	);
}
