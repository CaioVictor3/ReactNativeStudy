import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import { styles } from "./styles";
import { StatusFilter } from "@/types/FilterStatus";

type Props = TouchableOpacityProps & {
    status: StatusFilter;
    isActive: boolean;
};

const STATUS_LABELS: Record<StatusFilter, string> = {
    Todos: 'Todos',
    Rascunho: 'Rascunho',
    Enviado: 'Enviado',
    Aprovado: 'Aprovado',
    Recusado: 'Recusado',
};

export function Filter({ status, isActive, ...rest }: Props) {
    return (
        <TouchableOpacity
            style={[styles.container, isActive && styles.containerActive]}
            {...rest}
        >
            <Text style={[styles.title, isActive && styles.titleActive]}>
                {STATUS_LABELS[status]}
            </Text>
        </TouchableOpacity>
    );
}
